from fastapi import FastAPI
from database.db import Database

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
        print("Base de données initialisée avec succès")
    except Exception as e:
        print(f"Erreur lors de l'initialisation de la base de données: {e}")


@app.on_event("shutdown")
async def shutdown_event():
    """Ferme la connexion à la base de données à l'arrêt"""
    db.disconnect()
    print("Connexion à la base de données fermée")


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
