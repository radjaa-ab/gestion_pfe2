import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'company';
}

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'teacher' | 'student' | 'company' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: 'admin' | 'teacher' | 'student' | 'company') => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'teacher' | 'student' | 'company' | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/user').then(response => {
        setUser(response.data);
        setRole(response.data.role);
      }).catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      });
    } else if (savedRole) {
      setRole(savedRole as 'admin' | 'teacher' | 'student' | 'company');
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('role', user.role);
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setUser(user);
    setRole(user.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    api.defaults.headers.common['Authorization'] = '';
    setUser(null);
    setRole(null);
  };

  const updateRole = (newRole: 'admin' | 'teacher' | 'student' | 'company') => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, setRole: updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

