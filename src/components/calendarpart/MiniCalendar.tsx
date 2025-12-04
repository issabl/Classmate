import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const prevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-1">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={18} />
        </button>

        <div className="text-center">
          <p className="text-xs">{year}</p>
          <p className="font-semibold text-lg">{month}</p>
        </div>

        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 w-full mb-1">
        <span>SUN</span><span>MON</span><span>TUE</span>
        <span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
      </div>

      <div className="grid grid-cols-7 gap-1 w-full ml-7">
        {days.map((day) => {
          const isActive = day === 15;

          return (
            <button
              key={day}
              className={`calendar-day ${
                isActive ? "calendar-day-active" : "calendar-day-default"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
