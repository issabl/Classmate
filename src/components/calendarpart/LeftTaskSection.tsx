import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function LeftTaskSection() {
  const [selectedMonth, setSelectedMonth] = useState("September 2024");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = [2024, 2025, 2026, 2027];

  return (
    <div
  className="
    bg-[#F8F8F8] rounded-3xl
    shadow-[inset_0_0_15px_rgba(0,0,0,0.08)]
    p-6

    w-[610px]      // manual width
    h-[580px]      // manual height
    ml-[27px]     // move right
  "
>
      {/* MONTH HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <select
            className="
              appearance-none bg-transparent text-2xl font-bold pr-8
            "
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {years.map((year) =>
              months.map((month) => (
                <option key={`${month} ${year}`} value={`${month} ${year}`}>
                  {month} {year}
                </option>
              ))
            )}
          </select>

          <ChevronDown
            size={22}
            className="absolute right-2 top-1 text-gray-700 pointer-events-none"
          />
        </div>
      </div>

      {/* -------------------- TASK ITEM 1 -------------------- */}
      <div className="mb-2">
        <button className="text-xs border border-gray-300 px-3 py-1 rounded-full mb-1 text-gray-700">
          Sep 15
        </button>

        <div
          className="
            bg-white rounded-xl
            shadow-[0_3px_10px_rgba(0,0,0,0.08)]
            p-4 border border-gray-100
          "
        >
          <p className="font-semibold text-gray-900">Database Management System</p>
          <p className="text-sm text-gray-600 mt-1">Hands on using XAMPP.</p>
        </div>
      </div>

      {/* -------------------- TASK ITEM 2 -------------------- */}
      <div className="mb-2">
        <button className="text-xs border border-gray-300 px-3 py-1 rounded-full mb-1 text-gray-700">
          Sep 17
        </button>

        <div
          className="
            bg-white rounded-xl
            shadow-[0_3px_10px_rgba(0,0,0,0.08)]
            p-4 border border-gray-100
          "
        >
          <p className="font-semibold text-gray-900">Networking</p>
          <p className="text-sm text-gray-600 mt-1">
            Transferring files from one computer to another, hands on activity.
          </p>

          {/* SECOND TASK IN SAME DATE */}
          <div
            className="
              mt-4 bg-white rounded-xl
              shadow-[0_3px_10px_rgba(0,0,0,0.08)]
              p-4 border border-gray-100
            "
          >
            <p className="font-semibold text-gray-900">Functional English</p>
            <p className="text-sm text-gray-600 mt-1">Quiz Bee by group.</p>
          </div>
        </div>
      </div>

      {/* -------------------- TASK ITEM 3 -------------------- */}
      <div className="mb-4">
        <button className="text-xs border border-gray-300 px-3 py-1 rounded-full mb-3 text-gray-700">
          Sep 20
        </button>

        <div
          className="
            bg-white rounded-xl
            shadow-[0_3px_10px_rgba(0,0,0,0.08)]
            p-4 border border-gray-100
          "
        >
          <p className="font-semibold text-gray-900">Application Development</p>
          <p className="text-sm text-gray-600 mt-1">
            Refer to your pair groupings on your HCI.
          </p>
        </div>
      </div>

      <p className="text-center text-m -mt-1 font-semibold text-[#D7A878]">
        ClassMate
      </p>
    </div>
  );
}
