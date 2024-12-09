import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

// Add a request interceptor to include the CSRF token and Bearer token
api.interceptors.request.use((config) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1];
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }

  const authToken = localStorage.getItem('token');
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  return config;
});

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    console.log('Login response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Updated register function to include role
export const register = async (userData: { name: string, email: string, password: string, role: string }) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const importUsers = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/import-users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Import users error:', error);
    throw error;
  }
};

export default api;

