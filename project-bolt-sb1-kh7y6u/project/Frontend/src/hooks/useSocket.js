import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

export const useSocket = () => {
  const { user } = useAuthStore();
  const socket = useRef();

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:5000');
      socket.current.emit('setup', user);
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  return socket.current;
};