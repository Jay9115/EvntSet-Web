import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    attendees: 120
  },
  {
    id: 2,
    title: "Annual Cultural Fest",
    date: "March 20, 2024",
    time: "5:00 PM",
    location: "College Ground",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    attendees: 500
  },
  {
    id: 3,
    title: "Career Development Workshop",
    date: "March 25, 2024",
    time: "2:00 PM",
    location: "Seminar Hall",
    category: "Career",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    attendees: 75
  }
];

const UpcomingEvents = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
          <button className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center">
            View All Events
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
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
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;