class Transaction:
    def __init__(self, transaction_id, amount, title, date, user_id, category_id):
        self.transaction_id : int = transaction_id
        self.amount: float = amount
        self.title: str = title
        self.date: str = date
        self.user_id: int = user_id
        self.category_id: int = category_id

    def __repr__(self):
        return f"<Transaction id={self.transaction_id} amount={self.amount} {self.title} date={self.date}>"

    def to_dict(self):
        return {
            "transaction_id": self.transaction_id,
            "amount": self.amount,
            "title": self.title,
            "date": self.date,
            "user_id": self.user_id,
            "category_id": self.category_id
        }