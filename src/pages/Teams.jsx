import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { TeamTable } from '../components/TeamTable';
import { CreateTeamModal } from '../components/CreateTeamModal';
import { JoinTeamModal } from '../components/JoinTeamModal';

export const Teams = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    sport: '',
    antiquity: ''
  });

  const { user } = useAuthStore();
  const isCoach = user?.role === 'entrenador';

  const teams = [
    { id: 1, name: 'Real Madrid Juvenil', sport: 'Fútbol', category: 'Juvenil', players: 13, location: 'Madrid, España', description: 'Equipo juvenil de fútbol', owner: 'camilo@gmail.com' },
    { id: 2, name: 'Barcelona Juvenil', sport: 'Fútbol', category: 'Juvenil', players: 13, location: 'Barcelona, España', description: 'Equipo juvenil de fútbol' },
    { id: 3, name: 'Atlético Juvenil', sport: 'Fútbol', category: 'Juvenil', players: 13, location: 'Madrid, España', description: 'Equipo juvenil de fútbol' },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Equipos Registrados</h1>
        {isCoach && teams.filter(team => team.owner === user.email).length < 3 && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-400 text-white px-4 py-2 rounded-md hover:bg-emerald-500"
          >
            Crear Equipo
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar equipo..."
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Filtrar por Categoría</option>
          <option value="juvenil">Juvenil</option>
          <option value="senior">Senior</option>
        </select>
        <select
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
          value={filters.sport}
          onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
        >
          <option value="">Filtrar por deporte</option>
          <option value="futbol">Fútbol</option>
          <option value="baloncesto">Baloncesto</option>
        </select>
        <select
          className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
          value={filters.antiquity}
          onChange={(e) => setFilters({ ...filters, antiquity: e.target.value })}
        >
          <option value="">Filtrar por Antigüedad</option>
          <option value="newest">Más nuevos</option>
          <option value="oldest">Más antiguos</option>
        </select>
      </div>

      <TeamTable 
        teams={teams} 
        isCoach={isCoach} 
        currentUserEmail={user?.email}
        onJoinClick={() => setShowJoinModal(true)}
      />

      {showCreateModal && (
        <CreateTeamModal onClose={() => setShowCreateModal(false)} />
      )}

      {showJoinModal && (
        <JoinTeamModal onClose={() => setShowJoinModal(false)} />
      )}
    </div>
  );
};