from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, models, crud
from app.database import get_db
from auth.jwt_handler import create_access_token


router = APIRouter(prefix="/auth", tags=["User"])

@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)

@router.post("/login")
def login(form_data: schemas.LoginForm, db: Session = Depends(get_db)):

    print(form_data)

    user = db.query(models.User).filter(models.User.email == form_data.email).first()
    if not user or form_data.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
