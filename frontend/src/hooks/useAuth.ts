import { useState } from 'react';

type Role = 'admin' | 'teacher' | 'student' | 'company';

interface MockUser {
  name: string;
  email: string;
  role: Role;
}

export const useAuth = () => {
  // Predefined mock users
  const mockUsers: MockUser[] = [
    
    { name: 'Company User', email: 'company@gmail.com', role: 'company' },
    { name: 'Admin User', email: 'admin@gmail.com', role: 'admin' },
    { name: 'Teacher User', email: 'teacher@gmail.com', role: 'teacher' },
  
    { name: 'Student User', email: 'student@gmail.com', role: 'student' },
   
  ];

  // Retrieve email and role from localStorage or use the first mock user by default
  const [currentUser, setCurrentUser] = useState<MockUser>(() => {
    const savedEmail = localStorage.getItem('email');
    const savedUser = mockUsers.find((user) => user.email === savedEmail);
    return savedUser || mockUsers[0];
  });

  // Function to log in as a specific user
  const loginAsUser = (email: string) => {
    const user = mockUsers.find((user) => user.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('email', user.email);
    } else {
      console.error('User not found');
    }
  };

  // Function to log out
  const logout = () => {
    setCurrentUser(mockUsers[0]); // Default back to the first user
    localStorage.removeItem('email');
  };

  return {
    user: currentUser,
    role: currentUser.role,
    loginAsUser, // Function to switch between users
    logout, // Function to clear user data
  };
};
