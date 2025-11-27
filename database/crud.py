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


def create_category(db: Session, name: str, user_id: int)->Category:
    new_category = Category(name=name, user_id=user_id)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

def get_categories_by_user(db: Session, user_id: int):
    return db.query(Category).filter(Category.user_id == user_id).all()

