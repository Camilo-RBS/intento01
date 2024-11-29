import { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';

export const UpdateMatchModal = ({ match, onClose, onUpdate }) => {
  const [result, setResult] = useState({
    homeScore: '',
    awayScore: '',
    winner: '',
    homeScorers: [''],
    awayScorers: ['']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...match,
      score: `${result.homeScore}-${result.awayScore}`,
      winner: result.winner,
      homeScorers: result.homeScorers.filter(scorer => scorer.trim() !== ''),
      awayScorers: result.awayScorers.filter(scorer => scorer.trim() !== '')
    });
    onClose();
  };

  const addScorer = (team) => {
    setResult(prev => ({
      ...prev,
      [team]: [...prev[team], '']
    }));
  };

  const removeScorer = (team, index) => {
    setResult(prev => ({
      ...prev,
      [team]: prev[team].filter((_, i) => i !== index)
    }));
  };

  const updateScorer = (team, index, value) => {
    setResult(prev => ({
      ...prev,
      [team]: prev[team].map((scorer, i) => i === index ? value : scorer)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[500px] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
          Actualizar Resultado
        </h2>

        <div className="mb-4">
          <p className="text-center text-gray-600">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </p>
          <p className="text-center text-sm text-gray-500">
            {match.date} - {match.competition}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 items-center justify-center">
            <input
              type="number"
              min="0"
              placeholder="Local"
              className="w-20 p-3 rounded-md bg-gray-100 border border-gray-200 text-center"
              value={result.homeScore}
              onChange={(e) => setResult({...result, homeScore: e.target.value})}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              placeholder="Visitante"
              className="w-20 p-3 rounded-md bg-gray-100 border border-gray-200 text-center"
              value={result.awayScore}
              onChange={(e) => setResult({...result, awayScore: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Goleadores {match.homeTeam.name}</h3>
              {result.homeScorers.map((scorer, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nombre del goleador"
                    className="flex-1 p-2 rounded-md bg-gray-100 border border-gray-200"
                    value={scorer}
                    onChange={(e) => updateScorer('homeScorers', index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeScorer('homeScorers', index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addScorer('homeScorers')}
                className="flex items-center gap-1 text-sm text-emerald-500 hover:text-emerald-600"
              >
                <Plus className="h-4 w-4" /> Añadir goleador
              </button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Goleadores {match.awayTeam.name}</h3>
              {result.awayScorers.map((scorer, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nombre del goleador"
                    className="flex-1 p-2 rounded-md bg-gray-100 border border-gray-200"
                    value={scorer}
                    onChange={(e) => updateScorer('awayScorers', index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeScorer('awayScorers', index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addScorer('awayScorers')}
                className="flex items-center gap-1 text-sm text-emerald-500 hover:text-emerald-600"
              >
                <Plus className="h-4 w-4" /> Añadir goleador
              </button>
            </div>
          </div>

          <select
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={result.winner}
            onChange={(e) => setResult({...result, winner: e.target.value})}
          >
            <option value="">Seleccionar ganador</option>
            <option value={match.homeTeam.name}>{match.homeTeam.name}</option>
            <option value={match.awayTeam.name}>{match.awayTeam.name}</option>
            <option value="Empate">Empate</option>
          </select>
          
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
          >
            Actualizar Resultado
          </button>
        </form>
      </div>
    </div>
  );
};