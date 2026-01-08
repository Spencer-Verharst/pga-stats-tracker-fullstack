import { MapPin, Trophy } from 'lucide-react';

export default function PlayerProfile({ player }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start gap-6">
        <img
          src={player.photo_url || 'https://via.placeholder.com/150'}
          alt={player.full_name}
          className="w-32 h-32 rounded-full object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{player.full_name}</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-blue-600" size={20} />
              <div>
                <div className="text-sm text-gray-600">Country</div>
                <div className="font-medium">{player.country}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="text-blue-600" size={20} />
              <div>
                <div className="text-sm text-gray-600">World Rank</div>
                <div className="font-medium">#{player.world_rank || 'N/A'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-600" size={20} />
              <div>
                <div className="text-sm text-gray-600">Majors</div>
                <div className="font-medium">{player.majors_won}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="text-green-600" size={20} />
              <div>
                <div className="text-sm text-gray-600">Tour Wins</div>
                <div className="font-medium">{player.pga_tour_wins}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}