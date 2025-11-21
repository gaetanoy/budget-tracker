class User:
    """
    Represents a user.

    Attributes:
        user_id (int): Unique identifier for the user.
        username (str): The user's username.
        hashed_password (str): The user's hashed password.
        email (str): The user's email address.
    """
    def __init__(self, user_id: int, username: str, hashed_password: str, email: str):
        self.user_id: int = user_id
        self.username: str = username
        self.hashed_password: str = hashed_password
        self.email: str = email

    def __repr__(self):
        return f"User(user_id={self.user_id}, username='{self.username}')"

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email
        }