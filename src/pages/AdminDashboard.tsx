import React from 'react';
import { Users, Calendar, Shield, BarChart, Settings, User, Bell, Search } from 'lucide-react';

const AdminDashboard = () => {
  // Mock statistics
  const stats = {
    totalUsers: 1250,
    activeEvents: 15,
    totalOrganizers: 25,
    monthlyEvents: 45
  };

  // Mock users data
  const recentUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@university.edu",
      role: "Student",
      joinDate: "2024-03-01"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.s@university.edu",
      role: "Organizer",
      joinDate: "2024-03-02"
    }
  ];

  // Mock events data
  const recentEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      organizer: "CS Department",
      date: "2024-03-15",
      status: "Approved"
    },
    {
      id: 2,
      title: "Career Fair 2024",
      organizer: "Career Services",
      date: "2024-03-20",
      status: "Pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
            <p className="text-sm text-gray-500 mt-2">+48 this week</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Active Events</h3>
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.activeEvents}</p>
            <p className="text-sm text-gray-500 mt-2">5 pending approval</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Organizers</h3>
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalOrganizers}</p>
            <p className="text-sm text-gray-500 mt-2">3 new this month</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Monthly Events</h3>
              <BarChart className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.monthlyEvents}</p>
            <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Recent Events</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.organizer}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'Approved' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all events →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;