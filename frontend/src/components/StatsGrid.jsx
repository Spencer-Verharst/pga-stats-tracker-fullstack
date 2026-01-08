export default function StatsGrid({ stats }) {
  const statItems = [
    { label: 'Scoring Average', value: stats.scoring_average ? parseFloat(stats.scoring_average).toFixed(2) : 'N/A' },
    { label: 'Driving Distance', value: stats.driving_distance ? `${parseFloat(stats.driving_distance).toFixed(1)} yds` : 'N/A' },
    { label: 'Driving Accuracy', value: stats.driving_accuracy_pct ? `${parseFloat(stats.driving_accuracy_pct).toFixed(1)}%` : 'N/A' },
    { label: 'Greens in Regulation', value: stats.gir_pct ? `${parseFloat(stats.gir_pct).toFixed(1)}%` : 'N/A' },
    { label: 'Putts per Round', value: stats.putts_per_round ? parseFloat(stats.putts_per_round).toFixed(2) : 'N/A' },
    { label: 'Top 10 Finishes', value: stats.top_10_finishes || 0 },
    { label: 'Wins', value: stats.wins || 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
          <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}