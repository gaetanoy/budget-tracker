import logging
from fastapi import FastAPI
from database.db import Database

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

db = Database()

# Initialisation de l'application FastAPI
app = FastAPI(
    title="ANAS - Budget Tracker API",
    description="Assistant Numérique d'Administration des Sous",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_event():
    """Initialise la base de données au démarrage"""
    try:
        db.init_database()
        logger.info("Base de données initialisée avec succès")
    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation de la base de données: {e}")


@app.on_event("shutdown")
async def shutdown_event():
    """Ferme la connexion à la base de données à l'arrêt"""
    db.disconnect()
    logger.info("Connexion à la base de données fermée")


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
