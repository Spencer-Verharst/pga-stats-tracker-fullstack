from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import routes
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PGA Stats API",
    description="API for tracking PGA Tour player statistics",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "PGA Stats API",
        "endpoints": {
            "search": "/api/players/search?q=tiger",
            "player_detail": "/api/players/{id}"
        }
    }
