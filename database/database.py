from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from database.models import Base

DEFAULT_DB_URL = "sqlite:///database/db.sqlite"

# sql engine
engine = create_engine(DEFAULT_DB_URL)
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