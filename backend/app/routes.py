from fastapi import APIRouter, HTTPException, Query
from app.pga_service import PGAService

router = APIRouter()
pga_service = PGAService()


@router.get("/players/search")
def search_players(q: str = Query(..., min_length=2)):
    results = pga_service.search_players(q)
    return results


@router.get("/players/{player_id}")
def get_player(player_id: int):
    player = pga_service.get_player_by_id(player_id)

    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    stats = pga_service.get_player_stats(player_id)

    tournaments = pga_service.get_player_tournaments(player_id)

    return {
        **player,
        "stats": stats,
        "recent_tournaments": tournaments
    }
