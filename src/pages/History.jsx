import { useState } from 'react';
import { MatchHistoryList } from '../components/history/MatchHistoryList';
import { MatchFilters } from '../components/matches/MatchFilters';
import { MatchDetailsModal } from '../components/history/MatchDetailsModal';

export const History = () => {
  const [dateFilter, setDateFilter] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);

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
      score: '0-5',
      winner: 'Barcelona',
      homeScorers: [],
      awayScorers: ['Messi', 'Suarez', 'Neymar', 'Xavi', 'Suarez']
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
      homeScorers: ['Rashford', 'Bruno', 'Martial'],
      awayScorers: ['Griezmann', 'Morata']
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Historial de Partidos</h1>

      <MatchFilters
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        competitionFilter={competitionFilter}
        setCompetitionFilter={setCompetitionFilter}
      />

      <MatchHistoryList
        matches={matches}
        onViewDetails={(match) => setSelectedMatch(match)}
      />

      {selectedMatch && (
        <MatchDetailsModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};