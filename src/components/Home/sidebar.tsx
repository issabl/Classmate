import { Home, Calendar, Plus, LogOut } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import LogoutModal from "../pages/logout"; 


export default function Sidebar() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false); // state for logout modal

  // Function to check if a path is active
  const isActive = (path: string) => {
    return router.state.location.pathname === path;
  };

  return (
    <div className="w-full h-screen bg-[#E7E7E7] flex">
      <aside className="w-60 h-full bg-[#E7E7E7] flex flex-col py-6 px-6">
        {/* Logo */}
        <div className="mb-10 flex justify-center mt-3">
          <img
            src="/ClassMate.png"
            alt="ClassMate Logo"
            className="w-[150px]"
            draggable="false"
          />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-9 mt-9">
          {/* HOME */}
          <Link
            to="/home"
            className={`flex items-center gap-3 px-[15px] py-2 rounded-xl font-medium ${
              isActive("/home")
                ? "bg-white text-black shadow-sm"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Home strokeWidth={2} className="w-5 h-5" />
            Home
          </Link>

          {/* CALENDAR */}
          <Link
            to="/calendar"
            className={`flex items-center gap-3 px-[15px] py-2 rounded-xl font-medium ${
              isActive("/calendar")
                ? "bg-white text-black shadow-sm"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Calendar strokeWidth={2} className="w-5 h-5" />
            Calendar
          </Link>

          {/* ADD TASK */}
          <Link
            to="/add-task"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
              isActive("/add-task")
                ? "bg-white text-black shadow-sm"
                : "text-gray-700 hover:bg-gray-300"
            }`}
            aria-current={isActive("/add-task") ? "page" : undefined}
          >
            <div className="w-5 h-5 flex items-center justify-center bg-black text-white rounded-full text-sm">
              <Plus className="w-4 h-4" />
            </div>
            Add task
          </Link>

          {/* LOG OUT */}
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-3 px-[15px] py-2 hover:bg-gray-300 rounded-xl font-medium text-gray-700 mt-auto"
          >
            <LogOut strokeWidth={2} className="w-5 h-5" />
            Log out
          </button>
        </nav>
      </aside>

      {/* Logout Modal */}
      {showLogout && (
        <LogoutModal
          onConfirm={() => {
            console.log("Logging out..."); // replace with actual logout logic
            setShowLogout(false);
          }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}
