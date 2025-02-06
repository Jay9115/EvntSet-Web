import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Calendar, Bell, User, LogIn, Search, Filter } from 'lucide-react';
import Navbar from './components/Navbar';
import EventPage from './pages/EventsPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import Hero from './components/Hero';
import UpcomingEvents from './components/UpcomingEvents';
import NewsSection from './components/NewsSection';
import CalendarPage from './pages/CalenderPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import AddEventPage from './pages/AddEventPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <UpcomingEvents />
                <NewsSection />
              </>
            } />
            <Route path="/events" element={<EventPage />} />
            <Route path="/Organizer" element={<OrganizerDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-event" element={<AddEventPage />} />


          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-400">© 2024 College Event Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;