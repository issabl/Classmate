import { Home, Calendar, Plus, LogOut } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import LogoutModal from "../pages/logout"; 

export default function Sidebar() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (path: string) =>
    router.state.location.pathname === path;

  return (
    <div className="w-full h-screen flex sidebar-container">
      <aside className="w-60 h-full flex flex-col py-6 px-6 sidebar-panel">
        
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

<Link
  to="/home"
  className={`flex items-center gap-3 px-[15px] py-2 rounded-xl font-medium transition-colors duration-200 ${
    isActive("/home")
      ? "link-active"
      : "link-hover text-gray-700 dark:text-gray-200"
  }`}
>
  <Home strokeWidth={2} className="w-5 h-5" />
  Home
</Link>

<Link
  to="/calendar"
  className={`flex items-center gap-3 px-[15px] py-2 rounded-xl font-medium transition-colors duration-200 ${
    isActive("/calendar")
      ? "link-active"
      : "link-hover text-gray-700 dark:text-gray-200"
  }`}
>
  <Calendar strokeWidth={2} className="w-5 h-5" />
  Calendar
</Link>

<Link
  to="/add-task"
  className={`flex items-center gap-3 px-[15px] py-2 rounded-xl font-medium transition-colors duration-200 ${
    isActive("/add-task")
      ? "link-active"
      : "link-hover text-gray-700 dark:text-gray-200"
  }`}
>
  <div className="w-5 h-5 flex items-center justify-center bg-black text-white rounded-full text-sm">
    <Plus className="w-4 h-4" />
  </div>
  Add task
</Link>

<button
  onClick={() => setShowLogout(true)}
  className={`flex items-center gap-3 px-[15px] py-2 rounded-xl font-medium transition-colors duration-200 link-hover text-gray-700 dark:text-gray-200`}
>
  <LogOut strokeWidth={2} className="w-5 h-5" />
  Log out
</button>


        </nav>
      </aside>

      {showLogout && (
        <LogoutModal
          onConfirm={() => {
            console.log("Logging out...");
            setShowLogout(false);
          }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}
