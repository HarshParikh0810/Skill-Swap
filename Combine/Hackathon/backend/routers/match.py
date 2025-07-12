from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from ml.recommender import match_user
from app import crud, schemas

router = APIRouter(prefix="/match", tags=["Matchmaking"])
@router.get("/test")
def test_route():
    return {"message": "Skill match endpoint is working!"}


@router.post("/", response_model=list[schemas.MatchedUser])
def skill_match(request: schemas.MatchRequest, db: Session = Depends(get_db)):
    all_users = crud.get_public_users_with_skills(db)

    users_data = []
    for user in all_users:
        if user.skills_offered:
            if isinstance(user.skills_offered, str):
                skills = [s.strip() for s in user.skills_offered.split(",")]
            else:
                skills = user.skills_offered

            users_data.append({
                "id": user.id,
                "name": user.name,
                "skills_offered": skills
            })

    matches = match_user(request.interested_skills, users_data)

    # Format response properly
    result = []
    for match in matches[:10]:
        matched_user = match["user"]
        result.append({
            "id": matched_user["id"],
            "name": matched_user["name"],
            "skills_offered": matched_user["skills_offered"],
            "score": match["score"]
        })

    return result
