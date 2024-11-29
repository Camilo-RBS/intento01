import { useState } from 'react';
import { UpdateMatchModal } from './UpdateMatchModal';

export const MatchList = ({ matches, isCoach, currentUserEmail }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const canUpdateMatch = (match) => {
    return isCoach && match.coachId === currentUserEmail;
  };

  const handleUpdateMatch = (updatedMatch) => {
    // Here you would typically update the match in your backend
    console.log('Match updated:', updatedMatch);
    setSelectedMatch(null);
  };

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
              {match.winner && (
                <div className="mt-2 space-y-1">
                  <p>Ganador: {match.winner}</p>
                  <p>Marcador: {match.score}</p>
                </div>
              )}
            </div>
            {canUpdateMatch(match) && (
              <button 
                onClick={() => setSelectedMatch(match)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                ACTUALIZAR
              </button>
            )}
          </div>
        </div>
      ))}

      {selectedMatch && (
        <UpdateMatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onUpdate={handleUpdateMatch}
        />
      )}
    </div>
  );
};