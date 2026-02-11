import React from "react";
import { X } from "lucide-react";

const NotificationPage = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50">
      {/* BACKGROUND BLUR */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        onClick={onClose}
      ></div>

      {/* MODAL CARD */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="notification-modal w-[300px] h-[550px] rounded-3xl p-4 flex flex-col shadow-xl font-[SP_Pro] relative pointer-events-auto border"
          style={{
            backgroundColor: "var(--notification-bg)",
            borderColor: "var(--notification-border)",
            color: "var(--notification-text)"
          }}
        >
          {/* X BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1 rounded-full hover:bg-gray-100"
            style={{ color: "var(--notification-text)" }}
          >
            <X size={16} />
          </button>

          {/* TITLE */}
          <h1
            className="text-[14px] font-bold text-center mb-3"
            style={{ color: "var(--notification-text)" }}
          >
            Notifications
          </h1>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {/* Section label */}
            <p
              className="text-[10px] font-semibold"
              style={{ color: "var(--notification-text)" }}
            >
              Today
            </p>

            {/* Notification Item */}
            <div
              className="w-full border shadow-sm rounded-xl p-3"
              style={{
                backgroundColor: "var(--notification-item-bg)",
                borderColor: "var(--notification-border)",
                color: "var(--notification-item-text)"
              }}
            >
              <div className="flex justify-between">
                <p className="font-bold text-[10px]"
                style={{ color: "var(--notification-item-text)" }}>9:00 AM</p>
                <p className="text-[9px]"
                style={{ color: "var(--notification-item-text)" }}>now</p>
              </div>
              <p className="text-[9px]"
              style={{ color: "var(--notification-item-text)" }}>
                Don't forget your Math quiz today at 10 AM!
              </p>
            </div>

            {/* Repeat other notifications similarly */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
