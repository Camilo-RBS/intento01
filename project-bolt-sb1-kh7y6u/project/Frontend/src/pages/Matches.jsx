import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useMatches } from '../hooks/useMatches';
import { MatchList } from '../components/matches/MatchList';
import { MatchFilters } from '../components/matches/MatchFilters';
import { ScheduleMatchModal } from '../components/matches/ScheduleMatchModal';

export const Matches = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('');
  
  const { user } = useAuthStore();
  const { matches, loading, error, fetchMatches } = useMatches();
  const isCoach = user?.role === 'entrenador';

  useEffect(() => {
    fetchMatches({ date: dateFilter, competition: competitionFilter });
  }, [dateFilter, competitionFilter, fetchMatches]);

  const handleFilter = () => {
    fetchMatches({ date: dateFilter, competition: competitionFilter });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-white text-center">Cargando partidos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Partidos</h1>
        {isCoach && (
          <button
            onClick={() => setShowScheduleModal(true)}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Programar Partido
          </button>
        )}
      </div>

      <MatchFilters
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        competitionFilter={competitionFilter}
        setCompetitionFilter={setCompetitionFilter}
        onFilter={handleFilter}
      />

      <MatchList
        matches={matches}
        isCoach={isCoach}
        currentUserId={user?._id}
      />

      {showScheduleModal && (
        <ScheduleMatchModal 
          onClose={() => setShowScheduleModal(false)}
          onSuccess={() => {
            setShowScheduleModal(false);
            fetchMatches({ date: dateFilter, competition: competitionFilter });
          }}
        />
      )}
    </div>
  );
};