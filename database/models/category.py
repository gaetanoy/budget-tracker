from sqlalchemy import Column, Integer, String, ForeignKey
from database.models import Base
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    name = Column(String, unique=True, index=True, nullable=False)
    color = Column(String, nullable=True)
    icon = Column(String, nullable=True)
    user = relationship("User", back_populates="categories")
