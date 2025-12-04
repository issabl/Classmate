import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface MoonButtonProps {
  notificationsOpen: boolean;
}

export default function MoonButton({ notificationsOpen }: MoonButtonProps) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <button
      className="transition px-2 py-1 rounded"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-400" />  // shows Sun in dark mode
      ) : (
        <Moon size={20} className="text-black" />      // shows Moon in light mode
      )}
    </button>
  );
}
