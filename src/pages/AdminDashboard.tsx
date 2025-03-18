import React from 'react';
import { Users, Calendar, Shield, BarChart, Settings, User, Bell } from 'lucide-react';

interface RecentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

interface RecentEvent {
  id: number;
  title: string;
  organizer: string;
  date: string;
  status: string;
}

const AdminDashboard = () => {
  // Statistics with empty initial values
  const stats = {
    totalUsers: 0,
    activeEvents: 0,
    totalOrganizers: 0,
    monthlyEvents: 0
  };

  // Empty arrays for users and events
  const recentUsers: RecentUser[] = [];
  const recentEvents: RecentEvent[] = [];

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
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{user.role}</p>
                      <p className="text-sm text-gray-500">{user.joinDate}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all users →
              </button>
            </div>
          </div>

          {/* Recent Events */}
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