import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock events data (replace with your actual events data)
const mockEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    date: new Date(2024, 3, 15),
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Conference',
    date: new Date(2024, 3, 20),
    type: 'conference'
  },
  // Add more events as needed
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get all days in the current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for the selected date
  const selectedDateEvents = mockEvents.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  // Navigation handlers
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-700">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="p-4 text-center text-sm font-semibold text-gray-700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {daysInMonth.map((date) => {
              const eventsForDate = getEventsForDate(date);
              const isSelected = isSameDay(date, selectedDate);
              const isCurrentMonth = isSameMonth(date, currentDate);

              return (
                <div
                  key={date.toString()}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    min-h-[100px] p-2 bg-white cursor-pointer
                    ${isSelected ? 'bg-blue-50' : ''}
                    ${!isCurrentMonth ? 'text-gray-400' : ''}
                  `}
                >
                  <div className="font-semibold mb-1">
                    {format(date, 'd')}
                  </div>
                  {eventsForDate.map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-700"
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDateEvents.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Events for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <div className="space-y-4">
              {selectedDateEvents.map(event => (
                <div
                  key={event.id}
                  className="p-4 bg-white rounded-lg shadow"
                >
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <p className="text-gray-600">
                    {format(event.date, 'h:mm a')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;