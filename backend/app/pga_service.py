import requests
import os
from typing import List, Dict, Optional
from dotenv import load_dotenv

load_dotenv()


class PGAService:
    def __init__(self):
        self.api_key = os.getenv("SPORTSDATA_API_KEY")
        self.base_url = "https://api.sportsdata.io/golf/v2/json"

    def _get_headers(self):
        """Private method to get API headers"""
        return {"Ocp-Apim-Subscription-Key": self.api_key}

    def get_all_players(self) -> List[Dict]:
        """Get all players from API"""
        url = f"{self.base_url}/Players"

        try:
            response = requests.get(url, headers=self._get_headers())
            response.raise_for_status()  # Raises error for bad status codes
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching players: {e}")
            return []

    def search_players(self, query: str) -> List[Dict]:
        """Search players by name"""
        all_players = self.get_all_players()
        query_lower = query.lower()

        matches = [
            p for p in all_players
            if query_lower in p.get('FirstName', '').lower()
               or query_lower in p.get('LastName', '').lower()
        ]

        return matches[:10]  # Return top 10 matches

    def get_player_stats(self, player_id: str, season: int = 2024) -> Optional[Dict]:
        """Get player stats for a specific season"""
        url = f"{self.base_url}/PlayerSeasonStats/{season}"

        try:
            response = requests.get(url, headers=self._get_headers())
            response.raise_for_status()
            all_stats = response.json()

            # Find stats for specific player
            player_stats = next(
                (s for s in all_stats if str(s.get('PlayerID')) == str(player_id)),
                None
            )

            return player_stats
        except requests.exceptions.RequestException as e:
            print(f"Error fetching player stats: {e}")
            return None

    def get_player_tournaments(self, player_id: str, season: int = 2024) -> List[Dict]:
        """Get recent tournament results for a player"""
        url = f"{self.base_url}/PlayerTournamentStatsByPlayer/{season}/{player_id}"

        try:
            response = requests.get(url, headers=self._get_headers())
            response.raise_for_status()
            tournaments = response.json()

            # Sort by date (most recent first) and get last 5
            sorted_tournaments = sorted(
                tournaments,
                key=lambda x: x.get('StartDate', ''),
                reverse=True
            )

            return sorted_tournaments[:5]
        except requests.exceptions.RequestException as e:
            print(f"Error fetching tournaments: {e}")
            return []