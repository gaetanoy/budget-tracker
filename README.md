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

Dans un autre terminal, vous pouvez lancer le serveur web de test pour avoir l'interface frontend.

Pour cela, vous devez d'abord installer les dépendances du frontend, en allant dans le dossier frontend puis en exécutant cette commande :
```bash
npm install
```
ou avec yarn :
```bash
yarn
```

Ensuite, lancer la commande npm :
```bash
npm run dev
```
ou avec yarn :
```bash
yarn dev
```

## 5. Améliorer la performance du modèle d'IA (optionnel)

Si vous avez une carte graphique NVIDIA ou bien un NPU Intel, vous pouvez améliorer les performances du modèle de catégorisation en installant les extensions appropriées :

- Pour NVIDIA (CUDA) :

  1. Installer le CUDA Toolkit depuis le site officiel de NVIDIA.
  2. Installer PyTorch avec le support CUDA (vérifier la version compatible avec votre CUDA Toolkit) :
  3. Exemple avec Cuda 12.1 :
  ```bash
  pip install torch --index-url https://download.pytorch.org/whl/cu121
  ```

- Pour Intel (NPU) :

  1. Installer PyTorch avec le support Intel XPU :
  ```bash
  pip install torch==2.8.0 torchvision==0.23.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/xpu
  ```
  2. Installer l'extension Intel pour PyTorch :
  ```bash
  pip install psutil intel-extension-for-pytorch==2.8.10+xpu --index-url https://pytorch-extension.intel.com/release-whl/stable/xpu/us/
  ```

## Fonctionnalités du projet

### Principales

- Inscription et authentification
- Visualiser des transactions dans une liste
- Créer, modifier et supprimer des transactions
- Créer, modifier et supprimer des catégories
- Filtrer les transactions par date, catégorie et type (dépense/revenu)
- Consulter graphiquement la synthèse des dépenses et revenus (graphique)

### Secondaires

- Catégorisation automatique des transactions via un modèle de NLP (IA)
- Utilisation de JWT pour la sécurité (OAuth2 Password Bearer)
- Documentation interactive avec Swagger UI
- Trier les transactions par date
- Grouper les transactions par catégories


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
