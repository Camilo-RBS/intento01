import { create } from 'zustand';

const users = [
  { email: 'camilo@gmail.com', password: 'root', role: 'entrenador' },
  { email: 'juan@gmail.com', password: 'root', role: 'jugador' }
];

export const useAuthStore = create((set) => ({
  user: null,
  login: (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null })
}));