import { useState, useEffect } from "react";
import { Search, Moon, Sun, Bell } from "lucide-react";
import Profile from "../Profile/profile";
import Notifications from "../Layout/notifications";

// Read dark mode from localStorage initially
const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("darkMode") === "true";
  }
  return false;
};

export default function TopPart() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  // Apply dark class when darkMode changes
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <>
      <div className="w-full flex items-center justify-between px-6 mt-2 relative z-10">
        {/* LEFT SIDE - Search Bar */}
        <div
          className={`
            flex items-center gap-3 
            w-[260px] 
            rounded-full 
            px-5 py-3
            shadow-[0_10px_25px_rgba(0,0,0,0.25)]
            ${darkMode ? "bg-[#FFEACA]" : "bg-white"}
          `}
        >
          <Search
            size={18}
            className={darkMode ? "text-[#7D5414]" : "text-black"}
          />
          <input
            type="text"
            placeholder="Search"
            className={`
              w-full bg-transparent focus:outline-none text-sm
              ${darkMode
                ? "text-[#7D5414] placeholder-[#7D5414]/60"
                : "text-black placeholder-black/60"
              }
            `}
          />
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-6 -mt-4">
          {/* Toggle icon */}
          <button
            className="hover:opacity-70 transition px-2 py-1 rounded"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" /> // Sun in dark mode
            ) : (
              <Moon size={20} className="text-black" />      // Moon in light mode
            )}
          </button>

          {/* Bell icon */}
          <button
            className="hover:opacity-70 transition relative z-20"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell
              size={20}
              className={`${darkMode ? "text-white" : "text-black"}`}
            />
          </button>

          {/* Profile image */}
          <div
            className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 shadow-sm cursor-pointer"
            onClick={() => setProfileOpen(true)}
          >
            <img
              src="/issa.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* PROFILE MODAL */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setProfileOpen(false)}
          />
          <div className="relative z-10">
            <Profile onClose={() => setProfileOpen(false)} />
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-24">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setNotificationsOpen(false)}
          />
          <div className="relative z-10 w-[360px] bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <Notifications onClose={() => setNotificationsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
