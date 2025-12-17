from sqlalchemy.orm import Session
from database.models import Bank
import os

DEFAULT_BANK = [
    {"name": "Caisse d'Epargne", "icon": "/assets/bank_icons/caisse_epargne.png"},
    {"name": "BoursoBank", "icon": "/assets/bank_icons/boursobank.png"},
    {"name": "Trade Republic", "icon": "/assets/bank_icons/trade_republic.jpg"},
    {"name": "Revolut", "icon": "/assets/bank_icons/revolut.png"},
    {"name": "Crédit Mutuel", "icon": "/assets/bank_icons/credit_mutuel.png"},
    {"name": "Hello Bank", "icon": "/assets/bank_icons/hello_bank"},
    {"name": "N26", "icon": "/assets/bank_icons/n26.png"},
    {"name": "ING", "icon": "/assets/bank_icons/ing.png"},
    {"name": "Boursorama", "icon": "/assets/bank_icons/boursorama.png"},
    {"name": "Fortuneo", "icon": "/assets/bank_icons/fortuneo.png"},
    {"name": "Monabanq", "icon": "/assets/bank_icons/monabanq.png"},
    {"name": "Orange Bank", "icon": "/assets/bank_icons/orange_bank.png"},
    {"name": "Société Générale", "icon": "/assets/bank_icons/societe_generale.png"},
    {"name": "Banque Postale", "icon": "/assets/bank_icons/banque_postale.png"},
    {"name": "LCL", "icon": "/assets/bank_icons/lcl.png"},
    {"name": "Crédit Agricole", "icon": "/assets/bank_icons/credit_agricole.png"},
    {"name": "BNP Paribas", "icon": "/assets/bank_icons/bnp_paribas.png"},
    {"name": "HSBC", "icon": "/assets/bank_icons/hsbc.png"},
    {"name": "La Banque Populaire", "icon": "/assets/bank_icons/banque_populaire.png"},
    {"name": "AXA Banque", "icon": "/assets/bank_icons/axa_banque.png"},
    {"name": "CIC", "icon": "/assets/bank_icons/cic.png"},
]

DEFAULT_BANK_PATH = "/assets/bank_icons/default_bank.png"

def seed_default_banks(db: Session):
    """Insère les banques par défaut si elles n'existent pas déjà."""
    existing = db.query(Bank).count()

    if existing == 0:
        for cat_data in DEFAULT_BANK:
            bank = Bank(
                name=cat_data["name"],
                icon=cat_data["icon"] if os.path.exists(cat_data["icon"]) else DEFAULT_BANK_PATH,
            )
            db.add(bank)
        db.commit()
        return len(DEFAULT_BANK)
    return 0