import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from database.crud.bank import get_banks
from database.crud.transaction import create_transaction, get_transaction_by_id, \
    delete_transaction, update_transaction, get_transactions_by_user_filtered

from database.database import get_db
from pydantic import BaseModel

from database.models import Category
from routers.auth import get_current_user

router = APIRouter(prefix="/banks", tags=["banks"])


class BankResponse(BaseModel):
    id: int
    name: str
    icon: str

    class Config:
        from_attributes = True  # Permet de convertir un objet SQLAlchemy en Pydantic


@router.get("/", response_model=List[BankResponse])
def list_banks(
        db: Session = Depends(get_db),
):
    """
    Récupère les banques disponibles.
    """
    banks = get_banks(
        db=db,
    )
    return banks
