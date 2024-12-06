import React, { createContext, ReactNode } from 'react';
import { User } from '@/pages/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (userData: { name: string; email: string; password: string; role: string }) => Promise<User>;
  updateUser: (userData: { name: string; email: string }) => Promise<User>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth as unknown as AuthContextType}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

function useAuth() {
  throw new Error('Function not implemented.');
}

