class User:
    def __init__(self, user_id, username, hashed_password, email):
        self.user_id = user_id
        self.username = username
        self.hashed_password = hashed_password
        self.email = email

    def __repr__(self):
        return f"User(user_id={self.user_id}, username='{self.username}', email='{self.email}')"

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email
        }