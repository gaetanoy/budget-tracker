class Category:
"""
    Represents a category that can be applied to transactions.
    
    Attributes:
        id (int): Unique identifier for the category.
        title (str): The title of the category.
        color (str): The color associated with the category.
        icon (str): The icon path for the category.
        user_id (int): The ID of the user associated with the category.
    """
    def __init__(self, id: int, title: str, color: str, icon: str, user_id: int):
        self.id: int = id
        self.title: str = title
        self.color: str = color
        self.icon: str = icon # chemin de l'icône
        self.user_id: int = user_id

    def __repr__(self):
        return f"Category(id={self.id}, title={self.title}, color={self.color}, icon={self.icon})"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "color": self.color,
            "icon": self.icon,
            "user_id": self.user_id
        }