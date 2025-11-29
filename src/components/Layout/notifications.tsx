import React from "react";
import { X } from "lucide-react";

const NotificationPage = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50">

      {/* 🔹 BACKGROUND BLUR — CLICK TO CLOSE */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/10"
        onClick={onClose}
      ></div>

      {/* 🔹 MODAL CARD — MUST BLOCK CLICKS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[300px] h-[550px] rounded-3xl bg-white p-4 flex flex-col shadow-xl font-[SP_Pro] relative pointer-events-auto"
        >
          {/* X BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={16} />
          </button>

          {/* TITLE */}
          <h1 className="text-[14px] font-bold text-center mb-3">
            Notifications
          </h1>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <p className="text-[10px] font-semibold text-gray-600">Today</p>

            <div className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-3">
              <div className="flex justify-between">
                <p className="font-bold text-[10px]">9:00 AM</p>
                <p className="text-gray-400 text-[9px]">now</p>
              </div>
              <p className="text-[9px]">
                Don't forget your Math quiz today at 10 AM!
              </p>
            </div>

            <div className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-3">
              <div className="flex justify-between">
                <p className="font-bold text-[10px]">2:00 PM</p>
                <p className="text-gray-400 text-[9px]">1 min ago</p>
              </div>
              <p className="text-[9px]">
                <span className="text-red-500 font-semibold">Reminder:</span>{" "}
                Submit your Research draft before 5 PM.
              </p>
            </div>

            <div className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-3">
              <div className="flex justify-between">
                <p className="font-bold text-[10px]">6:00 PM</p>
                <p className="text-gray-400 text-[9px]">1 hour ago</p>
              </div>
              <p className="text-[9px]">
                Review notes for tomorrow’s Presentation.{" "}
                <i>You got this!</i>
              </p>
            </div>

            <p className="text-[10px] font-semibold text-gray-600">Yesterday</p>

            <div className="w-full border border-gray-300 rounded-xl p-3">
              <p className="font-bold text-[10px]">10:30 AM</p>
              <p className="text-[9px]">
                Your group member Sarah has completed the task: Prepare slides
                for Science Presentation.
              </p>
            </div>

            <div className="w-full border border-gray-300 rounded-xl p-3">
              <p className="font-bold text-[10px]">3:30 PM</p>
              <p className="text-[9px]">
                Lab materials checklist: bring goggles and notebook.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
