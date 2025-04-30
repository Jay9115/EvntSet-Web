import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, MapPin, Users, PieChart } from 'lucide-react';
import { getEvents, getEventRegistrationStatus } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const categories = ["All", "Academic", "Cultural", "Technology", "Sports", "Career", "Workshop"];

// Define the type for your event object
interface EventType {
  eventId: string;
  eventName: string;
  description: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  posterUrl: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [registrationData, setRegistrationData] = useState<{ presentUsers: string[]; absentUsers: string[] } | null>(null);
  const [loadingMeasure, setLoadingMeasure] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data); // Assuming data is already in the correct format
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.type === selectedCategory;
    const matchesSearch = event.eventName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEdit = (event: EventType) => {
    navigate('/update-event', { state: { event } }); // Pass event data as state
  };

  const handleMeasure = async (event: EventType) => {
    setSelectedEvent(event);
    setLoadingMeasure(true);
    try {
      const data = await getEventRegistrationStatus(event.eventId);
      setRegistrationData(data);
    } catch (error) {
      console.error("Error fetching registration data:", error);
      alert("Failed to fetch registration data.");
    } finally {
      setLoadingMeasure(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Events</h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.eventId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={event.posterUrl} alt={event.eventName} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.eventName}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
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
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.capacity} capacity</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                    onClick={() => handleEdit(event)}
                  >
                    Edit details
                  </button>
                  <button
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    onClick={() => handleMeasure(event)}
                  >
                    Measure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Registration Data */}
        {selectedEvent && registrationData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedEvent.eventName} - Registration Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div>
                  <Pie
                    data={{
                      labels: ['Present Users', 'Absent Users'],
                      datasets: [
                        {
                          data: [registrationData.presentUsers.length, registrationData.absentUsers.length],
                          backgroundColor: ['#4CAF50', '#F44336'],
                        },
                      ],
                    }}
                  />
                </div>

                {/* Lists */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Present Users</h3>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {registrationData.presentUsers.map((user, index) => (
                      <li key={index}>{user}</li>
                    ))}
                  </ul>
                  <h3 className="text-lg font-semibold text-gray-800">Absent Users</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {registrationData.absentUsers.map((user, index) => (
                      <li key={index}>{user}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  onClick={() => {
                    setSelectedEvent(null);
                    setRegistrationData(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {loadingMeasure && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-white text-lg">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
