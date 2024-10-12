import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import SignupFormDemo from './auth/SignUp';
import HomePage from './pages/HomePage';
import Login from './auth/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MarkAttendance from "./pages/MarkAttendance";
import GetAttendance from "./pages/GetAttendance";
import Calender from "./pages/Calender";
import Leaderboard from "./pages/Leaderboard";
import GlobalRequest from './pages/GlobalRequest';
import ProfilePage from './pages/Profile';
import NotificationsList from './pages/Notifications';
import PrivateRequestPage from './pages/PrivateRequest';

function App() {
  return (
      <NextUIProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
              <Route path="/profile/:userId" element={<ProfileWrapper />} />
              <Route path="/markMyAttendance" element={<MarkAttendance />} />
              <Route path="/getMyAttendance" element={<GetAttendance />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/globalrequest" element={<GlobalRequest />} />
              <Route path="/privaterequest" element={<PrivateRequestPage/>} />
              <Route path="/notifications/:userId" element={<NotificationsList />} />
              <Route path="/signup" element={<SignupFormDemo />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
      </NextUIProvider>
  );
}

function ProfileWrapper() {
  const { userId } = useParams(); 
  return <ProfilePage userId={userId} />;
}

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

export default App;
