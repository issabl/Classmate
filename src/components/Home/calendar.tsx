import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYears, setShowYears] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "long" });

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysArray = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);

  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const prevMonthDays = Array.from({ length: firstDay.getDay() }, (_, i) => prevMonthLastDay - firstDay.getDay() + i + 1);

  const nextMonthDaysCount = 6 - lastDay.getDay();
  const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => i + 1);

  const goPrev = () => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  const goNext = () => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));

  const changeYear = (y: number) => {
    setCurrentDate(new Date(y, currentDate.getMonth(), 1));
    setShowYears(false);
  };

  const calendarWidth = 360;
  const calendarHeight = 250; // fixed
  const totalRows = Math.ceil((prevMonthDays.length + daysArray.length + nextMonthDays.length) / 7);
  const availableHeight = calendarHeight - 80; // header + weekdays
  const daySize = Math.min(22, availableHeight / totalRows); // dynamically fit into grid

  return (
    <div
      className="absolute"
      style={{ top: 79, left: 1070, width: calendarWidth, height: calendarHeight, fontFamily: "SF PRO" }}
    >
      <div className="bg-[#F8F8F8] rounded-2xl shadow-xl p-4 w-full h-full ">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 -mt-1">
          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg">
            <button onClick={goPrev}>
                <ChevronLeft />
            </button>
            </div>

          <div className="relative text-center">
            <button onClick={() => setShowYears(!showYears)} className="text-xs w-full">
              {year}
            </button>
            <p className="text-l font-semibold">{month}</p>

            {showYears && (
              <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-2 w-20 z-10">
                {[2024, 2025, 2026].map((y) => (
                  <button
                    key={y}
                    onClick={() => changeYear(y)}
                    className="w-full py-1 hover:bg-gray-100 rounded-lg text-sm"
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg">
            <button onClick={goNext}>
                <ChevronRight />
            </button>
            </div>

        </div>

        {/* Days of the week */}
        <div className="grid grid-cols-7 text-center text-[11px] text-gray-400 -mt-2 ">
          <p>SUN</p>
          <p>MON</p>
          <p>TUE</p>
          <p>WED</p>
          <p>THU</p>
          <p>FRI</p>
          <p>SAT</p>
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 text-center gap-1.5 ml-3.5">
          {/* Previous Month */}
          {prevMonthDays.map((day, i) => (
            <div
              key={`prev-${i}`}
              className="flex items-center justify-center rounded-full border border-black text-black"
              style={{ width: daySize, height: daySize, fontSize: 12 }}
            >
              {day}
            </div>
          ))}

          {/* Current Month */}
          {daysArray.map((day) => {
            const isToday =
              day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            const circleStyle = isToday
              ? {
                  backgroundColor: "#D8A75B",
                  color: "black",
                  boxShadow: "inset 0 0 4px rgba(0,0,0,0.3)",
                }
              : { backgroundColor: "#000", color: "white" };

            return (
              <div
                key={day}
                className="flex items-center justify-center rounded-full cursor-pointer"
                style={{ width: daySize, height: daySize, ...circleStyle, fontSize: 12 }}
              >
                {day}
              </div>
            );
          })}

          {/* Next Month */}
          {nextMonthDays.map((day, i) => (
            <div
              key={`next-${i}`}
              className="flex items-center justify-center rounded-full border border-black text-black"
              style={{ width: daySize, height: daySize, fontSize: 12 }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
