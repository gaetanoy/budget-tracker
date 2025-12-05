from sqlalchemy.orm import Session
from database.models import User


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
