import { X } from 'lucide-react';

export const MatchDetailsModal = ({ match, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-navy-900 rounded-lg p-8 w-[500px] relative text-white">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          Detalles Partido
        </h2>

        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-16 h-16 mb-2" />
            <p className="font-semibold">{match.homeTeam.name}</p>
          </div>
          <div className="text-3xl font-bold">
            {match.score.split('-')[0]} - {match.score.split('-')[1]}
          </div>
          <div className="text-center">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-16 h-16 mb-2" />
            <p className="font-semibold">{match.awayTeam.name}</p>
          </div>
        </div>

        <div className="bg-navy-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center text-emerald-400">
            Goleadores
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-2">{match.homeTeam.name}</h4>
              <ul className="space-y-1 text-gray-300">
                {match.homeScorers.map((scorer, index) => (
                  <li key={index}>{scorer}</li>
                ))}
                {match.homeScorers.length === 0 && (
                  <li className="text-gray-500">Sin goles</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">{match.awayTeam.name}</h4>
              <ul className="space-y-1 text-gray-300">
                {match.awayScorers.map((scorer, index) => (
                  <li key={index}>{scorer}</li>
                ))}
                {match.awayScorers.length === 0 && (
                  <li className="text-gray-500">Sin goles</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};