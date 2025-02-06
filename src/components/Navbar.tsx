import React, { useState } from 'react';
import { Calendar, Bell, User, LogIn, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/">
              <div className="flex items-center hover:opacity-80 transition-opacity duration-200">
                <Calendar className="h-8 w-8 text-indigo-600 hover:text-indigo-700" />
                <span className="ml-2 text-xl font-bold text-gray-800 hover:text-indigo-600">EvntSet</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
            <Link to="/calendar" className="text-gray-600 hover:text-indigo-600">Calendar</Link>
            <Link to="./Organizer" className="text-gray-600 hover:text-indigo-600">Organizers</Link>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-600 hover:text-indigo-600 cursor-pointer" />
              <Link to="/profile">
                <User className="h-5 w-5 text-gray-600 hover:text-indigo-600 cursor-pointer" />
              </Link>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </div>
          </div>
           <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
            <Link to="/calendar" className="text-gray-600 hover:text-indigo-600">Calendar</Link>
            <Link to="./Organizer" className="text-gray-600 hover:text-indigo-600">Organizers</Link>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-600 hover:text-indigo-600 cursor-pointer" />
              <Link to="/profile">
                <User className="h-5 w-5 text-gray-600 hover:text-indigo-600 cursor-pointer" />
              </Link>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
              <Link to="/calendar" className="text-gray-600 hover:text-indigo-600">Calendar</Link>
              <Link to="#" className="text-gray-600 hover:text-indigo-600">Organizers</Link>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;