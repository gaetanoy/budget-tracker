from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from database.crud import create_category, get_categories_by_user, delete_category, update_category
from auth import get_current_user
from typing import List

from database.models import Category

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

class CategoryCreate(BaseModel):
    name: str
    color: str
    icon: str

class CategoryUpdate(BaseModel):
    name: str
    color: str
    icon: str

@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=Category)
def create_category(category: CategoryCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):

    try :
        category = create_category(db,category.name,current_user.id,category.icon,category.color)
    except ValueError as e :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return {"id":category.id, "name":category.name, "color":category.color, "icon":category.icon}

@router.get("/", response_model=List[Category])
def get_categories(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try :
        categories = get_categories_by_user(db, current_user.id)
    except ValueError as e :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return categories

@router.delete("/{category_id}", response_model=Category, status_code=status.HTTP_200_OK)
def delete_category(category_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):

    category = get_categories_by_user(db, current_user.id)
    if category is None or category.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    delete_category(db, category.category_id)
    return {"message": "Category deleted !"}



@router.patch("/{category_id}", response_model=Category, status_code=status.HTTP_200_OK)
def update_category(category_id: int, category_data: CategoryUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    category = get_categories_by_user(db, current_user.id)
    if category is None or category.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    update_data = category_data.model_dump(exclude_unset=True)
    updated_category = update_category(db, category_id, update_data)

    return {
        "id": updated_category.id,
        "name": updated_category.name,
        "color": updated_category.color,
        "icon": updated_category.icon
    }