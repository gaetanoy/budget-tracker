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
from transformers import pipeline
import torch

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
def auto_categorize(
    category_guess: CategoryGuessRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    pipe = pipeline(
        "text-generation",
        model="google/gemma-3-4b-it",
        device="cuda" if torch.cuda.is_available() else "cpu",
        torch_dtype=torch.bfloat16,
    )

    category_names = ["Essence", "Alimentation", "Logement", "Santé", "Transport", "Divertissement", "Voyages", "Éducation", "Cadeaux", "Dons", "Services publics", "Assurances", "Impôts", "Épargne", "Investissements", "Autres"]

    messages = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are a strict financial categorization assistant. Your only job is to map a transaction description to one single category from the provided list.",
                }
            ],
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"""
    Task: Categorize the following transaction.

    Transaction Description: "{category_guess.transaction_description}"

    Allowed Categories: {', '.join(category_names)}

    Instructions:
    - Return ONLY the exact name of the category from the list above.
    - Do not add explanations.
    - Do not add punctuation like periods.
    - If the description is ambiguous, choose the closest match.
    """,
                }
            ],
        },
    ]

    outputs = pipe(messages, max_new_tokens=20)
    
    # Extraction et nettoyage de la réponse
    predicted_category = outputs[0]["generated_text"][-1]["content"].strip()

    # verification que la catégorie prédite est dans la liste
    matched_category = next((name for name in category_names if name.lower() == predicted_category.lower()), None)

    return {"category": matched_category if matched_category else "Autres"}