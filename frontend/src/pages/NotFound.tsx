import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NotFound: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you are looking for doesn't exist.</p>
      {user ? (
        <Link to={`/${user.role}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Go to Dashboard
        </Link>
      ) : (
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Go to Login
        </Link>
      )}
    </div>
  );
};

export default NotFound;

