import api from '../lib/api';

export const teamService = {
  getTeams: () => api.get('/api/teams'),
  filterTeams: (filters) => api.get('/api/teams/filter', { params: filters }),
  createTeam: (teamData) => api.post('/api/teams', teamData),
  joinTeam: (teamId) => api.post(`/api/teams/${teamId}/join`),
  getTeamDetails: (teamId) => api.get(`/api/teams/${teamId}`)
};