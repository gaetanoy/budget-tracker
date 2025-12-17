from sqlalchemy import Column, Integer, String
from database.models import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    salt = Column(String)
    categories = relationship("Category", back_populates="user")
    accounts = relationship("Account", back_populates="user")