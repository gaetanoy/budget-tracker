from sqlalchemy.orm import Session
from database.models import Category

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
    {"name": "Épargne", "color": "#FFEB3B", "icon": "🐷"},
    {"name": "Investissements", "color": "#4CAF50", "icon": "📈"},
    {"name": "Essence", "color": "#FF5722", "icon": "⛽"},
    {"name": "Autres", "color": "#757575", "icon": "📦"},
]


def seed_default_categories(db: Session):
    """Insère les catégories par défaut si elles n'existent pas déjà."""
    existing = db.query(Category).filter(Category.is_default).count()
    
    if existing == 0:
        for cat_data in DEFAULT_CATEGORIES:
            category = Category(
                name=cat_data["name"],
                color=cat_data["color"],
                icon=cat_data["icon"],
                user_id=None,
                is_default=True
            )
            db.add(category)
        db.commit()
        return len(DEFAULT_CATEGORIES)
    return 0