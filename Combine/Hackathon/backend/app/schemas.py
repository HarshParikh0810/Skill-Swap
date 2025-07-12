from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    email: str
    location: Optional[str] = None
    availability: Optional[str] = None
    skills_offered: List[str] = []
    skills_wanted: List[str] = []

class UserCreate(UserBase):
    password: str

class LoginForm(BaseModel):
    email: str
    password: str

class UserOut(UserBase):
    id: int
    is_public: bool
    class Config:
        orm_mode = True

class SwapRequestCreate(BaseModel):
    receiver_id: int
    skill_offered: str
    skill_wanted: str
    message: Optional[str]

class MatchRequest(BaseModel):
    interested_skills: List[str]

class MatchedUser(BaseModel):
    id: int
    name: str
    skills_offered: List[str]
    score: float