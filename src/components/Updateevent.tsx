import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateEvent } from '../services/apiService'; // Update the path as needed

const Updateevent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventToEdit = location.state?.event;

  const [eventData, setEventData] = useState({
    eventId: '',
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    capacity: '',
    contactUs: '',
    coordinators: '',
    department: '',
    type: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (eventToEdit) {
      setEventData({
        eventId: eventToEdit.eventId,
        capacity: eventToEdit.capacity.toString(),
        contactUs: eventToEdit.contactUs || '',
        coordinators: eventToEdit.coordinators?.join(', ') || '',
        
        title: eventToEdit.eventName,
        description: eventToEdit.description,
        date: eventToEdit.date,
        time: eventToEdit.time,
        venue: eventToEdit.venue,
        department: eventToEdit.department || '',
        type: eventToEdit.type,
      });
      setImagePreview(eventToEdit.posterUrl || null);
    }
  }, [eventToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append('poster', imageFile);
    }

    const updatedEventDetails = {
      EventId: eventData.eventId,
      Capacity: eventData.capacity,
      ContactUs: eventData.contactUs,
      Coordinators: eventData.coordinators.split(',').map(c => c.trim()),
      Date: eventData.date,
      Description: eventData.description,
      EventName: eventData.title,
      iDepartment: eventData.department,
      Time: eventData.time,
      Type: eventData.type,   
      Venue: eventData.venue,
      };
    console.log('Sending eventDetails JSON to backend:', JSON.stringify(updatedEventDetails, null, 2));
    console.log('Sending eventDetails JSON to backend:', JSON.stringify(formData, null, 2));
    formData.append('eventDetailsJson', JSON.stringify(updatedEventDetails));

    try {
      const response = await updateEvent(formData);
      if (response.ok) {
        alert('Event updated successfully!');
        navigate('/events'); // Redirect to the events page
      } else {
        const errorData = await response.json();
        alert(`Failed to update event: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              value={eventData.venue}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={eventData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Us</label>
            <input
              type="email"
              name="contactUs"
              value={eventData.contactUs}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coordinators</label>
            <input
              type="text"
              name="coordinators"
              value={eventData.coordinators}
              onChange={handleChange}
              placeholder="Comma-separated names"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={eventData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={eventData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>Select Type</option>
              <option value="Culture">Culture</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
              <option value="Concert">Concert</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Event preview" className="w-full max-h-60 object-contain rounded-lg" />
              <button
                type="button"
                onClick={() => setImageFile(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Updateevent;