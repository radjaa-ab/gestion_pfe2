import React from 'react';

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
        <h2 className="mt-4 text-2xl font-semibold text-white">{message}</h2>
        <p className="mt-2 text-white text-opacity-80">Please wait while we prepare your experience.</p>
      </div>
    </div>
  );
};

export default LoadingPage;

