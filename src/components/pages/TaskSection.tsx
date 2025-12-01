import Sidebar from "../Home/sidebar";
import WhiteContainer from "../Layout/whitecontainer";
import TopSection from "../Layout/TopPart";
import { Calendar, Clock, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";   // ← ITO LANG KULANG MO

export default function TaskSection() {
  // STATES
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [priority, setPriority] = useState<"Low" | "Med" | "High">("Med");

  const [showStartCal, setShowStartCal] = useState(false);
  const [showEndCal, setShowEndCal] = useState(false);

  // Simple date formatter
  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear().toString().slice(-2);
    return `${d}/${m}/${y}`;
  };

  // Floating Mini Calendar
  // PERFECT Floating Mini Calendar WITH MONTH/YEAR NAVIGATION
const MiniCalendar = ({ value, onChange, onClose }: { value: string; onChange: (s: string) => void; onClose: () => void }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);

  // Extract selected date if exists
  useEffect(() => {
    if (value) {
      const [d, m, y] = value.split("/");
      if (d && m && y) {
        setCurrentMonth(new Date(parseInt("20" + y), parseInt(m) - 1, parseInt(d)));
      }
    }
  }, [value]);

  const goPrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = [];
  // Previous month filler
  const prevMonthDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrent: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrent: true });
  }
  // Next month filler
  while (days.length < 42) {
    days.push({ day: days.length - daysInMonth - firstDay + 1, isCurrent: false });
  }

  return (
    <div className="absolute top-10 left-0 bg-white rounded-2xl shadow-2xl p-4 z-50 border border-gray-200 w-72">
      {/* Header with arrows */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={goPrevMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} />
        </button>
        <div className="font-semibold text-gray-800">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </div>
        <button onClick={goNextMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="text-center font-bold text-gray-500 py-2">{d}</div>
        ))}
        {days.map((item, i) => {
          const dateStr = item.isCurrent 
            ? formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), item.day))
            : "";
          
          const isSelected = value === dateStr;
          const isToday = item.isCurrent && 
            item.day === today.getDate() && 
            currentMonth.getMonth() === today.getMonth() && 
            currentMonth.getFullYear() === today.getFullYear();

          return (
            <button
              key={i}
              onClick={() => {
                if (item.isCurrent) {
                  const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), item.day);
                  onChange(formatDate(selected));
                  onClose();
                }
              }}
              disabled={!item.isCurrent}
              className={`
                w-9 h-9 rounded-full text-sm transition-all
                ${!item.isCurrent ? "text-gray-300 cursor-default" : "hover:bg-gray-100"}
                ${isSelected ? "bg-[#D8A75B] text-white font-bold" : ""}
                ${isToday && !isSelected ? "ring-2 ring-[#D8A75B] ring-inset" : ""}
              `}
            >
              {item.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
  return (
    <div className="flex w-full bg-[#E7E7E7]">
      <Sidebar />
      <WhiteContainer>
        <TopSection />

        <div className="mt-4 px-8 pb-8 w-full">
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-200 max-h-[580px] overflow-y-auto">

            {/* TASK TITLE */}
            <label className="block text-base font-semibold mb-1.5">Task Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-[60%] bg-[#F0F0F0] rounded-lg px-3 py-2.5 mb-4 outline-none text-gray-700 text-sm"
            />

            {/* DESCRIPTION */}
            <label className="block text-base font-semibold mb-1.5">Description</label>
            <textarea
              placeholder="Enter task description"
              className="w-[70%] bg-[#F0F0F0] rounded-lg px-3 py-2.5 h-28 mb-6 outline-none text-gray-700 text-sm"
            />

            <div className="flex items-start gap-15">

              {/* LEFT COLUMN (DATE & TIME & PRIORITY) */}
              <div className="w-[45%] relative">

                {/* DATE — PERFECT SIZE & SPACING */}
                <label className="block text-base font-semibold mb-1.5">Date</label>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="DD/MM/YY"
                      value={startDate}
                      readOnly
                      onClick={() => setShowStartCal(!showStartCal)}
                      className="bg-[#EBEBEB] rounded-lg px-3 py-1.5 w-full outline-none text-gray-700 text-sm cursor-pointer font-medium"
                    />
                    {showStartCal && <MiniCalendar value={startDate} onChange={setStartDate} onClose={() => setShowStartCal(false)} />}
                  </div>

                  <span className="text-gray-400 text-lg font-bold">—</span>

                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="DD/MM/YY"
                      value={endDate}
                      readOnly
                      onClick={() => setShowEndCal(!showEndCal)}
                      className="bg-[#EBEBEB] rounded-lg px-3 py-1.5 w-full outline-none text-gray-700 text-sm cursor-pointer font-medium"
                    />
                    {showEndCal && <MiniCalendar value={endDate} onChange={setEndDate} onClose={() => setShowEndCal(false)} />}
                  </div>

                  <Calendar className="text-gray-600" size={18} />
                </div>

                {/* TIME — START & END WITH BEAUTIFUL AM/PM */}
                <label className="block text-base font-semibold mb-1.5">Time</label>
                <div className="space-y-3">

                  {/* START TIME */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="HH:MM"
                      value={startTime.split(" ")[0] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9:]/g, "").slice(0, 5);
                        if (val === "" || /^([0-1]?[0-9]|2[0-3]):?([0-5][0-9])?$/.test(val)) {
                          setStartTime(val + (val ? " " : "") + (startTime.includes("AM") ? "AM" : "PM"));
                        }
                      }}
                      className="bg-[#EBEBEB] rounded-lg px-3 py-1.5 w-28 outline-none text-gray-700 text-sm font-medium"
                    />
                    <button
                      onClick={() => setStartTime(p => p.includes("AM") ? p.replace("AM", "PM") : p.replace("PM", "AM"))}
                      className={`px-5 py-1.5 rounded-lg text-sm font-bold transition-all shadow-md ${
                        startTime.includes("AM")
                          ? "bg-[#D8A75B] text-white"     // GOLD FOR AM
                          : "bg-[#4A5568] text-white"     // DARK BLUE-GRAY FOR PM
                      }`}
                    >
                      {startTime.includes("AM") ? "AM" : "PM"}
                    </button>
                    <span className="text-gray-600 text-sm">Start</span>
                  </div>

                  {/* END TIME */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="HH:MM"
                      value={endTime.split(" ")[0] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9:]/g, "").slice(0, 5);
                        if (val === "" || /^([0-1]?[0-9]|2[0-3]):?([0-5][0-9])?$/.test(val)) {
                          setEndTime(val + (val ? " " : "") + (endTime.includes("AM") ? "AM" : "PM"));
                        }
                      }}
                      className="bg-[#EBEBEB] rounded-lg px-3 py-1.5 w-28 outline-none text-gray-700 text-sm font-medium"
                    />
                    <button
                      onClick={() => setEndTime(p => p.includes("AM") ? p.replace("AM", "PM") : p.replace("PM", "AM"))}
                      className={`px-5 py-1.5 rounded-lg text-sm font-bold transition-all shadow-md ${
                        endTime.includes("AM")
                          ? "bg-[#D8A75B] text-white"
                          : "bg-[#4A5568] text-white"
                      }`}
                    >
                      {endTime.includes("AM") ? "AM" : "PM"}
                    </button>
                    <span className="text-gray-600 text-sm">End</span>
                  </div>
                </div>

                {/* PRIORITY — ALREADY PERFECT */}
                <label className="block text-base font-semibold mb-2 mt-5">Priority</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setPriority("Low")} className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all ${priority === "Low" ? "bg-green-500 text-white shadow-md" : "bg-[#EBEBEB] text-gray-600"}`}>Low</button>
                  <button onClick={() => setPriority("Med")} className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all ${priority === "Med" ? "bg-[#A76BF1] text-white shadow-md" : "bg-[#EBEBEB] text-gray-600"}`}>Med</button>
                  <button onClick={() => setPriority("High")} className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all ${priority === "High" ? "bg-red-500 text-white shadow-md" : "bg-[#EBEBEB] text-gray-600"}`}>High</button>
                </div>
              </div>

              {/* INVITE MEMBERS CARD — UNTOUCHED */}
              <div className="w-[40%]">
                <div className="p-4 rounded-xl border border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-gradient-to-b from-[#F4E5C8] to-[#C5912D]">
                  <h2 className="font-semibold text-base mb-2.5">Invite Members</h2>
                  <div className="relative mb-3">
                    <button className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2 flex justify-between items-center text-sm">
                      <span className="text-gray-600">Select Members</span>
                      <ChevronDown size={18} className="text-gray-600" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <img src="/person1.png" className="w-6 h-6 rounded-full" />
                        <span className="text-gray-800">Novin Mae Aguilar</span>
                      </div>
                      <X size={18} className="text-gray-700 cursor-pointer" />
                    </div>
                    <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <img src="/person2.png" className="w-6 h-6 rounded-full" />
                        <span className="text-gray-800">Mary Jane Pogoy</span>
                      </div>
                      <X size={18} className="text-gray-700 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ADD TASK BUTTON */}
            <div className="mt-3">
              <button className="bg-[#5F3B00] text-white rounded-full px-8 py-2.5 font-semibold text-base mx-auto block">
                Add a task
              </button>
            </div>

          </div>
        </div>
      </WhiteContainer>
    </div>
  );
}