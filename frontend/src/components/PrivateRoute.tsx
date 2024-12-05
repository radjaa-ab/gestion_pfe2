import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingPage from './LoadingPage';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingPage message="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to the user's default route based on their role
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

