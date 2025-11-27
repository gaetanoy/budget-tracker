from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from database.crud import create_user, get_user_by_email
import hashlib
import uuid


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

# Pydantic models

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


# Endpoints

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):

    salt = uuid.uuid4().hex
    hashed_pw = hashlib.sha512(user.password.encode()+salt.encode()).hexdigest()
    
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        create_user(db, email=user.email, hashed_password=hashed_pw, salt=salt)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"message": "User created successfully"}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    hashed_input_pw = hashlib.sha512(user.password.encode()+db_user.salt.encode()).hexdigest()
    if hashed_input_pw != db_user.hashed_password:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "Login successful"}