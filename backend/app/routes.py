from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app import schemas, models
from app.database import get_db
from app.pga_service import PGAService

router = APIRouter()
pga_service = PGAService()


@router.get("/players/search", response_model=List[schemas.Player])
def search_players(
        q: str = Query(..., min_length=2),
        db: Session = Depends(get_db)
):
    """Search for players by name"""
    # Search in local database first
    players = db.query(models.Player).filter(
        models.Player.full_name.ilike(f"%{q}%")
    ).limit(10).all()

    if players:
        return players

    # If not found locally, search via API and save
    api_results = pga_service.search_players(q)

    for player_data in api_results:
        existing = db.query(models.Player).filter(
            models.Player.pga_id == str(player_data['PlayerID'])
        ).first()

        if not existing:
            new_player = models.Player(
                pga_id=str(player_data['PlayerID']),
                full_name=f"{player_data.get('FirstName', '')} {player_data.get('LastName', '')}",
                country=player_data.get('Country'),
                photo_url=player_data.get('PhotoUrl'),
                world_rank=player_data.get('Rank'),
                majors_won=player_data.get('Majors', 0),
                pga_tour_wins=player_data.get('Wins', 0)
            )
            db.add(new_player)

    db.commit()

    # Return newly saved players
    players = db.query(models.Player).filter(
        models.Player.full_name.ilike(f"%{q}%")
    ).limit(10).all()

    return players


@router.get("/players/{player_id}", response_model=schemas.PlayerDetail)
def get_player(player_id: int, db: Session = Depends(get_db)):
    """Get player details with stats and recent tournaments"""
    player = db.query(models.Player).filter(models.Player.id == player_id).first()

    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    # Get stats from API
    stats_data = pga_service.get_player_stats(player.pga_id)

    stats = None
    if stats_data:
        # Check if stats exist in DB
        existing_stats = db.query(models.PlayerStats).filter(
            models.PlayerStats.player_id == player_id,
            models.PlayerStats.season == 2024
        ).first()

        if existing_stats:
            stats = existing_stats
        else:
            # Save stats to DB
            stats = models.PlayerStats(
                player_id=player_id,
                season=2024,
                scoring_average=stats_data.get('AvgScore'),
                driving_distance=stats_data.get('AverageDriveDistance'),
                driving_accuracy_pct=stats_data.get('DrivingAccuracy'),
                gir_pct=stats_data.get('GreensInRegulation'),
                putts_per_round=stats_data.get('AveragePutts'),
                top_10_finishes=stats_data.get('Top10Finishes', 0),
                wins=stats_data.get('Wins', 0)
            )
            db.add(stats)
            db.commit()
            db.refresh(stats)

    # Get recent tournaments from API
    tournaments = pga_service.get_player_tournaments(player.pga_id)

    # Format tournaments for response
    formatted_tournaments = [
        {
            "tournament_name": t.get('TournamentName'),
            "position": t.get('Rank'),
            "score": t.get('TotalScore'),
            "date": t.get('StartDate')
        }
        for t in tournaments
    ]

    return {
        **player.__dict__,
        "stats": stats,
        "recent_tournaments": formatted_tournaments
    }