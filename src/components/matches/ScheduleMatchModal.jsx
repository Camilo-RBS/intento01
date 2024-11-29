import { useState } from 'react';
import { X } from 'lucide-react';

export const ScheduleMatchModal = ({ onClose }) => {
  const [matchData, setMatchData] = useState({
    date: '',
    competition: '',
    homeTeam: '',
    awayTeam: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the match data
    alert('Partido programado exitosamente');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
          Programar Nuevo Partido
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={matchData.date}
            onChange={(e) => setMatchData({...matchData, date: e.target.value})}
          />
          
          <select
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={matchData.competition}
            onChange={(e) => setMatchData({...matchData, competition: e.target.value})}
          >
            <option value="">Seleccionar competición</option>
            <option value="liga">Liga</option>
            <option value="copa">Copa</option>
            <option value="champions">Champions League</option>
          </select>
          
          <select
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={matchData.homeTeam}
            onChange={(e) => setMatchData({...matchData, homeTeam: e.target.value})}
          >
            <option value="">Equipo Local</option>
            <option value="real-madrid">Real Madrid</option>
            <option value="barcelona">Barcelona</option>
          </select>
          
          <select
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={matchData.awayTeam}
            onChange={(e) => setMatchData({...matchData, awayTeam: e.target.value})}
          >
            <option value="">Equipo Visitante</option>
            <option value="atletico">Atlético de Madrid</option>
            <option value="manchester">Manchester United</option>
          </select>
          
          <input
            type="text"
            placeholder="Ubicación"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-200"
            value={matchData.location}
            onChange={(e) => setMatchData({...matchData, location: e.target.value})}
          />
          
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-3 rounded-md hover:bg-emerald-500"
          >
            Programar Partido
          </button>
        </form>
      </div>
    </div>
  );
};