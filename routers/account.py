from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.crud.account import create_account, get_account_by_id, \
    delete_account, update_account, get_accounts_by_user

from database.database import get_db
from pydantic import BaseModel

from database.models import Bank
from routers.auth import get_current_user

router = APIRouter(prefix="/accounts", tags=["accounts"])


class AccountCreate(BaseModel):
    name: str
    bank_id: Optional[int] = None


class AccountUpdate(BaseModel):
    name: str | None = None
    bank_id: int | None = None


class AccountResponse(BaseModel):
    id: int
    name: str
    user_id: int
    bank_id: Optional[int] = None

    class Config:
        from_attributes = True  # Permet de convertir un objet SQLAlchemy en Pydantic


class MessageResponse(BaseModel):
    message: str


@router.post("/create", response_model=AccountResponse, status_code=status.HTTP_201_CREATED)
def add_account(account: AccountCreate,
                db: Session = Depends(get_db),
                current_user=Depends(get_current_user)):

    if account.bank_id:
        bank = db.query(Bank).filter(Bank.id == account.bank_id).first()
        if not bank:
            raise HTTPException(status_code=404, detail="Bank not found")

    try:
        new_account = create_account(
            db, account.name, current_user.id
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return new_account


@router.get("/", response_model=List[AccountResponse])
def list_accounts(
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user),
):
    """
    Récupère les comptes de l'utilisateur courant.
    """
    accounts = get_accounts_by_user(db=db, user_id=current_user.id)
    return accounts


@router.delete(
    "/{account_id}", response_model=MessageResponse, status_code=status.HTTP_200_OK
)
def remove_account(
    account_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    account = get_account_by_id(db, account_id)
    if account is None or account.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found"
        )

    delete_account(db, account_id)
    return {"message": "Account deleted!"}


@router.patch(
    "/{account_id}", response_model=AccountResponse, status_code=status.HTTP_200_OK
)
def modify_account(
    account_id: int,
    account_data: AccountUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    account = get_account_by_id(db, account_id)
    if account is None or account.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found"
        )

    update_data = account_data.model_dump(exclude_unset=True)
    updated_account = update_account(db, account_id, update_data)

    return updated_account


