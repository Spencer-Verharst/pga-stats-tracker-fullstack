import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useState } from 'react';

export default function WorldRankLeaderboard({ players }) {
    const [showAll, setShowAll] = useState(false);

  // Sort players by world rank
  const sortedPlayers = [...players].sort((a, b) => a.world_rank - b.world_rank);

  // Show top 50 or all
  const displayedPlayers = showAll ? sortedPlayers : sortedPlayers.slice(0, 50);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" size={32} />
        <h2 className="text-2xl font-bold">World Golf Rankings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Player</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Country</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedPlayers.map((player) => (
              <tr key={player.player_id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-bold text-blue-600">
                  #{player.world_rank}
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/players/${player.player_id}`}
                    className="font-medium hover:text-blue-600 transition"
                  >
                    {player.full_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">{player.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedPlayers.length > 50 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showAll ? 'Show Less' : `Show More (${sortedPlayers.length - 50} more)`}
          </button>
        </div>
      )}
    </div>
  );
}