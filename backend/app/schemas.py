from pydantic import BaseModel
from typing import Optional
from datetime import date
from decimal import Decimal


class PlayerBase(BaseModel):
    full_name: str
    country: Optional[str] = None
    photo_url: Optional[str] = None
    world_rank: Optional[int] = None


class Player(PlayerBase):
    id: int
    majors_won: int
    pga_tour_wins: int
    career_earnings: Optional[Decimal] = None

    class Config:
        from_attributes = True


class PlayerStats(BaseModel):
    scoring_average: Optional[Decimal] = None
    driving_distance: Optional[Decimal] = None
    driving_accuracy_pct: Optional[Decimal] = None
    gir_pct: Optional[Decimal] = None
    putts_per_round: Optional[Decimal] = None
    top_10_finishes: Optional[int] = None
    wins: Optional[int] = None

    class Config:
        from_attributes = True


class PlayerDetail(Player):
    stats: Optional[PlayerStats] = None
    recent_tournaments: list = []