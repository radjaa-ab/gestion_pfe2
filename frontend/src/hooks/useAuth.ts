import { useState } from 'react';

type Role = 'admin' | 'teacher' | 'student' | 'company';

export const useAuth = () => {
  // State to store the current role
  const [role, setRole] = useState<Role>(() => {
    // Retrieve role from localStorage or default to 'admin'
    return (localStorage.getItem('role') as Role) || 'admin';
  });

  // Mocked user data
  const mockUser = {
    user: { name: 'Test User', email: 'test@example.com' },
    role,
  };

  // Setter to update role and persist it
  const updateRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  return {
    ...mockUser,
    setRole: updateRole, // Export the role setter
  };
};
