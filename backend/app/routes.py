from fastapi import APIRouter, HTTPException, Query
from app.pga_service import PGAService

router = APIRouter()
pga_service = PGAService()


@router.get("/players/search")
def search_players(q: str = Query(..., min_length=2)):
    """Search for players by name - returns mock data directly"""
    results = pga_service.search_players(q)
    return results


@router.get("/players/{player_id}")
def get_player(player_id: int):
    """Get player details with stats and recent tournaments"""
    # Get player info from mock data
    player = pga_service.get_player_by_id(player_id)

    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    # Get stats from mock data
    stats = pga_service.get_player_stats(player_id)

    # Get tournaments from mock data
    tournaments = pga_service.get_player_tournaments(player_id)

    # Return everything combined
    return {
        **player,
        "stats": stats,
        "recent_tournaments": tournaments
    }
