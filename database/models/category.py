class Category:
    def __init__(self, name, description=None):
        self.id = id
        self.title = title
        self.color = color
        self.icon = icon
        self.user_id = user_id

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