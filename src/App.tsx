import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegistration from './pages/AdminRegistration';
import CreateEvent from './components/CreateEvent';
import EventCalendar from './components/EventCalendar';
import NewsEditor from './components/NewsEditor';
import AdminLogin from './pages/AdminLogin';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      navigate('/'); // Force redirect to login if not authenticated
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show Navbar only if user is authenticated */}
      {token && <Navbar />}

      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={token ? <Navigate to="/profile" /> : <LoginPage />} />
          <Route path="/login" element={token ? <Navigate to="/profile" /> : <LoginPage />} />
          <Route path="/register" element={token ? <Navigate to="/profile" /> : <RegistrationPage />} />
          <Route path="/admin" element={token ? <Navigate to="/dashboard" /> : <AdminLogin />} />

          {/* Private Routes (Require Authentication) */}
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/register-admin" element={<PrivateRoute><AdminRegistration /></PrivateRoute>} />
          <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
          <Route path="/calendar" element={<PrivateRoute><EventCalendar /></PrivateRoute>} />
          <Route path="/news" element={<PrivateRoute><NewsEditor /></PrivateRoute>} />
        </Routes>
      </main>

      {/* Show footer only if user is authenticated */}
      {token && (
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-400">© 2024 College Event Management System - EvntSet. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
