from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.models import Base


class Bank(Base):
    __tablename__ = "bank"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    icon = Column(String, nullable=True)
    accounts = relationship("Account", back_populates="bank")