from sqlalchemy import Column, Integer, String
from database.models import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    color = Column(String, nullable=True)
    icon = Column(String, nullable=True)
