import { useState } from "react";
import { Search, Moon, Bell } from "lucide-react";
import Profile from '../Profile/profile';
import Notifications from "../Layout/notifications";

export default function TopPart() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <div className="w-full flex items-center justify-between px-6 mt-2 relative z-10">
        {/* LEFT SIDE (Search Bar) */}
        <div
          className={`flex items-center gap-3 w-[260px] rounded-full px-4 py-2 border border-[#E5E5E5] shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                      ${notificationsOpen ? "backdrop-blur-sm bg-white/50" : "bg-white"}`}
        >
          <Search size={16} className="text-gray-500" />
          <input type="text" placeholder="Search" className="w-full bg-transparent focus:outline-none text-sm" />
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-6 -mt-4">
          {/* Moon icon - blurred when notifications open */}
          <button className={`${notificationsOpen ? "backdrop-blur-sm bg-white/50" : ""} hover:opacity-70 transition px-2 py-1 rounded`}>
            <Moon size={20} className="text-black" />
          </button>

          {/* Bell icon - stays sharp */}
          <button
            className="hover:opacity-70 transition relative z-20"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell size={20} className="text-black" />
          </button>

          {/* Profile image - blurred when notifications open */}
          <div
            className={`w-9 h-9 rounded-full overflow-hidden border border-gray-300 shadow-sm cursor-pointer
                        ${notificationsOpen ? "backdrop-blur-sm bg-white/50" : ""}`}
            onClick={() => setProfileOpen(true)}
          >
            <img src="/issa.jpeg" alt="Profile" className="w-full h-full object-cover" />
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
          {/* blur for background only */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setNotificationsOpen(false)}
          />
          <div className="relative z-10 w-[360px] bg-white rounded-xl shadow-lg">
            <Notifications />
          </div>
        </div>
      )}
    </>
  );
}
