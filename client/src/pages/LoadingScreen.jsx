// src/pages/LoadingScreen.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 3000); // Change to the duration you want the loading screen to show
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <h1 className="text-white text-2xl">Loading...</h1>
    </div>
  );
};

export default LoadingScreen;
