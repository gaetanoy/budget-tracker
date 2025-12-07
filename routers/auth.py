import os

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from database.crud import create_user, get_user_by_email, get_user_by_username
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
import hashlib
import uuid


# Configuration JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter(prefix="/auth", tags=["auth"])

# Schéma pour dire à FastAPI où trouver le token (dans l'URL /auth/login)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


class UserCreate(BaseModel):
    email: str
    username: str
    password: str

class UserLogin(BaseModel):
    identifier: str  # Peut être email ou username
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # On récupère l'identifiant (qui peut être email ou username selon ce qui a été stocké)
        identifier: str = payload.get("sub")
        if identifier is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    # 1. On essaie de trouver par email
    user = get_user_by_email(db, email=identifier)
    
    # 2. Si non trouvé, on essaie par username
    if user is None:
        user = get_user_by_username(db, username=identifier)

    if user is None:
        raise credentials_exception
    return user



@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    salt = uuid.uuid4().hex
    # Correction du hash avec concaténation
    hashed_pw = hashlib.sha512((user.password + salt).encode()).hexdigest()
    
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        create_user(db, email=user.email, username=user.username, hashed_password=hashed_pw, salt=salt)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"message": "User created successfully"}


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    # On cherche l'utilisateur par email OU par username
    db_user = get_user_by_email(db, user.identifier)
    if not db_user:
        db_user = get_user_by_username(db, user.identifier)
        
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Vérification du mot de passe
    hashed_input_pw = hashlib.sha512((user.password + db_user.salt).encode()).hexdigest()
    if hashed_input_pw != db_user.hashed_password:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Création du token JWT
    # On stocke l'identifiant utilisé (ou toujours l'email pour simplifier) dans le 'sub'
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/account")
def get_profile(current_user = Depends(get_current_user)):
    # Grâce à Depends(get_current_user), cet endpoint est maintenant protégé.
    # Si le token est invalide, l'utilisateur n'arrivera jamais ici.
    return {"email": current_user.email, "username":current_user.username, "id": current_user.id}


@router.post("/logout")
def logout():
    return {"message": "Successfully logged out"}