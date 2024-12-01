import { useAuthStore } from '../store/authStore';

const API_URL = 'http://localhost:5000/api';

export const useApi = () => {
  const { user } = useAuthStore();

  const fetchWithAuth = async (endpoint, options = {}) => {
    if (user?.token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${user.token}`,
      };
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  };

  return { fetchWithAuth };
};