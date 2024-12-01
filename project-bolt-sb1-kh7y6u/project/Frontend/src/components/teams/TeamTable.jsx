import { useState, useEffect } from 'react';
import { useTeams } from '../../hooks/useTeams';
import { useAuthStore } from '../../store/authStore';

export const TeamTable = ({ onJoinClick }) => {
  const { teams, loading, error, fetchTeams } = useTeams();
  const { user } = useAuthStore();
  const isCoach = user?.role === 'entrenador';

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  if (loading) {
    return <div className="text-white text-center">Cargando equipos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-6 py-3 text-left">Nombre del equipo</th>
            <th className="px-6 py-3 text-left">Deporte</th>
            <th className="px-6 py-3 text-left">Categoría</th>
            <th className="px-6 py-3 text-left">Jugadores</th>
            <th className="px-6 py-3 text-left">Ubicación</th>
            <th className="px-6 py-3 text-left">Descripción</th>
            {!isCoach && <th className="px-6 py-3 text-left">Acción</th>}
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr 
              key={team._id} 
              className={`border-t border-gray-700 ${team.owner === user?._id ? 'bg-emerald-900 bg-opacity-20' : ''}`}
            >
              <td className="px-6 py-4">{team.name}</td>
              <td className="px-6 py-4">{team.sport}</td>
              <td className="px-6 py-4">{team.category}</td>
              <td className="px-6 py-4">{team.players.length}</td>
              <td className="px-6 py-4">{team.location}</td>
              <td className="px-6 py-4">{team.description}</td>
              {!isCoach && (
                <td className="px-6 py-4">
                  <button
                    onClick={() => onJoinClick(team._id)}
                    className="bg-emerald-400 text-white px-4 py-1 rounded hover:bg-emerald-500"
                    disabled={team.players.includes(user?._id)}
                  >
                    {team.players.includes(user?._id) ? 'Unido' : 'Unirse'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};