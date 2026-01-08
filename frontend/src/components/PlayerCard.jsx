import { Link } from 'react-router-dom';
import { MapPin, Trophy } from 'lucide-react';

export default function PlayerCard({ player }) {
  return (
    <Link to={`/players/${player.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex items-center gap-4">
        <img
          src={player.photo_url || 'https://via.placeholder.com/80'}
          alt={player.full_name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="text-lg font-bold">{player.full_name}</h3>

          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {player.country}
            </div>

            {player.world_rank && (
              <div className="flex items-center gap-1">
                <Trophy size={14} />
                Rank #{player.world_rank}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}