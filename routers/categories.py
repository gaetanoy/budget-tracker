from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from database.crud.category import (
    create_category,
    get_categories_by_user,
    get_category_by_id,
    delete_category,
    update_category,
)
from routers.auth import get_current_user
from typing import List
import httpx
import os
import logging

logger = logging.getLogger("uvicorn.error")


router = APIRouter(prefix="/categories", tags=["categories"])


class CategoryCreate(BaseModel):
    name: str
    color: str
    icon: str


class CategoryUpdate(BaseModel):
    name: str | None = None
    color: str | None = None
    icon: str | None = None


class CategoryResponse(BaseModel):
    id: int
    name: str
    color: str | None
    icon: str | None

    class Config:
        from_attributes = True  # Permet de convertir un objet SQLAlchemy en Pydantic


class MessageResponse(BaseModel):
    message: str


class CategoryGuessRequest(BaseModel):
    transaction_description: str


class CategoryGuessResponse(BaseModel):
    category: str


@router.post(
    "/create", status_code=status.HTTP_201_CREATED, response_model=CategoryResponse
)
def add_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        new_category = create_category(
            db, category.name, current_user.id, category.icon, category.color
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    return new_category


@router.get("/", response_model=List[CategoryResponse])
def list_categories(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    categories = get_categories_by_user(db, current_user.id)
    return categories


@router.delete(
    "/{category_id}", response_model=MessageResponse, status_code=status.HTTP_200_OK
)
def remove_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    category = get_category_by_id(db, category_id)
    if category is None or category.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category not found"
        )

    delete_category(db, category_id)
    return {"message": "Category deleted!"}


@router.patch(
    "/{category_id}", response_model=CategoryResponse, status_code=status.HTTP_200_OK
)
def modify_category(
    category_id: int,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    category = get_category_by_id(db, category_id)
    if category is None or category.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category not found"
        )

    update_data = category_data.model_dump(exclude_unset=True)
    updated_category = update_category(db, category_id, update_data)

    return updated_category


@router.post("/auto-categorize", response_model=CategoryGuessResponse)
async def auto_categorize(
    category_guess: CategoryGuessRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Catégorise automatiquement une transaction via le service LLM externe"""
    llm_service_url = os.getenv("LLM_SERVICE_URL", "http://localhost:8001")
    category_names = [cat.name for cat in get_categories_by_user(db, current_user.id)]

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{llm_service_url}/categorize",
                json={
                    "transaction_description": category_guess.transaction_description,
                    "category_names": category_names,
                },
            )
            
            if response.status_code == 200:
                result = response.json()
                return {"category": result.get("category", "Autres")}
            else:
                logger.warning(f"LLM service returned status {response.status_code}")
                return {"category": "Autres"}
                
    except httpx.RequestError as e:
        logger.warning(f"LLM service unavailable: {e}")
        return {"category": "Autres"}
    except Exception as e:
        logger.error(f"Error calling LLM service: {e}")
        return {"category": "Autres"}
