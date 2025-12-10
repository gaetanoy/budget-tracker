
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database.models import Category


def create_category(db: Session, name: str, user_id: int, icon: str, color: str) -> Category:
    new_category = Category(name=name, user_id=user_id, icon=icon, color=color, is_default=False)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


def get_categories_by_user(db: Session, user_id: int):
    return db.query(Category).filter(
        or_(
            Category.user_id == user_id,
            Category.is_default # Renvoie aussi les catégories par défaut
        )
    ).all()


def delete_category(db: Session, category_id: int):
    db.query(Category).filter(Category.id == category_id).delete()
    db.commit()


def update_category(db: Session, category_id: int, update_data: dict):
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        return None
    
    for key, value in update_data.items():
        setattr(category, key, value)
    
    db.commit()
    db.refresh(category)  # ← instance (minuscule), pas Category (classe)
    return category


def get_category_by_id(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()