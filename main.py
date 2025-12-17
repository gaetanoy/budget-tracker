from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from database.default_banks import seed_default_banks
from database.models import Base
from database.default_categories import seed_default_categories
from database.database import get_db
import os

from contextlib import asynccontextmanager
import logging

load_dotenv()
from routers import auth, categories, transactions, bank, account  # noqa: E402


logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Chargement de la base de données...")
    try:
        # Récupère tous les modèles héritant de base et crée une table pour chacun d'eux
        Base.metadata.create_all(bind=engine)
        logger.info("Base de données initialisée avec succès.")
    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation de la base de données: {e}")
        raise e

    # Crée les catégories par défaut si elles n'existent pas
    db = next(get_db())
    try:
        category_count = seed_default_categories(db)
        if category_count > 0:
            logger.info(f"{category_count} catégories par défaut créées.")
        bank_count = seed_default_banks(db)
        if bank_count > 0:
            logger.info(f"{bank_count} banques par défaut créées.")
    finally:
        db.close()
    yield


app = FastAPI(
    title="ANAS - Budget Tracker API",
    description="Assistant Numérique d'Administration des Sous",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOWED_HOSTS_FRONT")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(transactions.router)
app.include_router(bank.router)
app.include_router(account.router)


@app.get("/")
async def root():
    """Endpoint racine pour vérifier que l'API fonctionne"""
    return {
        "message": "ANAS API - Budget Tracker",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    """Endpoint de santé pour vérifier l'état de l'API"""
    return {"status": "healthy"}
