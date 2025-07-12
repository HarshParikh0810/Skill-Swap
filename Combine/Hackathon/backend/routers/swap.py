from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from auth.oauth2 import get_current_user
from app import schemas, crud

router = APIRouter(prefix="/swaps", tags=["Swaps"])

@router.post("/request")
def send_swap(request: schemas.SwapRequestCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.create_swap_request(db, request, user.id)

@router.get("/my-requests")
def get_my_swaps(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return crud.get_user_swap_requests(db, user.id)