import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from database.crud.transaction import create_transaction, get_transaction_by_id, \
    delete_transaction, update_transaction, get_transactions_by_user_filtered

from database.database import get_db
from pydantic import BaseModel

from database.models import Category
from routers.auth import get_current_user

router = APIRouter(prefix="/transactions", tags=["transactions"])


class TransactionCreate(BaseModel):
    amount: float
    title: str
    date: datetime.date
    category_id: int


class TransactionUpdate(BaseModel):
    amount: float | None = None
    title: str | None = None
    date: datetime.date | None = None
    category_id: int | None = None

class TransactionResponse(BaseModel):
    id: int
    amount: float
    title: str
    date: datetime.date
    category_id: int

    class Config:
        from_attributes = True  # Permet de convertir un objet SQLAlchemy en Pydantic


class MessageResponse(BaseModel):
    message: str



@router.post("/create", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
def add_transaction(transaction: TransactionCreate,
                       db: Session = Depends(get_db),
                       current_user=Depends(get_current_user)):

    category = db.query(Category).filter(Category.id == transaction.category_id).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

#    if category.user_id != current_user.id:
#        raise HTTPException(status_code=403, detail="You do not have access to this category")

    try:
        new_transaction = create_transaction(
            db, transaction.amount, transaction.title, transaction.date, transaction.category_id, current_user.id
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return new_transaction


@router.get("/", response_model=List[TransactionResponse])
def list_transactions(
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user),
        start_date: Optional[datetime.date] = Query(None, description="Date de début (YYYY-MM-DD)"),
        end_date: Optional[datetime.date] = Query(None, description="Date de fin (YYYY-MM-DD)"),
        category_id: Optional[int] = Query(None, description="Filtrer par catégorie"),
        transaction_type: Optional[str] = Query(None, regex="^(positive|negative)$",
                                                description="'positive' pour revenus, 'negative' pour dépenses"),
        account_id: Optional[int] = Query(None, description="Filtrer par compte"),
        asc: Optional[bool] = Query(False, description="Trier par date croissante si true, décroissante si false")
):
    """
    Récupère les transactions de l'utilisateur courant.
    Applique des filtres si fournis.
    """
    transactions = get_transactions_by_user_filtered(
        db=db,
        user_id=current_user.id,
        start_date=start_date,
        end_date=end_date,
        category_id=category_id,
        transaction_type=transaction_type,
        account_id=account_id,
        asc=asc
    )
    return transactions


@router.delete(
    "/{transaction_id}", response_model=MessageResponse, status_code=status.HTTP_200_OK
)
def remove_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    transaction = get_transaction_by_id(db, transaction_id)
    if transaction is None or transaction.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found"
        )

    delete_transaction(db, transaction_id)
    return {"message": "Transaction deleted!"}

@router.patch(
    "/{transaction_id}", response_model=TransactionResponse, status_code=status.HTTP_200_OK
)
def modify_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    transaction = get_transaction_by_id(db, transaction_id)
    if transaction is None or transaction.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found"
        )

    update_data = transaction_data.model_dump(exclude_unset=True)
    updated_transaction = update_transaction(db, transaction_id, update_data)

    return updated_transaction


