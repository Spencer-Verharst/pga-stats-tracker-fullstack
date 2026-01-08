import { useState } from 'react';
import { searchPlayers } from '../services/api';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Search PGA Tour Players</h2>
        <p className="text-gray-600">Find stats and tournament results for your favorite golfers</p>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      <div className="mt-8 space-y-4">
        {players.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}