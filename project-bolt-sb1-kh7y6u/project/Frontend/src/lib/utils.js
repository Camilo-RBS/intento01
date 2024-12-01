import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  return format(new Date(date), formatStr, { locale: es });
};

export const formatTime = (date) => {
  return format(new Date(date), 'HH:mm', { locale: es });
};

export const filterTeams = (teams, { searchTerm, sport, category }) => {
  return teams.filter(team => {
    const matchesSearch = !searchTerm || 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSport = !sport || 
      team.sport.toLowerCase() === sport.toLowerCase();
    
    const matchesCategory = !category || 
      team.category.toLowerCase() === category.toLowerCase();
    
    return matchesSearch && matchesSport && matchesCategory;
  });
};

export const filterMatches = (matches, filters) => {
  return matches.filter(match => {
    if (filters.date && !match.date.includes(filters.date)) return false;
    if (filters.competition && match.competition.toLowerCase() !== filters.competition.toLowerCase()) return false;
    return true;
  });
};

export const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message || 'Something went wrong';
};