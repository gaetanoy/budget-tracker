from sqlalchemy.orm import Session
from database.models import Account


def create_account(db: Session, name: str, user_id: int) -> Account:
    new_account = Account(name=name, user_id=user_id)
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    return new_account


def get_accounts_by_user(db: Session, user_id: int):
    return db.query(Account).filter(Account.user_id == user_id).all()


def delete_account(db: Session, account_id: int):
    db.query(Account).filter(Account.id == account_id).delete()
    db.commit()


def update_account(db: Session, account_id: int, update_data: dict):
    account = db.query(Account).filter(Account.id == account_id).first()
    if account is None:
        return None

    for key, value in update_data.items():
        setattr(account, key, value)

    db.commit()
    db.refresh(account)
    return account


def get_account_by_id(db: Session, account_id: int):
    return db.query(Account).filter(Account.id == account_id).first()