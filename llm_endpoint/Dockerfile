FROM ghcr.io/astral-sh/uv:python3.12-trixie

# ARG pour l'architecture: cpu, intel, cuda
ARG ARCHITECTURE=cpu

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
        echo "Installing CUDA dependencies..." && \
        uv pip install --system --no-cache \
            torch \
            --index-url https://download.pytorch.org/whl/cu121; \
    else \
        echo "Using CPU-only PyTorch"; \
    fi

COPY entrypoint.py .

EXPOSE 8001

CMD ["python", "entrypoint.py"]
