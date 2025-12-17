from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database.models import Base


class Account(Base):
    __tablename__ = "account"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    is_default = Column(Boolean, nullable=False, default=False)

    user_id = Column(Integer, ForeignKey("user.id"), nullable=False, unique=True)
    bank_id = Column(Integer, ForeignKey("bank.id"), nullable=True, unique=True)

    user = relationship("User", back_populates="accounts")
    bank = relationship("Bank", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")
