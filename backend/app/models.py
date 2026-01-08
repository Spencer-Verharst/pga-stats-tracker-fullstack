from sqlalchemy import Column, Integer, String, Date, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from app.database import Base


class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    pga_id = Column(String(50), unique=True, index=True)
    full_name = Column(String(200), index=True)
    country = Column(String(100))
    photo_url = Column(String(255))
    world_rank = Column(Integer)
    birth_date = Column(Date, nullable=True)
    turned_pro = Column(Integer, nullable=True)
    career_earnings = Column(Numeric(12, 2), nullable=True)
    majors_won = Column(Integer, default=0)
    pga_tour_wins = Column(Integer, default=0)

    # Relationship to stats
    stats = relationship("PlayerStats", back_populates="player")


class PlayerStats(Base):
    __tablename__ = "player_stats"

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id"))
    season = Column(Integer)
    scoring_average = Column(Numeric(5, 2))
    driving_distance = Column(Numeric(5, 1))
    driving_accuracy_pct = Column(Numeric(5, 2))
    gir_pct = Column(Numeric(5, 2))
    putts_per_round = Column(Numeric(4, 2))
    top_10_finishes = Column(Integer)
    wins = Column(Integer)

    # Relationship back to player
    player = relationship("Player", back_populates="stats")