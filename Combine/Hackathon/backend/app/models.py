from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, Table
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    location = Column(String, nullable=True)
    is_public = Column(Boolean, default=True)
    availability = Column(String, nullable=True)
    skills_offered = Column(Text)  # Comma-separated string
    skills_wanted = Column(Text)

class SwapRequest(Base):
    __tablename__ = "swap_requests"

    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id"))
    skill_offered = Column(String)
    skill_wanted = Column(String)
    message = Column(Text)
    status = Column(String, default="Pending")  # Pending, Accepted, Rejected

    requester = relationship("User", foreign_keys=[requester_id])
    receiver = relationship("User", foreign_keys=[receiver_id])
