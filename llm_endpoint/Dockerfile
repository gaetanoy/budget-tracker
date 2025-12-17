# ============================================
# Stage 1: Base images selon l'architecture
# ============================================

# Image de base pour CPU/Intel
FROM ghcr.io/astral-sh/uv:python3.12-trixie AS base-cpu

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
ARG ARCHITECTURE=cpu
FROM base-${ARCHITECTURE} AS final

ARG ARCHITECTURE
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
        uv pip install --system --no-cache \
            intel-extension-for-pytorch \
            oneccl_bind_pt \
            --extra-index-url https://pytorch-extension.intel.com/release-whl/stable/xpu/us/; \
    elif [ "$ARCHITECTURE" = "cuda" ]; then \
        echo "CUDA PyTorch already installed from base image"; \
    else \
        echo "Using CPU-only PyTorch"; \
    fi

COPY entrypoint.py .

EXPOSE 8001

CMD ["python", "entrypoint.py"]
