# ANAS - Budget Tracker API

ANAS (Assistant Numérique d’Administration des Sous) est une API REST de suivi budgétaire. 

## Stack Technique

  * **Langage** : Python 3.12 
  * **Framework Web** : FastAPI 
  * **ORM** : SQLAlchemy 
  * **IA / NLP** : Hugging Face Transformers (`google/gemma-3-4b-it`)
  * **Sécurité** : OAuth2 avec Password Bearer et JWT 

## Installation et Lancement

### 1\. Cloner le dépôt

```bash
git clone https://github.com/goueyeya/budget-tracker.git
cd budget-tracker
```

### 2\. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 3\. Configuration de l'Environnement

Créez un fichier `.env` à la racine du projet et ajoutez votre token Hugging Face pour activer la fonctionnalité de catégorisation par IA:

```env
HF_TOKEN=votre_token_huggingface_ici
SECRET_KEY=votre_cle_secrete_tres_longue_et_aleatoire
```

### 4\. Lancer l'Application

```bash
uvicorn main:app --reload
# ou
fastapi dev main.py
```

L'API sera accessible à l'adresse : `http://127.0.0.1:8000`.

## Documentation de l'API

La documentation interactive (Swagger UI) est disponible à l'adresse suivante :
**[http://127.0.0.1:8000/docs](https://www.google.com/search?q=http://127.0.0.1:8000/docs)**

### Endpoints disponibles

| Méthode | Endpoint | Description                                      |
| :--- | :--- |:-------------------------------------------------| 
| **Auth** | |                                                  | |
| `POST` | `/auth/register` | Inscription utilisateur                          | 
| `POST` | `/auth/login` | Connexion   | 
| `GET` | `/auth/account` | Profil utilisateur courant             | 
| **Transactions** | |                                                  | |
| `GET` | `/transactions/` | Liste filtrée (date, catégorie, type)  | 
| `POST` | `/transactions/create` | Création d'une transaction             | 
| `PATCH` | `/transactions/{id}` | Modification d'une transaction        | 
| `DELETE` | `/transactions/{id}` | Suppression d'une transaction        | 
| **Catégories** | |                                                  | |
| `GET` | `/categories/` | Liste des catégories                   | 
| `POST` | `/categories/create` | Création de catégorie                 | 
| `POST` | `/categories/auto-categorize` | Prédiction de catégorie via IA        | 

## Tests

Un fichier `transaction_test.http` est fourni pour tester les endpoints via un client HTTP. Il contient les scénarios d'inscription, d'authentification et de manipulation des transactions.

## Auteurs

* [Gaëtan OUEYEYA](https://github.com/goueyeya)
* [Olivier GABELLE](https://github.com/Gabelloide)
* [Alban ROBERT](https://github.com/Alban091)
* [Ryan ZERHOUNI](https://github.com/Terminator2TSP)
* [Ahmad BAALBAKY](https://github.com/ahmadbky)
* [Kohsey Dufour](https://github.com/KohseyPower)