import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { MatchList } from '../components/matches/MatchList';
import { MatchFilters } from '../components/matches/MatchFilters';
import { ScheduleMatchModal } from '../components/matches/ScheduleMatchModal';

export const Matches = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('');
  
  const { user } = useAuthStore();
  const isCoach = user?.role === 'entrenador';

  // Mock data - In a real app, this would come from an API
  const matches = [
    {
      id: 1,
      date: '12/11/2024',
      competition: 'Liga',
      homeTeam: {
        name: 'Real Madrid',
        logo: '/teams/real-madrid.png'
      },
      awayTeam: {
        name: 'Barcelona',
        logo: '/teams/barcelona.png'
      },
      score: '0-4',
      winner: 'Barcelona',
      coachId: 'camilo@gmail.com'
    },
    {
      id: 2,
      date: '23/12/2024',
      competition: 'Liga',
      homeTeam: {
        name: 'Manchester United',
        logo: '/teams/manchester-united.png'
      },
      awayTeam: {
        name: 'Atletico de Madrid',
        logo: '/teams/atletico-madrid.png'
      },
      score: '3-2',
      winner: 'Manchester United',
      coachId: 'juan@gmail.com'
    }
  ];

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
      />

      <MatchList
        matches={matches}
        isCoach={isCoach}
        currentUserEmail={user?.email}
      />

      {showScheduleModal && (
        <ScheduleMatchModal onClose={() => setShowScheduleModal(false)} />
      )}
    </div>
  );
};