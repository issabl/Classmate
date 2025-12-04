import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function LeftTaskSection() {
  const [selectedMonth, setSelectedMonth] = useState("September 2024");

  // 🔥 MANUAL SETTINGS
  const taskCardHeight = "80px"; // <-- adjust task card height manually

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const years = [2024,2025,2026,2027];

  const tasks = [
    { date: "Sep 15", title: "Database Management System", desc: "Hands on using XAMPP." },
    { date: "Sep 17", title: "Networking", desc: "Transferring files from one computer to another, hands on activity." },
    { date: "Sep 17", title: "Functional English", desc: "Quiz Bee by group." },
    { date: "Sep 20", title: "Application Development", desc: "Refer to your pair groupings on your HCI." }
  ];

  return (
    <div className="left-task-section shadow-[inset_0_0_15px_rgba(0,0,0,0.08)] rounded-2xl p-5 flex flex-col">
      
      {/* MONTH HEADER */}
      <div className="flex items-center justify-between mb-6 relative">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="appearance-none bg-transparent pr-6 text-sm outline-none text-gray-900 dark:text-white"
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
          className="absolute right-2 top-1 pointer-events-none text-gray-700 dark:text-gray-300"
        />
      </div>

      {/* TASK ITEMS */}
      {tasks.map((task, i) => (
        <div key={i} className="mb-3">
          {/* Date button */}
          <button className="task-date text-xs px-3 py-1 rounded-full bg-[#Fffff] dark:bg-[#2B231B] text-gray-900 dark:text-white">
            {task.date}
          </button>

          {/* Task card */}
          <div
            className="task-card shadow-[0_3px_10px_rgba(0,0,0,0.08)] rounded-xl p-3 mt-1"
            style={{ height: taskCardHeight }}
          >
            <p className="title text-sm font-semibold text-gray-900 dark:text-white">
              {task.title}
            </p>
            <p className="desc text-xs opacity-70 dark:text-gray-300">
              {task.desc}
            </p>
          </div>
        </div>
      ))}

      {/* Footer */}
      <p className="footer text-center mt-auto text-[11px] opacity-60 dark:text-gray-400">
        ClassMate
      </p>
    </div>
  );
}
