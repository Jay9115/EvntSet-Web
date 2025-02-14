import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegistration from './pages/AdminRegistration';
import AdminLogin from './pages/AdminLogin';
import CreateEvent from './components/CreateEvent';
import EventCalendar from './components/EventCalendar';
import NewsEditor from './components/NewsEditor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/register" element={<AdminRegistration />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/calendar" element={<EventCalendar />} />
            <Route path="/news" element={<NewsEditor />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-400">© 2024 College Event Management System - Admin Portal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;