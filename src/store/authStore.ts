import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  users: User[]; // For admin to manage users
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createUser: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  updateUser: (id: string, updates: Partial<User>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@arkidots.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@arkidots.com',
    role: 'user',
  },
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  users: mockUsers,

  login: async (email: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we're just checking against our mock data
      // Here we're just checking email, in production you'd verify password too
      const user = mockUsers.find(u => u.email === email);
      
      if (user) {
        set({ user, isAuthenticated: true, token: 'mock-jwt-token' });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, token: null });
  },

  createUser: async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const { users } = get();
      const newUser: User = {
        id: String(users.length + 1),
        name,
        email,
        role,
      };
      
      set({ users: [...users, newUser] });
      return true;
    } catch (error) {
      console.error('Create user error:', error);
      return false;
    }
  },

  updateUser: async (id: string, updates: Partial<User>) => {
    try {
      const { users } = get();
      const updatedUsers = users.map(user => 
        user.id === id ? { ...user, ...updates } : user
      );
      
      set({ users: updatedUsers });
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const { users } = get();
      const filteredUsers = users.filter(user => user.id !== id);
      
      set({ users: filteredUsers });
      return true;
    } catch (error) {
      console.error('Delete user error:', error);
      return false;
    }
  },
}));