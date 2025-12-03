from sqlalchemy.orm import Session
from database.models import User, Category


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, email: str, username:str, hashed_password: str, salt: str)->User:
    existing_user_email = get_user_by_email(db, email)
    existing_user_username = get_user_by_username(db, username)
    
    if existing_user_email:
        raise ValueError("Email already registered")
    if existing_user_username:
        raise ValueError("Username already taken")

    new_user = User(email=email, username=username, hashed_password=hashed_password, salt=salt)
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
    

