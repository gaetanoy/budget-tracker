from fastapi import FastAPI
from database.db import Database
from contextlib import asynccontextmanager
db = Database()

# Initialisation de l'application FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    try:
        db.init_database()
        print("Base de données initialisée avec succès")
    except Exception as e:
        print(f"Erreur lors de l'initialisation de la base de données: {e}")
    yield
    # Shutdown logic
    db.disconnect()
    print("Connexion à la base de données fermée")

app = FastAPI(
    title="ANAS - Budget Tracker API",
    description="Assistant Numérique d'Administration des Sous",
    version="1.0.0",
    lifespan=lifespan
)
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
