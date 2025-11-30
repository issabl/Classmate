import { useState, useEffect } from "react";
import { Moon } from "lucide-react";

interface MoonButtonProps {
  notificationsOpen: boolean;
}

export default function MoonButton({ notificationsOpen }: MoonButtonProps) {
  // Initialize dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // Apply dark class and save preference
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <button
      className={`
        ${notificationsOpen ? "backdrop-blur-sm bg-white/50" : ""} 
        hover:opacity-70 transition px-2 py-1 rounded
      `}
      onClick={() => setDarkMode(!darkMode)}
    >
      <Moon
        className={`${darkMode ? "text-yellow-400" : "text-black dark:text-white"}`}
        size={20}
      />
    </button>
  );
}
