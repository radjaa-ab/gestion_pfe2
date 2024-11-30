import { useState, useEffect } from 'react';

type Role = 'admin' | 'teacher' | 'student' | 'company';

interface MockUser {
  name: string;
  email: string;
  role: Role;
}

export const useAuth = () => {
  const mockUsers: MockUser[] = [
    { name: 'Student User', email: 'student@gmail.com', role: 'student' },
    { name: 'Company User', email: 'company@gmail.com', role: 'company' },
    { name: 'Admin User', email: 'admin@gmail.com', role: 'admin' },
    { name: 'Teacher User', email: 'teacher@gmail.com', role: 'teacher' },
  ];

  const [currentUser, setCurrentUser] = useState<MockUser | null>(() => {
    const savedEmail = localStorage.getItem('email');
    return mockUsers.find((user) => user.email === savedEmail) || null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const user = mockUsers.find((user) => user.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('email', user.email);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('email');
  };

  return {
    user: currentUser,
    login,
    logout,
    loading,
  };
};

