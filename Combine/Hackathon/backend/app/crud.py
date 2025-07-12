from sqlalchemy.orm import Session
from app import models, schemas

def create_user(db: Session, user: schemas.UserCreate):
    user_data = models.User(
        name=user.name,
        email=user.email,
        password=user.password,
        location=user.location,
        availability=user.availability,
        skills_offered=", ".join(user.skills_offered),
        skills_wanted=", ".join(user.skills_wanted)
    )
    db.add(user_data)
    db.commit()
    db.refresh(user_data)
    return user_data

def create_swap_request(db: Session, request: schemas.SwapRequestCreate, requester_id: int):
    swap = models.SwapRequest(
        requester_id=requester_id,
        receiver_id=request.receiver_id,
        skill_offered=request.skill_offered,
        skill_wanted=request.skill_wanted,
        message=request.message
    )
    db.add(swap)
    db.commit()
    db.refresh(swap)
    return swap

def get_user_swap_requests(db: Session, user_id: int):
    return db.query(models.SwapRequest).filter(
        (models.SwapRequest.requester_id == user_id) |
        (models.SwapRequest.receiver_id == user_id)
    ).all()

def get_public_users_with_skills(db: Session):
    return db.query(models.User).filter(models.User.is_public == True).all()