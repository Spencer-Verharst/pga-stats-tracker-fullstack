import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayer } from '../services/api';
import PlayerProfile from '../components/PlayerProfile';
import StatsGrid from '../components/StatsGrid';
import TournamentList from '../components/TournamentList';

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const data = await getPlayer(id);
        setPlayer(data);
      } catch (error) {
        console.error('Error fetching player:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="text-center py-8">
        <p className="text-xl">Player not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PlayerProfile player={player} />

      {player.stats && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">2024 Season Stats</h2>
          <StatsGrid stats={player.stats} />
        </div>
      )}

      {player.recent_tournaments && player.recent_tournaments.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Tournaments</h2>
          <TournamentList tournaments={player.recent_tournaments} />
        </div>
      )}
    </div>
  );
}