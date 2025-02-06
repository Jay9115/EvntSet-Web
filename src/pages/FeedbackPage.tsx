import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Mock event data
  const event = {
    title: "Tech Innovation Summit",
    date: "March 15, 2024",
    organizer: "CS Department"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log({ rating, feedback });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Event Feedback</h1>
            
            {/* Event Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h2>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">Organized by: {event.organizer}</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate this event?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div className="mb-8">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Share your thoughts about the event
                </label>
                <div className="relative">
                  <textarea
                    id="feedback"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What did you like? What could be improved?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                  <MessageSquare className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;