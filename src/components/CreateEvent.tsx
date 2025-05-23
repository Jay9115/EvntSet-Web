import React, { useState, useRef, ChangeEvent } from 'react';
import { createEvent } from '../services/apiService'; // update path as needed

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    category: '',
    contactUs: '',
    coordinators: '',
    department: '',
    type: '',
    venue: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventId = Math.floor(100 + Math.random() * 900).toString();
    const formData = new FormData();
    // Append the poster image
    if (!imageFile) {
      alert("Please select an image before submitting.");
      return;
    }
    formData.append('poster', imageFile);
    
    const eventDetails = {
      EventId: eventId,
      EventName: eventData.title,
      Description: eventData.description,
      Date: eventData.date,
      Time: eventData.time,
      Venue: eventData.venue,
      Capacity: eventData.capacity,
      ContactUs: eventData.contactUs,
      Coordinators: eventData.coordinators.split(',').map(c => c.trim()), // ✨ FIXED
      iDepartment: eventData.department,
      Type: eventData.type
    };
    
    console.log('Sending eventDetails JSON to backend:', JSON.stringify(eventDetails, null, 2));
    
    // Convert to JSON string and append
    formData.append('eventDetailsJson', JSON.stringify(eventDetails));
    try {
      const response = await createEvent(formData); // Correct function name
      if (response.ok) {
        alert('Event created successfully!');
        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Failed to create event: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      category: '',
      contactUs: '',
      coordinators: '',
      department: '',
      type: '',
      venue: ''
    });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
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
            onClick={resetForm}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;