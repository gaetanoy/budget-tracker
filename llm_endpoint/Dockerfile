# ============================================
# Stage 1: Base images selon l'architecture
# ============================================

ARG ARCHITECTURE=cpu

# Image de base pour CPU
FROM ghcr.io/astral-sh/uv:python3.12-trixie AS base-cpu

# Image de base pour Intel (même image que CPU, extensions installées après)
FROM ghcr.io/astral-sh/uv:python3.12-trixie AS base-intel

# Image de base pour CUDA
FROM pytorch/pytorch:2.9.1-cuda12.8-cudnn9-runtime AS base-cuda
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && ln -s /root/.local/bin/uv /usr/local/bin/uv \
    && rm -rf /var/lib/apt/lists/*

# ============================================
# Stage 2: Build final
# ============================================
FROM base-${ARCHITECTURE} AS final

WORKDIR /app

# Dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Installation des dépendances de base avec uv
RUN uv pip install --system --no-cache -r requirements.txt

# Installation conditionnelle selon l'architecture
RUN if [ "$ARCHITECTURE" = "intel" ]; then \
        echo "Installing Intel XPU dependencies..." && \
        uv pip install --system --no-cache torch==2.8.0 torchvision==0.23.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/xpu; \
        uv pip install --system --no-cache pip install psutil intel-extension-for-pytorch==2.8.10+xpu --index-url https://pytorch-extension.intel.com/release-whl/stable/xpu/us/; \
    elif [ "$ARCHITECTURE" = "cuda" ]; then \
        echo "CUDA PyTorch already installed from base image"; \
        uv pip install --system --no-cache transformers; \
    else \
        echo "Using CPU-only PyTorch"; \
        uv pip install --system --no-cache torch transformers; \
    fi

COPY entrypoint.py .

EXPOSE 8001

CMD ["python", "entrypoint.py"]
