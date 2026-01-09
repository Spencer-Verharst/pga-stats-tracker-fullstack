import { useState, useEffect } from 'react';
import { searchPlayers, getAllPlayers } from '../services/api';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';
import WorldRankLeaderboard from '../components/WorldRankLeaderboard';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const results = await getAllPlayers();
        setAllPlayers(results);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    fetchAllPlayers();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchPlayers(query);
      setPlayers(results);
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching players. Make sure the backend is running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Search PGA Tour Players</h2>
        <p className="text-gray-600">Find stats and tournament results for your favorite golfers</p>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {/* Search Results */}
      {players.length > 0 && (
        <div className="mt-8 space-y-4">
          {players.map(player => (
            <PlayerCard key={player.player_id} player={player} />
          ))}
        </div>
      )}

      {/* World Rankings Leaderboard */}
      <div className="mt-12">
        {loadingLeaderboard ? (
          <div className="text-center py-8">
            <div className="text-xl">Loading rankings...</div>
          </div>
        ) : (
          <WorldRankLeaderboard players={allPlayers} />
        )}
      </div>
    </div>
  );
}
