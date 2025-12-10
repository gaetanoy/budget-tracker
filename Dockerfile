# Utilisation de l'image officielle Python 3.12 (version légère "slim")
# 
FROM python:3.12-slim

# Définition du répertoire de travail
WORKDIR /app

# Installation des dépendances système nécessaires 
# (nécessaire pour certaines bibliothèques comme torch ou pydantic-core)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copie des fichiers de dépendances
COPY requirements.txt .

# Installation des dépendances Python
# [cite: 20]
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code source du backend
# On copie spécifiquement les dossiers et fichiers backend pour éviter d'inclure le frontend
COPY database/ ./database/
COPY routers/ ./routers/
COPY main.py .
COPY .python-version .

# Création du dossier pour la base de données SQLite (pour les permissions)
RUN mkdir -p /app/database && chmod 777 /app/database

# Exposition du port par défaut de FastAPI/Uvicorn
# [cite: 22]
EXPOSE 8000

# Commande de lancement
# [cite: 22]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]