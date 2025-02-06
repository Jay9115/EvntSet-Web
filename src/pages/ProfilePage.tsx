import React from 'react';
import { Calendar, Clock, MapPin, User, Mail, Phone, BookOpen } from 'lucide-react';

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@university.edu",
    phone: "+1 234 567 8900",
    studentId: "STU123456",
    department: "Computer Science",
    year: "Third Year"
  };

  // Mock registered events
  const registeredEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "March 15, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Career Development Workshop",
      date: "March 10, 2024",
      time: "2:00 PM",
      location: "Seminar Hall",
      status: "Completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.department} - {user.year}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Collage ID</p>
                  <p className="text-gray-800">{user.studentId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registered Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Registered Events</h2>
            <div className="space-y-6">
              {registeredEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'Upcoming' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;