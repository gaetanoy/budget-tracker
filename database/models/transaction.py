from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from datetime import date
from database.models import Base


class Transaction(Base):
    """
    Represents a transaction (+/-).

    Attributes:
        id (int): Unique identifier for the transaction.
        amount (float): The amount of the transaction.
        title (str): The title or description of the transaction.
        date (str): The date of the transaction.
        account_id (int): The ID of the account associated with the transaction.
        category_id (int): The ID of the category associated with the transaction.
    """

    __tablename__ = "transaction"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    title = Column(String, nullable=False)
    date: date = Column(Date, nullable=False)
    account_id = Column(Integer, ForeignKey("account.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)
    account = relationship("Account", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")