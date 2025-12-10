import MiniCalendar from "./MiniCalendar";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export default function CalendarSection() {
  const router = useRouter();
  return (
    <div className="calendar-section transform translate-x-92 flex flex-col p-6">
      {/* MINI CALENDAR */}
      <MiniCalendar />

      <h2 className="text-xl font-semibold mt-2 mb-4 text-black dark:text-black">
        Schedule
      </h2>

      {/* CARD 1 */}
      <div className="calendar-card mb-3">
        <div className="flex items-center justify-between">
          <span className="calendar-badge text-xs">SEP 15</span>
          <div className="flex items-center gap-2">
            <button className="calendar-invite-btn">Invite</button>
            <MoreHorizontal size={18} className="text-gray-700 dark:text-gray-300"/>
          </div>
        </div>
        <p className="font-semibold text-gray-900 dark:text-black mt-2">
          Database Management System
        </p>
        <p className="text-sm text-black-600 dark:text-black-300 mt-1">
          Hands on using XAMPP.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="calendar-card mb-3">
        <div className="flex items-center justify-between">
          <span className="calendar-badge text-xs">SEP 17</span>
          <div className="flex items-center gap-2">
            <button className="calendar-invite-btn">Invite</button>
            <MoreHorizontal size={18} className="text-gray-700 dark:text-gray-300"/>
          </div>
        </div>
        <p className="font-semibold text-gray-900 dark:text-black mt-2">
          Functional English
        </p>
        <p className="text-sm text-black-600 dark:text-black-300 mt-1">
          Quiz Bee by group.
        </p>
      </div>

      {/* CREATE TASK BUTTON */}
      <button
        onClick={() => router.navigate({ to: "/add-task" })}
        className="
          -mb-3 w-full py-3 rounded-full font-medium text-white
          bg-gradient-to-b from-[#D9B268] to-[#8B6A2B]
          shadow-[0_4px_10px_rgba(0,0,0,0.12)]
          hover:from-[#E0BD75] hover:to-[#9B7A3B] 
          active:scale-95 
          transition-all duration-200 
          cursor-pointer
        "
      >
        Create task
      </button>
    </div>
  );
}
