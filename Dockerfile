FROM ghcr.io/astral-sh/uv:python3.12-trixie

WORKDIR /app

# Dépendances système pour psycopg2 et cryptography
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Installation des dépendances avec uv
RUN uv pip install --system --no-cache -r requirements.txt

COPY database/ ./database/
COPY routers/ ./routers/
COPY main.py .

RUN mkdir -p /app/database && chmod 777 /app/database

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]