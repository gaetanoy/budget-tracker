from typing import List, Optional
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import and_
from database.models.transaction import Transaction as TransactionModel

from database.database import get_db
from database.models.category import Category as CategoryModel

router = APIRouter()


def _serialize_transaction(tx: TransactionModel) -> dict:
    # simple SQLAlchemy -> dict serializer based on table columns
    return {c.name: getattr(tx, c.name) for c in tx.__table__.columns}


@router.get("/transactions", response_model=List[dict])
def get_transactions(
    user_id: int = Query(..., description="User ID to fetch transactions for"),
    start_date: Optional[date] = Query(None, description="Filter transactions on/after this date (YYYY-MM-DD)"),
    end_date: Optional[date] = Query(None, description="Filter transactions on/before this date (YYYY-MM-DD)"),
    category_ids: Optional[List[int]] = Query(
        None,
        description="Filter by one or more category ids. Use repeated params or comma-separated values."
    ),
    amount_gt: Optional[float] = Query(None, description="Filter transactions with amount >= this value"),
    amount_lt: Optional[float] = Query(None, description="Filter transactions with amount <= this value"),
    limit: int = Query(100, ge=1, le=1000, description="Max number of transactions to return"),
    offset: int = Query(0, ge=0, description="Result offset for pagination"),
    db: Session = Depends(get_db),
):
    """
    Return list of transactions for a given user_id.
    Optional filters: start_date, end_date, category_ids, amount_gt, amount_lt.
    Results are ordered by date descending and support limit/offset pagination.
    """
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user_id is required")

    query = db.query(TransactionModel).filter(TransactionModel.user_id == user_id)

    filters = []
    if start_date is not None:
        filters.append(TransactionModel.date >= start_date)
    if end_date is not None:
        filters.append(TransactionModel.date <= end_date)
    if category_ids:
        filters.append(TransactionModel.category_id.in_(category_ids))
    if amount_gt is not None:
        filters.append(TransactionModel.amount >= amount_gt)
    if amount_lt is not None:
        filters.append(TransactionModel.amount <= amount_lt)

    if filters:
        query = query.filter(and_(*filters))

    query = query.order_by(TransactionModel.date.desc()).offset(offset).limit(limit)
    results = query.all()

    return [_serialize_transaction(tx) for tx in results]

@router.get("/transaction/{transaction_id}", response_model=dict)
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
):
    """
    Return a single transaction by its transaction_id.
    Does not expose transaction id or user id. Includes full category details.
    """
    row = (
        db.query(TransactionModel, CategoryModel)
        .join(CategoryModel, TransactionModel.category_id == CategoryModel.id)
        .filter(TransactionModel.transaction_id == transaction_id)
        .one_or_none()
    )

    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")

    tx, cat = row

    tx_data = {
        c.name: getattr(tx, c.name)
        for c in tx.__table__.columns
        if c.name not in ("id", "user_id", "category_id")
    }

    category_data = {c.name: getattr(cat, c.name) for c in cat.__table__.columns}

    tx_data["category"] = category_data

    return tx_data
