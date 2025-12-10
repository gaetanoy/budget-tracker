from typing import Optional

from sqlalchemy.orm import Session
from database.models import Transaction
from datetime import date

def create_transaction(
    db: Session,
    amount: float,
    title: str,
    date: date,
    category_id: int,
    user_id: int,
) -> Transaction:
    new_transaction = Transaction(
        amount=amount,
        title=title,
        date=date,
        category_id=category_id,
        user_id=user_id,
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction


def get_transactions_by_user_filtered(
        db: Session,
        user_id: int,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        category_id: Optional[int] = None,
        transaction_type: Optional[str] = None,
        asc: Optional[bool] = True
):
    query = db.query(Transaction).filter(Transaction.user_id == user_id)

    if start_date:
        query = query.filter(Transaction.date >= start_date)

    if end_date:
        query = query.filter(Transaction.date <= end_date)

    if category_id:
        query = query.filter(Transaction.category_id == category_id)

    if transaction_type:
        if transaction_type == "positive":
            query = query.filter(Transaction.amount >= 0)
        elif transaction_type == "negative":
            query = query.filter(Transaction.amount < 0)

    if asc:
        query = query.order_by(Transaction.date.asc())
    else:
        query = query.order_by(Transaction.date.desc())

    # 3. Exécution et retour
    return query.all()

def get_transaction_by_id(db: Session, transaction_id: int):
    return db.query(Transaction).filter(Transaction.id == transaction_id).first()


def delete_transaction(db: Session, transaction_id: int):
    db.query(Transaction).filter(Transaction.id == transaction_id).delete()
    db.commit()


def update_transaction(db: Session, transaction_id: int, update_data: dict):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if transaction is None:
        return None

    for key, value in update_data.items():
        setattr(transaction, key, value)

    db.commit()
    db.refresh(transaction)
    return transaction