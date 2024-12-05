import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { login as apiLogin, logout as apiLogout, register as apiRegister } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'company';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/user');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const data = await apiLogin(email, password);
      const loggedInUser = data.user;
      setUser(loggedInUser);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return loggedInUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const register = async (userData: { name: string, email: string, password: string, role: string }): Promise<User> => {
    try {
      const data = await apiRegister(userData);
      const registeredUser = data.user;
      setUser(registeredUser);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      return registeredUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  return { user, loading, login, logout, register };
};

