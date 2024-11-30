import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Rôles autorisés pour accéder à cette route
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth(); // Récupération de l'utilisateur et de l'état de chargement
  const location = useLocation(); // Permet de connaître l'URL actuelle

  if (loading) {
    // Affichage d'un message ou d'un indicateur pendant le chargement
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirige vers la page de connexion tout en sauvegardant l'URL tentée
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirige vers le tableau de bord ou la page par défaut de l'utilisateur
    return <Navigate to={`/${user.role}`} replace />;
  }

  // Affiche le contenu protégé si toutes les conditions sont remplies
  return <>{children}</>;
}
