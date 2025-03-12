import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Amazing College Events
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Join, organize, and experience the best events on campus. From academic seminars to cultural festivals, find everything in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              Browse Events
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 flex items-center justify-center">
              Organize Event
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;