import React, { useState } from "react";
import CompletedTasks from "./completed";
import UpcomingTasks from "./upcoming";

export default function TaskPage() {
  const [selected, setSelected] = useState("today");
  const [showCompleted, setShowCompleted] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  return (
    <div>
      <div className="px-8 pt-8 pb-1 -mt-4 font-sfpro">
        <h2 className="text-[19px] mb-2 keep-light-text">
  You have{" "}
  <span className="font-bold italic no-dark-span">
    4 tasks
  </span>{" "}
  to complete!
</h2>



        <div className="flex items-center gap-10 ml-40 mt-9">
          <button
            onClick={() => setSelected("today")}
            className={`px-7 py-2.5 rounded-full text-sm ${
              selected === "today"
                ? "bg-black text-white shadow-sm"
                : "border border-gray-300 text-gray-600"
            }`}
          >
            Today
          </button>

          <button
            onClick={() => {
              setSelected("upcoming");
              setShowUpcoming(true);
            }}
            className={`px-7 py-2.5 rounded-full text-sm ${
              selected === "upcoming"
                ? "bg-black text-white shadow-sm"
                : "border border-black-300 text-black-600"
            }`}
          >
            Upcoming
          </button>

          <button
            onClick={() => {
              setSelected("completed");
              setShowCompleted(true);
            }}
            className={`px-7 py-2.5 rounded-full text-sm ${
              selected === "completed"
                ? "bg-black text-white shadow-sm"
                : "border border-black-300 text-black-600"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Upcoming Modal */}
      {showUpcoming && <UpcomingTasks onClose={() => setShowUpcoming(false)} />}

      {/* Completed Modal */}
      {showCompleted && <CompletedTasks onClose={() => setShowCompleted(false)} />}
    </div>
  );
}
