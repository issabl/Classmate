import MiniCalendar from "./MiniCalendar";
import { MoreHorizontal } from "lucide-react";

export default function CalendarSection() {
  return (
    <div
  className="
    bg-[#FFFFFF] rounded-3xl
    shadow-[inset_0_0_15px_rgba(0,0,0,0.08)]
    p-6 flex flex-col
    w-[480px] h-[580px]

    transform translate-x-92 
  "
>
      {/* MINI CALENDAR */}
      <MiniCalendar />

      {/* SCHEDULE TITLE */}
      <h2 className="text-xl font-semibold mt-2 mb-4">Schedule</h2>

      {/* -------------------- CARD 1 -------------------- */}
      <div
        className="
          bg-white rounded-2xl border border-gray-200
          shadow-[0_3px_10px_rgba(0,0,0,0.08)]
          p-2 mb-3 h-30 -mt-3
        "
      >
        <div className="flex items-center justify-between">
          <span
            className="
              text-white text-[10px] font-semibold
              px-3 py-1 rounded-full
              bg-gradient-to-b from-[#D9B268] to-[#B3914B]
            "
          >
            SEP 15
          </span>

          <div className="flex items-center gap-2">
            <button className="text-sm border border-gray-300 px-3 py-1 rounded-full">
              Invite
            </button>

            <MoreHorizontal size={18} className="text-gray-700" />
          </div>
        </div>

        <p className="font-semibold text-gray-900 mt-2">
          Database Management System
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Hands on using XAMPP.
        </p>
      </div>

      {/* -------------------- CARD 2 -------------------- */}
      <div
        className="
          bg-white rounded-2xl border border-gray-200
          shadow-[0_3px_10px_rgba(0,0,0,0.08)]
          p-2 mb-3 h-30 -mt-3
        "
      >
        <div className="flex items-center justify-between">
          <span
            className="
              text-white text-xs font-semibold
              px-3 py-1 rounded-full
              bg-gradient-to-b from-[#D9B268] to-[#B3914B]
            "
          >
            SEP 17
          </span>

          <div className="flex items-center gap-2">
            <button className="text-sm border border-gray-300 px-3 py-1 rounded-full">
              Invite
            </button>

            <MoreHorizontal size={18} className="text-gray-700" />
          </div>
        </div>

        <p className="font-semibold text-gray-900 mt-1">
          Functional English
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Quiz Bee by group.
        </p>
      </div>

      {/* -------------------- CREATE TASK BUTTON -------------------- */}
      <button
        className="
          -mb-3 w-full py-3 rounded-full font-medium text-white

          /* EXACT GOLD GRADIENT */
          bg-gradient-to-b from-[#D9B268] to-[#8B6A2B]

          /* SOFT SHADOW */
          shadow-[0_4px_10px_rgba(0,0,0,0.12)]
        "
      >
        Create task
      </button>
    </div>
  );
}
