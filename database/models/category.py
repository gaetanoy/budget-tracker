from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from database.models import Base
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=True)  # NULL = catégorie par défaut
    name = Column(String, index=True, nullable=False)
    color = Column(String, nullable=True)
    icon = Column(String, nullable=True)
    is_default = Column(Boolean, default=False, nullable=False)  # True = catégorie système
    user = relationship("User", back_populates="categories")