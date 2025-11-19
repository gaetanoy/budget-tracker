from fastapi import FastAPI, Query, HTTPException
from typing import Optional
from datetime import date
from database.db import Database
from database.models.transaction import Transaction

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


@app.get("/transactions")
async def get_transactions(
    user_id: Optional[int] = Query(None, description="ID de l'utilisateur"),
    category_id: Optional[int] = Query(None, description="ID de la catégorie"),
    date_start: Optional[str] = Query(None, description="Date de début (format YYYY-MM-DD)"),
    date_end: Optional[str] = Query(None, description="Date de fin (format YYYY-MM-DD)"),
    amount_type: Optional[str] = Query(None, description="Type de montant: 'positive' ou 'negative'")
):
    """
    Retourne une liste des transactions avec filtres optionnels
    
    Filtres disponibles:
    - user_id: Filtrer par utilisateur
    - category_id: Filtrer par catégorie
    - date_start: Date de début pour le filtre de plage
    - date_end: Date de fin pour le filtre de plage
    - amount_type: Filtrer par montant positif ou négatif
    """
    try:
        # Construction de la requête SQL avec les filtres
        query = "SELECT * FROM transactions WHERE 1=1"
        params = []
        
        if user_id is not None:
            query += " AND user_id = ?"
            params.append(user_id)
        
        if category_id is not None:
            query += " AND category_id = ?"
            params.append(category_id)
        
        if date_start is not None:
            query += " AND t_date >= ?"
            params.append(date_start)
        
        if date_end is not None:
            query += " AND t_date <= ?"
            params.append(date_end)
        
        if amount_type == "positive":
            query += " AND amount > 0"
        elif amount_type == "negative":
            query += " AND amount < 0"
        
        # Tri par date décroissante
        query += " ORDER BY t_date DESC"
        
        # Exécution de la requête
        rows = db.fetch_all(query, tuple(params))
        
        # Conversion des résultats en dictionnaires
        transactions = []
        for row in rows:
            transactions.append({
                "id": row["id"],
                "amount": row["amount"],
                "title": row["title"],
                "date": row["t_date"],
                "user_id": row["user_id"],
                "category_id": row["category_id"]
            })
        
        return {
            "count": len(transactions),
            "transactions": transactions
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des transactions: {str(e)}")


@app.get("/transactions/{transaction_id}")
async def get_transaction(transaction_id: int):
    """
    Retourne une transaction spécifique par son ID
    """
    try:
        query = "SELECT * FROM transactions WHERE id = ?"
        row = db.fetch_one(query, (transaction_id,))
        
        if row is None:
            raise HTTPException(status_code=404, detail="Transaction non trouvée")
        
        transaction = {
            "id": row["id"],
            "amount": row["amount"],
            "title": row["title"],
            "date": row["t_date"],
            "user_id": row["user_id"],
            "category_id": row["category_id"]
        }
        
        return transaction
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération de la transaction: {str(e)}")
