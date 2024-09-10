import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/path/to/logo.svg" alt="SwapMate Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-lg">SwapMate</span>
      </div>
      <nav className="flex space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/attendance" className="hover:underline">Attendance</Link>
        <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
        <Link to="/proxy-requests" className="hover:underline">Proxy Requests</Link>
        <button className="bg-red-500 px-2 py-1 rounded" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

const handleLogout = () => {
  // Add logout logic here
  console.log('Logged out');
};

export default Header;
