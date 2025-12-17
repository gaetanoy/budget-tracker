FROM ghcr.io/astral-sh/uv:python3.12-trixie

WORKDIR /app

# Dépendances système pour torch
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Installation des dépendances avec uv
RUN uv pip install --system --no-cache -r requirements.txt

COPY entrypoint.py .

EXPOSE 8001

CMD ["python", "entrypoint.py"]
