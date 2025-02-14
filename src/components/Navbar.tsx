import React, { useState } from 'react';
import { Calendar, Bell, User, Menu, X, PlusCircle, Newspaper, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Calendar },
    { name: 'Create Event', href: '/create-event', icon: PlusCircle },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">EvetSet</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center text-gray-600 hover:text-indigo-600 ${
                    location.pathname === item.href ? 'text-indigo-600' : ''
                  }`}
                >
                  <Icon className="h-5 w-5 mr-1" />
                  {item.name}
                </Link>
              );
            })}
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-600 hover:text-indigo-600 cursor-pointer" />
              <User className="h-5 w-5 text-gray-600 hover:text-indigo-600 cursor-pointer" />
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
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
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center text-gray-600 hover:text-indigo-600 ${
                      location.pathname === item.href ? 'text-indigo-600' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;