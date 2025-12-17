from sqlalchemy.orm import Session
from database.models import Bank


def create_bank(db: Session, name: str, icon: str) -> Bank:
    new_bank = Bank(name=name, icon=icon)
    db.add(new_bank)
    db.commit()
    db.refresh(new_bank)
    return new_bank

def delete_bank(db: Session, bank_id: int):
    db.query(Bank).filter(Bank.id == bank_id).delete()
    db.commit()

def update_bank(db: Session, bank_id: int, update_data: dict):
    bank = db.query(Bank).filter(Bank.id == bank_id).first()
    if bank is None:
        return None

    for key, value in update_data.items():
        setattr(bank, key, value)

    db.commit()
    db.refresh(bank)
    return bank

def get_bank_by_id(db: Session, bank_id: int):
    return db.query(Bank).filter(Bank.id == bank_id).first()

def get_banks(db: Session):
    return db.query(Bank).all()
