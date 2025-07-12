from fastapi import FastAPI
from routers import user, swap, match
from app.database import engine
from app import models
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Welcome to the Skill Swap API!"}

origins = ["*"]  # For development only
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(swap.router)
app.include_router(match.router)

