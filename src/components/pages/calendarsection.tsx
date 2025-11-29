import React from "react";
import CalendarSection from "../calendarpart/CalendarSection";
import TaskSection from "../calendarpart/LeftTaskSection";

const CalendarPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top section / header */}
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-gray-600">Your schedule and tasks</p>
      </div>

      {/* Main content */}
      <div className="flex p-8 gap-6 flex-1 overflow-auto">
        <div className="flex-1">
          <CalendarSection />
        </div>
        <div className="w-[300px] flex flex-col gap-6">
          <TaskSection />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
