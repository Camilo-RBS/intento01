import api from '../lib/api';

export const userService = {
  searchUsers: (query) => 
    api.get('/api/users/search', { params: { search: query } }),
  
  getNearbyUsers: (longitude, latitude, maxDistance) => 
    api.get('/api/users/nearby', { params: { longitude, latitude, maxDistance } }),
  
  getUserProfile: (userId) => 
    api.get(`/api/users/${userId}`)
};