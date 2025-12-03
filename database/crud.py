from sqlalchemy.orm import Session
from database.models import User, Category


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, email: str, hashed_password: str, salt: str)->User:
    existing_user = get_user_by_email(db, email)
    if existing_user:
        raise ValueError("Email already registered")

    new_user = User(email=email, hashed_password=hashed_password, salt=salt)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def create_category(db: Session, name: str, user_id: int,icon: str,color: str)->Category:
    new_category = Category(name=name, user_id=user_id, icon=icon, color=color)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

def get_categories_by_user(db: Session, user_id: int):
    return db.query(Category).filter(Category.user_id == user_id).all()


def delete_category(db: Session, category_id: int):
    db.query(Category).filter(Category.id == category_id).delete()
    db.commit()
    db.refresh(Category)

def update_category(db: Session, category_id: int, update_data: dict):
    db.query(Category).filter(Category.id == category_id).update(update_data)
    db.commit()
    db.refresh(Category)

