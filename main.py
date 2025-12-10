from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from database.models import Base
from database.default_categories import seed_default_categories
from database.database import get_db

from contextlib import asynccontextmanager
import logging

load_dotenv()
from routers import auth, categories, transactions

from huggingface_hub import login
import os
from transformers import pipeline
import torch

logger = logging.getLogger("uvicorn.error")


def get_best_device():
    """Détecte le meilleur device disponible: CUDA > XPU (Intel) > CPU"""
    if torch.cuda.is_available():
        logger.info("CUDA détecté")
        return "cuda"
    
    # Support Intel XPU (GPU/NPU Intel)
    try:
        import intel_extension_for_pytorch as ipex
        if torch.xpu.is_available():
            logger.info("Intel XPU/NPU détecté")
            return "xpu"
    except ImportError:
        logger.info("intel-extension-for-pytorch non installé")
    except AttributeError:
        logger.info("XPU non disponible sur ce système")
    
    logger.info("Utilisation du CPU")
    return "cpu"


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
        count = seed_default_categories(db)
        if count > 0:
            logger.info(f"{count} catégories par défaut créées.")
    finally:
        db.close()
        
    logger.info("Authentification auprès de Hugging Face Hub...")
    try:
        login(os.getenv("HF_TOKEN"))
        logger.info("Authentifié auprès de Hugging Face Hub avec succès")

        logger.info("Chargement du modèle d'IA...")
        try:
            app.state.categorization_pipe = pipeline(
                "text-generation",
                model="google/gemma-3-1b-it",
                device=get_best_device(),
                dtype=torch.bfloat16,
            )
            logger.info("Modèle d'IA chargé avec succès.")
        except Exception as e:
            logger.error(f"Erreur lors du chargement du modèle d'IA: {e}")
    except Exception as e:
        logger.error(f"Erreur d'authentification auprès de Hugging Face Hub: {e}")

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
