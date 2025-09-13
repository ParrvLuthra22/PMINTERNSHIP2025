import { useState, createContext, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface LoginCredentials {
  phone: string;
  otp: string;
  aadhaar?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      // Mock authentication - in real app, this would call an API
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        email: 'demo@example.com',
        phone: credentials.phone,
        aadhaar: credentials.aadhaar,
        type: 'student', // Default to student
        createdAt: new Date()
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, logout, loading };
};

export { AuthContext };