import os
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from database.models import Base

# On récupère l'URL depuis les variables d'environnement, sinon on utilise SQLite par défaut (pour le dev local)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///database/db.sqlite")

# sql engine
engine = create_engine(DATABASE_URL)
# manages transactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# database models
base = Base

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()