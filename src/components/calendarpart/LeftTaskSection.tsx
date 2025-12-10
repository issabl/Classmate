import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function LeftTaskSection() {
  const [selectedMonth, setSelectedMonth] = useState("September 2024");
  const [priority, setPriority] = useState<"low" | "med" | "high" | null>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = [2024, 2025, 2026, 2027];

  const priorityConfig = {
    low: { label: "Low", color: "bg-green-100 text-green-700 border-green-200" },
    med: { label: "Med", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    high: { label: "High", color: "bg-red-100 text-red-700 border-red-200" },
  };

  return (
    <div className="w-[670px] h-[580px] ml-[27px] bg-white rounded-2xl shadow-lg p-8 flex flex-col">
      {/* Header: Month Selector + Priority Filter */}
      <div className="flex items-center justify-between mb-8">
        {/* Month Dropdown */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-white border border-gray-300 text-2xl font-bold text-gray-800 px-5 py-3 pr-12 rounded-xl shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
          >
            {years.flatMap((year) =>
              months.map((month) => (
                <option key={`${month} ${year}`} value={`${month} ${year}`}>
                  {month} {year}
                </option>
              ))
            )}
          </select>
          <ChevronDown
            size={24}
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
          />
        </div>

        {/* Priority Buttons */}
        <div className="flex gap-3">
          {(["low", "med", "high"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setPriority(priority === level ? null : level)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm border-2 transition-all duration-200
                ${priority === level
                  ? `${priorityConfig[level].color} border-transparent shadow-md scale-105`
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                }`}
            >
              {priorityConfig[level].label}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {/* Task Group - Sep 15 */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Sep 15</p>
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900">Database Management System</h3>
            <p className="text-gray-600 text-sm mt-1">Hands on using XAMPP.</p>
          </div>
        </div>

        {/* Task Group - Sep 17 */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Sep 17</p>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900">Networking</h3>
              <p className="text-gray-600 text-sm mt-1">
                Transferring files from one computer to another, hands on activity.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900">Functional English</h3>
              <p className="text-gray-600 text-sm mt-1">Quiz Bee by group.</p>
            </div>
          </div>
        </div>

        {/* Task Group - Sep 20 */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Sep 20</p>
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900">Application Development</h3>
            <p className="text-gray-600 text-sm mt-1">Refer to your pair groupings on your HCI.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-2xl font-bold text-gray-800 tracking-tight">ClassMate</p>
      </div>
    </div>
  );
}