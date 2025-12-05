from dotenv import load_dotenv
from fastapi import FastAPI
from database import engine
from database.models import Base
from contextlib import asynccontextmanager
import logging

from routers import auth, categories, transactions

from huggingface_hub import login
import os
from transformers import pipeline
import torch

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        load_dotenv()
        # Récupère tous les modèles héritant de base et crée une table pour chacun d'eux
        Base.metadata.create_all(bind=engine)
        logger.info("Base de données initialisée avec succès.")

        logger.info("Authentification auprès de Hugging Face Hub...")
        login(os.getenv("HF_TOKEN"))


        logger.info("Chargement du modèle d'IA...")
        app.state.categorization_pipe = pipeline(
            "text-generation",
            model="google/gemma-3-4b-it",
            device="cuda" if torch.cuda.is_available() else "cpu",
            dtype=torch.bfloat16,
        )
        logger.info("Modèle d'IA chargé avec succès.")


    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation de la base de données: {e}")
        raise e
    yield
    # Unload le modele d'IA si l'application stoppe
    if hasattr(app.state, "categorization_pipe"):
        del app.state.categorization_pipe
        logger.info("Modèle d'IA déchargé.")


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