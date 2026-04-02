import { create } from 'zustand';
import type { Role } from '../types/types';

interface AuthState {
  role: Role;
  setRole: (role: Role) => void;
  toggleRole: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: 'admin', // default for demo
  setRole: (role) => set({ role }),
  toggleRole: () => set((state) => ({ role: state.role === 'admin' ? 'viewer' : 'admin' })),
}));
