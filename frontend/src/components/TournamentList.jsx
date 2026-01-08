export default function TournamentList({ tournaments }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tournament</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Position</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Score</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tournaments.map((tournament, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">{tournament.tournament_name || 'N/A'}</td>
              <td className="px-6 py-4">
                {tournament.position ? `T${tournament.position}` : 'CUT'}
              </td>
              <td className="px-6 py-4">
                {tournament.score ?
                  (tournament.score > 0 ? `+${tournament.score}` : tournament.score)
                  : 'N/A'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {tournament.date ? new Date(tournament.date).toLocaleDateString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}