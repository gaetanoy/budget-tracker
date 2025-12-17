from huggingface_hub import login
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager
import os
from transformers import pipeline
import torch
import logging
import uvicorn

logger = logging.getLogger("uvicorn.error")

# Variable globale pour le pipeline
categorization_pipe = None


def get_best_device():
    """Détecte le meilleur device disponible: CUDA > XPU (Intel) > CPU"""
    if torch.cuda.is_available():
        logger.info("CUDA détecté")
        return "cuda"
    
    # Support Intel XPU (GPU/NPU Intel)
    try:
        import intel_extension_for_pytorch as ipex # type: ignore # Noqa: F401
        if torch.xpu.is_available():
            logger.info("Intel XPU/NPU détecté")
            return "xpu"
    except ImportError:
        logger.info("intel-extension-for-pytorch non installé")
    except AttributeError:
        logger.info("XPU non disponible sur ce système")
    
    logger.info("Utilisation du CPU")
    return "cpu"


@asynccontextmanager
async def lifespan(app: FastAPI):
    global categorization_pipe
    
    logger.info("Authentification auprès de Hugging Face Hub...")
    try:
        login(os.getenv("HF_TOKEN"))
        logger.info("Authentifié auprès de Hugging Face Hub avec succès")
    except Exception as e:
        logger.error(f"Erreur d'authentification auprès de Hugging Face Hub: {e}")
        raise e

    logger.info("Chargement du modèle d'IA...")
    try:
        categorization_pipe = pipeline(
            "text-generation",
            model="google/gemma-3-1b-it",
            device=get_best_device(),
            dtype=torch.bfloat16,
        )
        logger.info("Modèle d'IA chargé avec succès.")
    except Exception as e:
        logger.error(f"Erreur lors du chargement du modèle d'IA: {e}")
        raise e

    yield

    # Cleanup
    if categorization_pipe is not None:
        del categorization_pipe
        logger.info("Modèle d'IA déchargé.")


app = FastAPI(
    title="ANAS - LLM Categorization Service",
    description="Service de catégorisation automatique des transactions",
    version="1.0.0",
    lifespan=lifespan
)


class CategorizeRequest(BaseModel):
    transaction_description: str
    category_names: list[str]


class CategorizeResponse(BaseModel):
    category: str


@app.get("/health")
async def health_check():
    """Endpoint de santé pour vérifier l'état du service LLM"""
    return {"status": "healthy", "model_loaded": categorization_pipe is not None}


@app.post("/categorize", response_model=CategorizeResponse)
async def categorize_transaction(request: CategorizeRequest):
    """Catégorise automatiquement une transaction"""
    global categorization_pipe
    
    if categorization_pipe is None:
        raise HTTPException(status_code=503, detail="AI model not loaded")

    messages = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are a strict financial categorization assistant. Your only job is to map a transaction description to one single category from the provided list.",
                }
            ],
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"""
Task: Categorize the following transaction.

Transaction Description: "{request.transaction_description}"

Allowed Categories: {', '.join(request.category_names)}

Instructions:
- Return ONLY the exact name of the category from the list above.
- Do not add explanations.
- Do not add punctuation like periods.
- If the description is ambiguous, choose the closest match.
""",
                }
            ],
        },
    ]

    try:
        outputs = categorization_pipe(messages, max_new_tokens=20)
        predicted_category = outputs[0]["generated_text"][-1]["content"].strip()

        # Vérification que la catégorie prédite est dans la liste
        matched_category = next(
            (name for name in request.category_names if name.lower() == predicted_category.lower()),
            None,
        )

        return {"category": matched_category if matched_category else "Autres"}
    except Exception as e:
        logger.error(f"Erreur lors de la catégorisation: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    port = int(os.getenv("LLM_SERVICE_PORT", "8001"))
    uvicorn.run(app, host="0.0.0.0", port=port)
