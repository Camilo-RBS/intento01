import { useState, useCallback, useEffect } from 'react';
import { userService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUsers = useCallback(async (query) => {
    try {
      setLoading(true);
      const response = await userService.searchUsers(query);
      setUsers(response.data);
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar usuarios iniciales
  useEffect(() => {
    searchUsers('');
  }, [searchUsers]);

  return {
    users,
    loading,
    error,
    searchUsers
  };
};