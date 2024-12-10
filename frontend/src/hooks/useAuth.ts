import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios, { AxiosError } from 'axios';
import { useToast } from './use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'company';
  profilePic?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Set Authorization header for the specific request
          const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401 || axiosError.response?.status === 404) {
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            // Handle other Axios errors
            toast({
              title: 'Error fetching user',
              description: axiosError.message,
              variant: 'destructive',
            });
          }
        } else {
          // Handle non-Axios errors
          toast({
            title: 'Error fetching user',
            description: 'An unexpected error occurred.',
            variant: 'destructive',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, toast]);

  const login = async (email: string, password: string, _rememberMe?: boolean): Promise<User> => {
    try {
      const response = await api.post('/login', { email, password });
      const loggedInUser = response.data.user;
      setUser(loggedInUser);
      localStorage.setItem('token', response.data.access_token);
      return loggedInUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData: { name: string, email: string, password: string, role: string }): Promise<User> => {
    try {
      const response = await api.post('/register', userData);
      const registeredUser = response.data.user;
      setUser(registeredUser);
      localStorage.setItem('token', response.data.access_token);
      return registeredUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = async (userData: { name: string; email: string; profilePic?: string }): Promise<User> => {
    try {
      const response = await api.put('/user', userData);
      const updatedUser = response.data;
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  };

  return { user, loading, login, logout, register, updateUser, setUser };
};

