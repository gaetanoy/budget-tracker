from fastapi import FastAPI
from database import engine
from database.models import Base
from contextlib import asynccontextmanager
import logging

from routers import auth, categories, transactions

from routers import auth, categories
from huggingface_hub import login
import os

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        # Récupère tous les modèles héritant de base et crée une table pour chacun d'eux
        Base.metadata.create_all(bind=engine)
        logger.info("Base de données initialisée avec succès.")

        logger.info("Authentification auprès de Hugging Face Hub...")
        login(os.getenv("HF_TOKEN"))

    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation de la base de données: {e}")
        raise e
    yield


app = FastAPI(
    title="ANAS - Budget Tracker API",
    description="Assistant Numérique d'Administration des Sous",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(transactions.router)



@app.get("/")
async def root():
    """Endpoint racine pour vérifier que l'API fonctionne"""
    return {
        "message": "ANAS API - Budget Tracker",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Endpoint de santé pour vérifier l'état de l'API"""
    return {"status": "healthy"}