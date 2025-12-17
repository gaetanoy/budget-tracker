# ANAS - Architecture Documentation 🏗️

> **Assistant Numérique d'Administration des Sous**  
> Budget Tracker avec IA intégrée

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Stack technique](#stack-technique)
3. [Architecture Backend](#architecture-backend)
4. [Architecture Frontend](#architecture-frontend)
5. [Base de données](#base-de-données)
6. [Authentification & Sécurité](#authentification--sécurité)
7. [Intelligence Artificielle](#intelligence-artificielle)
8. [API Endpoints](#api-endpoints)
9. [Flux de données](#flux-de-données)
10. [Design System](#design-system)

---

## 🎯 Vue d'ensemble

ANAS est une application web de gestion budgétaire permettant de :
- Suivre ses transactions (revenus/dépenses)
- Catégoriser automatiquement ses dépenses via IA
- Visualiser ses finances avec des graphiques interactifs
- Filtrer et analyser ses mouvements par période

### Architecture globale

```
┌─────────────────────────────────────────────────────────────┐
│                    DOCKER COMPOSE                           │
│                   (Orchestration)                           │
└───────────────┬─────────────────────┬───────────────────────┘
                │                     │
    ┌───────────▼──────────┐  ┌───────▼────────────┐
    │   Frontend           │  │   Backend          │
    │   (Nginx + React)    │  │   (FastAPI)        │
    │   Port: 5173 → 80    │  │   Port: 8000       │
    └──────────────────────┘  └───────┬────────────┘
                                      │
                        ┌─────────────┼─────────────┐
                        │             │             │
                        ▼             ▼             ▼
                   PostgreSQL   Hugging Face   JWT Auth
                   (Container)   (Gemma 3)   (Secret Key)
                   Port: 5432
```

---

## 🛠️ Stack technique

### Backend
| Technologie | Version | Usage |
|-------------|---------|-------|
| Python | 3.12 | Langage principal |
| FastAPI | Latest | Framework web REST |
| SQLAlchemy | Latest | ORM base de données |
| Pydantic | Latest | Validation données |
| PyTorch | Latest | Runtime IA |
| Transformers | Latest | Modèles Hugging Face |
| python-jose | Latest | JWT tokens |
| passlib | Latest | Hash mots de passe |
| psycopg2-binary | Latest | Driver PostgreSQL |

### Frontend
| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 19.2.0 | UI Library |
| TypeScript | 5.9.3 | Typage statique |
| Vite | 7.2.4 | Build tool |
| styled-components | 6.1.19 | CSS-in-JS |
| Recharts | 3.5.1 | Graphiques |
| React Router | 7.9.6 | Routing |
| React Icons | 5.5.0 | Icônes |

### Infrastructure
- **Base de données** : PostgreSQL (production) / SQLite (dev local)
- **Accélération IA** : CUDA (NVIDIA) / XPU (Intel) / CPU fallback
- **Déploiement** : Docker + Docker Compose
- **Serveur web** : Uvicorn (backend) / Nginx (frontend)
- **Containerisation** : Multi-stage builds optimisés

---

## 🏗️ Architecture Backend

### Structure des dossiers

```
backend/
├── main.py                      # Point d'entrée FastAPI
├── database/
│   ├── __init__.py
│   ├── database.py              # Config SQLAlchemy + Session
│   ├── default_categories.py   # 16 catégories pré-définies
│   ├── models/                  # Modèles SQLAlchemy
│   │   ├── base.py             # DeclarativeBase
│   │   ├── user.py             # Table User
│   │   ├── category.py         # Table Category
│   │   └── transaction.py      # Table Transaction
│   └── crud/                    # Opérations CRUD
│       ├── user.py
│       ├── category.py
│       └── transaction.py
└── routers/
    ├── auth.py                  # Endpoints authentification
    ├── categories.py            # Endpoints catégories
    └── transactions.py          # Endpoints transactions
```

### Lifecycle de l'application

```python
# main.py - Lifespan events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # STARTUP
    1. Créer les tables SQL (Base.metadata.create_all)
    2. Seed des catégories par défaut
    3. Login Hugging Face Hub
    4. Charger le modèle IA (google/gemma-3-1b-it)
    5. Détection device (CUDA > XPU > CPU)
    
    yield
    
    # SHUTDOWN
    6. Unload du modèle IA
```

### Modèles de données (ORM)

#### User
```python
- id: int (PK)
- email: str (unique, indexed)
- username: str (unique, indexed)
- hashed_password: str (SHA512)
- salt: str (UUID4)
- categories: Relationship → Category[]
- transactions: Relationship → Transaction[]
```

#### Category
```python
- id: int (PK)
- user_id: int (FK → User.id, nullable)
- name: str
- color: str (hex)
- icon: str (emoji)
- is_default: bool
- user: Relationship → User
- transactions: Relationship → Transaction[]
```

#### Transaction
```python
- id: int (PK)
- amount: float (+ = revenu, - = dépense)
- title: str
- date: date
- user_id: int (FK → User.id)
- category_id: int (FK → Category.id)
- user: Relationship → User
- category: Relationship → Category
```

---

## 🎨 Architecture Frontend

### Structure des dossiers (Atomic Design)

```
frontend/src/
├── main.tsx                     # Entry point + Router
├── ErrorHandler.tsx             # Error Boundary
├── api/                         # Couche API
│   ├── fetch.ts                # Wrapper fetch générique
│   ├── auth.ts                 # Endpoints auth
│   ├── category.ts             # Endpoints catégories
│   └── transaction.ts          # Endpoints transactions
├── context/
│   └── auth.ts                 # Context authentification
├── types/
│   ├── Category.ts
│   └── Transaction.ts
└── components/
    ├── atoms/                   # Composants de base
    │   ├── Balance/
    │   ├── CategoryBadge/
    │   ├── Movement/
    │   └── MyAccount/
    ├── molecules/               # Composants composés
    │   ├── AddMovementModal/
    │   ├── AddCategoryModal/
    │   ├── EditMovementModal/
    │   ├── CategoryBubbles/
    │   ├── ExpensesPieChart/
    │   ├── MonthYearPicker/
    │   ├── Movements/
    │   └── Summary/
    ├── organisms/               # Composants complexes
    │   └── App/
    ├── pages/                   # Pages complètes
    │   ├── Login/
    │   ├── Register/
    │   └── Account/
    ├── layouts/
    │   └── MainLayout/
    └── context/
        └── AuthProvider.tsx
```

### Routing (React Router v7)

```
/
├── /login              → Login page (public)
├── /register           → Register page (public)
└── / (MainLayout)      → Protected routes
    ├── /               → Dashboard (App)
    └── /account        → User profile
```

### Gestion d'état

**Pas de Redux** - Architecture simplifiée :

1. **Auth Context** : Token JWT + méthodes login/logout
2. **Local State** : `useState` + `useEffect` dans composants
3. **Server State** : Fetch à la demande (pas de cache côté client)

```typescript
// Pattern de fetch typique
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await apiCall(filters, getAuth);
    setData(result);
  };
  fetchData();
}, [dependencies]);
```

---

## 🗄️ Base de données

### Configuration dynamique

Le projet supporte deux modes de base de données :

**Développement local** : SQLite (fichier `database/db.sqlite`)
**Production (Docker)** : PostgreSQL

```python
# database/database.py
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///database/db.sqlite")
engine = create_engine(DATABASE_URL)
```

### Schéma relationnel

```
┌─────────────┐
│    User     │
│─────────────│
│ id (PK)     │
│ email       │◄─────┐
│ username    │      │
│ hashed_pwd  │      │ 1:N
│ salt        │      │
└─────────────┘      │
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌─────────────┐          ┌──────────────┐
│  Category   │          │ Transaction  │
│─────────────│          │──────────────│
│ id (PK)     │◄─────────│ id (PK)      │
│ user_id(FK) │   N:1    │ amount       │
│ name        │          │ title        │
│ color       │          │ date         │
│ icon        │          │ user_id (FK) │
│ is_default  │          │ category_id  │
└─────────────┘          └──────────────┘
```

### Catégories par défaut (16)

```python
DEFAULT_CATEGORIES = [
    {"name": "Alimentation", "color": "#4CAF50", "icon": "🍔"},
    {"name": "Transport", "color": "#2196F3", "icon": "🚗"},
    {"name": "Logement", "color": "#9C27B0", "icon": "🏠"},
    {"name": "Santé", "color": "#F44336", "icon": "💊"},
    {"name": "Divertissement", "color": "#FF9800", "icon": "🎬"},
    {"name": "Voyages", "color": "#00BCD4", "icon": "✈️"},
    {"name": "Éducation", "color": "#3F51B5", "icon": "📚"},
    {"name": "Cadeaux", "color": "#E91E63", "icon": "🎁"},
    {"name": "Dons", "color": "#8BC34A", "icon": "❤️"},
    {"name": "Services publics", "color": "#607D8B", "icon": "💡"},
    {"name": "Assurances", "color": "#795548", "icon": "🛡️"},
    {"name": "Impôts", "color": "#9E9E9E", "icon": "📋"},
    {"name": "Épargne", "color": "#FFEB3B", "icon": "🏷"},
    {"name": "Investissements", "color": "#4CAF50", "icon": "📈"},
    {"name": "Essence", "color": "#FF5722", "icon": "⛽"},
    {"name": "Autres", "color": "#757575", "icon": "📦"}
]
```

---

## 🔐 Authentification & Sécurité

### Flow d'authentification

```
1. INSCRIPTION
   User → POST /auth/register
   ├─ Validation email/username unique
   ├─ Génération salt (UUID4)
   ├─ Hash password (SHA512 + salt)
   └─ Création User en DB

2. CONNEXION
   User → POST /auth/login (email OU username + password)
   ├─ Recherche User (by email OR username)
   ├─ Vérification hash (input + salt)
   ├─ Génération JWT (expire 60min)
   └─ Return access_token

3. REQUÊTES PROTÉGÉES
   User → Header: Authorization: Bearer <token>
   ├─ Décodage JWT (jose)
   ├─ Extraction "sub" (email)
   ├─ Recherche User en DB
   └─ Injection current_user dans endpoint
```

### Configuration JWT

```python
SECRET_KEY = os.getenv("SECRET_KEY")  # .env obligatoire
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Token payload
{
  "sub": "user@email.com",
  "exp": 1234567890  # timestamp
}
```

### Stockage côté client

```typescript
// localStorage
localStorage.setItem("authorization", `Bearer ${token}`);

// Injection dans headers
headers: {
  "Authorization": getAuth()  // "Bearer eyJ..."
}
```

---

## 🤖 Intelligence Artificielle

### Modèle utilisé

- **Nom** : `google/gemma-3-1b-it`
- **Type** : Text Generation (instruction-tuned)
- **Taille** : 1 milliard de paramètres
- **Quantization** : bfloat16 (optimisation mémoire)

### Pipeline de catégorisation

```python
# 1. Chargement au startup (main.py)
app.state.categorization_pipe = pipeline(
    "text-generation",
    model="google/gemma-3-1b-it",
    device=get_best_device(),  # cuda/xpu/cpu
    dtype=torch.bfloat16
)

# 2. Endpoint d'inference
POST /categories/auto-categorize
Body: {
  "transaction_description": "Courses chez Leclerc"
}

# 3. Prompt engineering
messages = [
    {
        "role": "system",
        "content": "You are a strict financial categorization assistant..."
    },
    {
        "role": "user",
        "content": f"""
Task: Categorize the following transaction.
Transaction Description: "{description}"
Allowed Categories: {category_names}

Instructions:
- Return ONLY the exact name of the category
- No explanations, no punctuation
        """
    }
]

# 4. Génération + matching
output = pipe(messages, max_new_tokens=20)
predicted = output[0]["generated_text"][-1]["content"].strip()
matched = find_in_category_list(predicted)

# 5. Return
Response: { "category": "Alimentation" }
```

### Accélération matérielle

```python
def get_best_device():
    if torch.cuda.is_available():
        return "cuda"  # GPU NVIDIA
    
    try:
        import intel_extension_for_pytorch as ipex
        if torch.xpu.is_available():
            return "xpu"  # NPU Intel
    except:
        pass
    
    return "cpu"  # Fallback
```

---

## 📡 API Endpoints

### 🔑 Auth (`/auth`)

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Inscription utilisateur |
| POST | `/auth/login` | ❌ | Connexion (retourne JWT) |
| GET | `/auth/account` | ✅ | Profil utilisateur courant |
| POST | `/auth/logout` | ❌ | Déconnexion (côté client) |

### 📊 Transactions (`/transactions`)

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/transactions/create` | ✅ | Créer une transaction |
| GET | `/transactions/` | ✅ | Liste avec filtres (date, catégorie, type) |
| PATCH | `/transactions/{id}` | ✅ | Modifier une transaction |
| DELETE | `/transactions/{id}` | ✅ | Supprimer une transaction |

**Query params GET** :
- `start_date` : YYYY-MM-DD
- `end_date` : YYYY-MM-DD
- `category_id` : int
- `transaction_type` : "positive" | "negative"
- `asc` : bool (tri par date)

### 🏷️ Catégories (`/categories`)

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/categories/create` | ✅ | Créer une catégorie |
| GET | `/categories/` | ✅ | Liste catégories (user + defaults) |
| PATCH | `/categories/{id}` | ✅ | Modifier une catégorie |
| DELETE | `/categories/{id}` | ✅ | Supprimer une catégorie |
| POST | `/categories/auto-categorize` | ✅ | **Prédiction IA** |

---

## 🔄 Flux de données

### Exemple : Ajout d'une transaction avec IA

```
┌─────────────┐
│   USER      │
└──────┬──────┘
       │ 1. Click "+ Transaction"
       ▼
┌─────────────────────────┐
│ AddMovementModal        │
│ ├─ Input: "Leclerc"    │
│ ├─ Input: -45.50       │
│ └─ Button: ✨ (IA)     │
└──────┬──────────────────┘
       │ 2. Click ✨
       ▼
┌─────────────────────────────────┐
│ POST /categories/auto-categorize│
│ Body: { description: "Leclerc" }│
└──────┬──────────────────────────┘
       │ 3. Backend inference
       ▼
┌─────────────────────────┐
│ Gemma Model             │
│ → Analyze "Leclerc"     │
│ → Match categories      │
│ → Return "Alimentation" │
└──────┬──────────────────┘
       │ 4. Response
       ▼
┌─────────────────────────┐
│ Frontend                │
│ ├─ Update category      │
│ └─ User validates       │
└──────┬──────────────────┘
       │ 5. Submit form
       ▼
┌─────────────────────────┐
│ POST /transactions/create│
│ Body: {                 │
│   title: "Leclerc",     │
│   amount: -45.50,       │
│   category_id: 1,       │
│   date: "2025-12-17"    │
│ }                       │
└──────┬──────────────────┘
       │ 6. Save in DB
       ▼
┌─────────────────────────┐
│ SQLite                  │
│ INSERT INTO transaction │
└──────┬──────────────────┘
       │ 7. Refresh list
       ▼
┌─────────────────────────┐
│ GET /transactions/      │
│ → Updated list          │
└─────────────────────────┘
```

---

## 🎨 Design System

### Palette de couleurs

```css
:root {
  --dark: #2a2a2a;        /* Texte principal + bordures */
  --beige: #F7F3E8;       /* Fond cards */
  --white: #ffffff;       /* Inputs */
  --blue: #0056b3;        /* Accent hover */
  --red: #ff6b6b;         /* Dépenses */
  --green: #2ecc71;       /* Revenus */
  --grey: #757575;        /* Neutre */
}
```

### Style "Neo-Brutal"

```css
/* Caractéristiques */
- Bordures épaisses (2-3px solid)
- Ombres dures décalées (box-shadow: 4px 4px 0px #2a2a2a)
- Pas de dégradés
- Coins arrondis modérés (8-16px)
- Animations sur transform (translate)
```

### Composants stylisés

#### Button
```css
background: #F7F3E8;
border: 2px solid #2a2a2a;
box-shadow: 4px 4px 0px #2a2a2a;

:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #2a2a2a;
}

:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px;
}
```

#### Card (Summary, Modal)
```css
background: #F7F3E8;
border: 3px solid #2a2a2a;
border-radius: 16px;
box-shadow: 6px 6px 0px #2a2a2a;
```

### Graphiques (Recharts)

- **Type** : Donut Chart (PieChart avec innerRadius)
- **Label central** : Montant + description
- **Couleurs** : Héritées des catégories
- **Interactions** : Tooltip sur hover

---

## 🚀 Installation & Lancement

### Développement Local

#### Backend

```bash
# 1. Installation
pip install -r requirements.txt

# 2. Configuration .env
HF_TOKEN=hf_xxxxxxxxxxxxx
SECRET_KEY=votre_cle_secrete_longue

# 3. Lancement
uvicorn main:app --reload
# ou
fastapi dev main.py

# API accessible sur http://127.0.0.1:8000
# Docs sur http://127.0.0.1:8000/docs
```

#### Frontend

```bash
# 1. Installation
cd frontend
npm install  # ou yarn

# 2. Configuration .env (optionnel en local)
# Par défaut: http://localhost:8000

# 3. Lancement
npm run dev  # ou yarn dev

# App accessible sur http://localhost:5173
```

### Production avec Docker 🐳

#### Prérequis
- Docker
- Docker Compose

#### Configuration

Créer un fichier `.env` à la racine :

```env
# Hugging Face
HF_TOKEN=hf_xxxxxxxxxxxxx

# JWT Secret
SECRET_KEY=votre_cle_secrete_tres_longue_et_aleatoire

# PostgreSQL
DATABASE_USER=anas_user
DATABASE_PASSWORD=votre_mot_de_passe_securise
DATABASE_PORT=5432
DATABASE_NAME=anas_db
```

#### Lancement

```bash
# Build et démarrage de tous les services
docker-compose up --build

# En mode détaché (background)
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ perte de données)
docker-compose down -v
```

#### Services déployés

| Service | Port | Description |
|---------|------|-------------|
| **Frontend** | 5173 → 80 | Interface React via Nginx |
| **Backend** | 8000 | API FastAPI |
| **PostgreSQL** | 5432 | Base de données |

#### Volumes Docker

```yaml
volumes:
  postgres_data:    # Données PostgreSQL persistantes
  hf_cache:         # Cache des modèles Hugging Face
```

### Architecture Docker

#### Backend (`Dockerfile`)

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Installation dépendances système
RUN apt-get update && apt-get install -y build-essential

# Installation dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code source
COPY database/ ./database/
COPY routers/ ./routers/
COPY main.py .

# Permissions pour SQLite (fallback)
RUN mkdir -p /app/database && chmod 777 /app/database

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend (`frontend/Dockerfile`)

Multi-stage build optimisé :

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Configuration Nginx (`frontend/nginx.conf`)

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # SPA routing
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache des assets
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
}
```

### Optimisations IA (optionnel)

```bash
# NVIDIA CUDA
pip install torch --index-url https://download.pytorch.org/whl/cu121

# Intel XPU
pip install torch==2.8.0 --index-url https://download.pytorch.org/whl/xpu
pip install intel-extension-for-pytorch==2.8.10+xpu
```

---

## 📝 Conventions de code

### Backend
- **Naming** : snake_case
- **Type hints** : Obligatoires
- **Docstrings** : Pour fonctions publiques
- **Validation** : Pydantic models

### Frontend
- **Naming** : camelCase (variables), PascalCase (composants)
- **Types** : Interfaces TypeScript strictes
- **Styled Components** : `*.styles.ts` séparés
- **Props** : `*.types.ts` séparés

---

## 🔮 Évolutions futures

### Prévues
- [ ] Export CSV/PDF des transactions
- [ ] Notifications par email
- [ ] Budget mensuel par catégorie
- [ ] Dark mode
- [ ] Multi-comptes bancaires

### En réflexion
- [ ] Application mobile (React Native)
- [ ] Sync automatique avec banques
- [ ] Prédictions budgétaires (ML)
- [ ] Comptes partagés (famille)

---

## 📚 Ressources

- [Documentation FastAPI](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Hugging Face Hub](https://huggingface.co/google/gemma-3-1b-it)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Recharts](https://recharts.org/)

---

---

## 📦 Fichiers de configuration

### `.env.example`

Template des variables d'environnement :

```env
# Hugging Face Token
HF_TOKEN=

# JWT Secret Key
SECRET_KEY=

# PostgreSQL (production Docker uniquement)
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_PORT=
DATABASE_NAME=
```

### `.dockerignore`

Exclusions pour la construction des images :

```
# Frontend (image séparée)
frontend/

# Configs et cache
.git
.vscode
.idea
__pycache__
*.pyc
.env

# Base de données locale
database/db.sqlite
```

### `docker-compose.yml`

Orchestration complète :

```yaml
services:
  backend:
    build: .
    container_name: anas-api
    ports:
      - "8000:8000"
    depends_on:
      - db
    env_file:
      - .env
    environment:
      - DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@db:${DATABASE_PORT}/${DATABASE_NAME}
    volumes:
      - hf_cache:/root/.cache/huggingface

  db:
    image: postgres:17
    container_name: anas-db
    restart: always
    env_file:
      - .env
    environment:
      - POSTGRES_USER=${DATABASE_USER}
      - POSTGRES_PASSWORD=${DATABASE_PASSWORD}
      - POSTGRES_DB=${DATABASE_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:80"
    environment:
      - NODE_ENV=production

volumes:
  postgres_data:
  hf_cache:
```

---

## 🔄 Évolutions apportées

### Version 1.1.0 - Dockerisation (Décembre 2025)

✅ **Infrastructure**
- Migration SQLite → PostgreSQL (production)
- Configuration Docker multi-services
- Volumes persistants pour données et cache IA
- Multi-stage build frontend (optimisation taille)

✅ **Configuration**
- URL de base de données dynamique
- Support des variables d'environnement
- Nginx comme reverse proxy frontend
- Hardcoding retiré du frontend (`fetch.ts`)

✅ **Déploiement**
- `docker-compose.yml` complet
- `.dockerignore` optimisé
- Configuration Nginx SPA-ready
- Séparation dev/prod claire

---

**Dernière mise à jour** : 17 décembre 2025  
**Version** : 1.1.0  
**Mainteneurs** : Gaëtan OUEYEYA, Olivier GABELLE, Alban ROBERT, Ryan ZERHOUNI, Ahmad BAALBAKY, Kohsey Dufour