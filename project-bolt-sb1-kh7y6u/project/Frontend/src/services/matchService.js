import api from '../lib/api';

export const matchService = {
  getMatches: (filters = {}) => 
    api.get('/api/matches', { params: filters }),
  
  createMatch: (matchData) => 
    api.post('/api/matches', matchData),
  
  updateMatch: (matchId, matchData) => 
    api.put(`/api/matches/${matchId}`, matchData),
  
  getMatchHistory: (filters = {}) => 
    api.get('/api/matches/history', { params: filters })
};