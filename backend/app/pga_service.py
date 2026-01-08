import requests
import os
from typing import List, Dict, Optional
from dotenv import load_dotenv
from app.mock_data import MOCK_PLAYERS, MOCK_STATS, MOCK_TOURNAMENTS

load_dotenv()

class PGAService:
    def __init__(self):
        self.api_key = os.getenv("SPORTSDATA_API_KEY")
        self.base_url = "https://api.sportsdata.io/golf/v2/json"
        self.use_mock_data = True  # Set to False to use real API

    def _get_headers(self):
        return {"Ocp-Apim-Subscription-Key": self.api_key}

    def get_all_players(self) -> List[Dict]:
        if self.use_mock_data:
            return MOCK_PLAYERS

        url = f"{self.base_url}/Players"
        try:
            response = requests.get(url, headers=self._get_headers())
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching players: {e}")
            return MOCK_PLAYERS

    def search_players(self, query: str) -> List[Dict]:
        all_players = self.get_all_players()
        query_lower = query.lower()

        matches = [
            p for p in all_players
            if query_lower in p.get('first_name', '').lower()
               or query_lower in p.get('last_name', '').lower()
               or query_lower in p.get('full_name', '').lower()
        ]

        return matches[:10]

    def get_player_by_id(self, player_id: int) -> Optional[Dict]:
        all_players = self.get_all_players()
        return next((p for p in all_players if p['player_id'] == player_id), None)

    def get_player_stats(self, player_id: int, season: int = 2024) -> Optional[Dict]:
        if self.use_mock_data:
            return MOCK_STATS.get(player_id)

        url = f"{self.base_url}/PlayerSeasonStats/{season}"
        try:
            response = requests.get(url, headers=self._get_headers())
            response.raise_for_status()
            all_stats = response.json()

            player_stats = next(
                (s for s in all_stats if s.get('PlayerID') == player_id),
                None
            )
            return player_stats
        except requests.exceptions.RequestException as e:
            print(f"Error fetching player stats: {e}")
            return MOCK_STATS.get(player_id)

    def get_player_tournaments(self, player_id: int, season: int = 2024) -> List[Dict]:
        if self.use_mock_data:
            return MOCK_TOURNAMENTS.get(player_id, MOCK_TOURNAMENTS["default"])

        url = f"{self.base_url}/PlayerTournamentStatsByPlayer/{season}/{player_id}"
        try:
            response = requests.get(url, headers=self._get_headers())
            response.raise_for_status()
            tournaments = response.json()

            sorted_tournaments = sorted(
                tournaments,
                key=lambda x: x.get('StartDate', ''),
                reverse=True
            )
            return sorted_tournaments[:5]
        except requests.exceptions.RequestException as e:
            print(f"Error fetching tournaments: {e}")
            return MOCK_TOURNAMENTS.get(player_id, MOCK_TOURNAMENTS["default"])
