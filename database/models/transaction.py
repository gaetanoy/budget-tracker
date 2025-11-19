class Transaction:
    """
    Represents a transaction (+/-).

    Attributes:
        transaction_id (int): Unique identifier for the transaction.
        amount (float): The amount of the transaction.
        title (str): The title or description of the transaction.
        t_date (str): The date of the transaction.
        user_id (int): The ID of the user associated with the transaction.
        category_id (int): The ID of the category associated with the transaction.
    """
    def __init__(self, transaction_id, amount, title, t_date, user_id, category_id):
        self.transaction_id: int = transaction_id
        self.amount: float = amount
        self.title: str = title
        self.t_date: str = t_date
        self.user_id: int = user_id
        self.category_id: int = category_id

    def __repr__(self):
        return f"<Transaction id={self.transaction_id} amount={self.amount} {self.title} date={self.t_date}>"
    def to_dict(self):
        return {
            "transaction_id": self.transaction_id,
            "amount": self.amount,
            "title": self.title,
            "date": self.t_date,
            "user_id": self.user_id,
            "category_id": self.category_id
        }