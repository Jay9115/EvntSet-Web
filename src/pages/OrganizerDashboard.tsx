import React from 'react';
import { Calendar, Users, Clock, MapPin, BarChart, Edit, Trash2 } from 'lucide-react';

const OrganizerDashboard = () => {
  // Mock events data
  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "March 15, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      registrations: 120,
      capacity: 200,
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Career Development Workshop",
      date: "March 10, 2024",
      time: "2:00 PM",
      location: "Seminar Hall",
      registrations: 75,
      capacity: 100,
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Organizer Dashboard</h1>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            Create New Event
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Events</h3>
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-500 mt-2">4 upcoming</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Registrations</h3>
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">450</p>
            <p className="text-sm text-gray-500 mt-2">+23 this week</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Average Attendance</h3>
              <BarChart className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">85%</p>
            <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Upcoming Events</h3>
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">4</p>
            <p className="text-sm text-gray-500 mt-2">Next 30 days</p>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">Manage Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrations</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{event.date}</div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {event.registrations} / {event.capacity}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Upcoming' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;