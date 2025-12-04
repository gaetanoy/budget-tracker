from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database.models import Base


class Transaction(Base):
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

    __tablename__ = "transaction"

    transaction_id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    title = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    user = relationship("User", back_populates="transaction")
    category = relationship("Category", back_populates="transaction")