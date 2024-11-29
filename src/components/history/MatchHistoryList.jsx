export const MatchHistoryList = ({ matches, onViewDetails }) => {
    return (
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-800 rounded-lg p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-400">Fecha del encuentro: {match.date}</p>
                <p className="text-sm text-gray-400">Tipo de competición: {match.competition}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-8 h-8" />
                    <span>{match.homeTeam.name}</span>
                  </div>
                  <span>vs</span>
                  <div className="flex items-center gap-2">
                    <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-8 h-8" />
                    <span>{match.awayTeam.name}</span>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <p>Ganador: {match.winner}</p>
                  <p>Resultado: {match.score}</p>
                </div>
              </div>
              <button 
                onClick={() => onViewDetails(match)}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };