import { Maximize2 } from "lucide-react";
import { useState } from "react";
import WideTask1 from "./Widetask1";
import WideTask2 from "./Widetask2";
import WideTask3 from "./Widetask3";

interface Task {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  checklist: { id: number; text: string; done: boolean }[];
  color: string;
  icon: string;
}

interface Task {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  checklist: { id: number; text: string; done: boolean }[];
  color: string;
  icon: string;
  isCompleted?: boolean;        // NEW: Track if completed
  completedAt?: string;         // Optional: When it was completed
}

export default function TaskCards() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Midterm Project Meeting",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      description: "The team met to review progress on the IT project, discuss challenges, and assign next tasks.",
      checklist: [
        { id: 1, text: "Assign task to members", done: true },
        { id: 2, text: "Make a group chat", done: false },
        { id: 3, text: "Submit documentation", done: true },
        { id: 4, text: "Mag tanga", done: false },
        { id: 5, text: "skibidi", done: false },
      ],
      color: "bg-[#D8A75B]",
      icon: "/school.png",
    },
    {
      id: 2,
      title: "Finalize Website UI",
      startTime: "10:00 AM",
      endTime: "3:00 PM",
      description: "The team met to review progress on the IT project, discuss challenges, and assign next tasks.",
      checklist: [],
      color: "bg-[#C5B6D4]",
      icon: "/notebook.png",
    },
    {
      id: 3,
      title: "Functional English Quiz",
      startTime: "10:00 AM",
      endTime: "3:00 PM",
      description: "The team met to review progress on the IT project, discuss challenges, and assign next tasks.",
      checklist: [],
      color: "bg-[#D19A9C]",
      icon: "/student.png",
    },
  ]);

  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  // Helper: Calculate duration
  const calculateDuration = (start: string, end: string): string => {
    const toMinutes = (t: string) => {
      const [time, period] = t.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return h * 60 + (m || 0);
    };
    let diff = toMinutes(end) - toMinutes(start);
    if (diff < 0) diff += 1440;
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Update task (called from WideTask1)
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const getProgress = (checklist: Task["checklist"]) => {
    if (checklist.length === 0) return 0;
    return Math.round((checklist.filter(i => i.done).length / checklist.length) * 100);
  };

  return (
    <>
      <div className="flex gap-5 p-2 -mt-4 ml-2">
        {tasks.map((task) => {
          const progress = getProgress(task.checklist);
          const duration = calculateDuration(task.startTime, task.endTime);

          return (
            <div
              key={task.id}
              className="w-[235px] h-[290px] bg-white rounded-3xl shadow-[0_4px_17px_rgba(0,0,0,0.20)] p-4 cursor-pointer transition-all hover:scale-105"
              onClick={() => setOpenTaskId(task.id)}
            >
              <div className={`${task.color} h-20 rounded-2xl relative flex items-center justify-center gap-2 px-4 text-white font-semibold text-[16px] overflow-hidden`}>
                <Maximize2
                  className="absolute top-2 right-2 h-5 w-5 cursor-pointer z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenTaskId(task.id);
                  }}
                />
                <img src={task.icon} className="h-20 w-auto -ml-4" alt="" />
                <span className="text-shadow">{task.title}</span>
              </div>

              <div className="mt-2 text-center text-[13px] font-medium">
                <p>{task.startTime} — {task.endTime}</p>
                <p className="text-xs opacity-70">Start &nbsp; End</p>
              </div>

              <p className="text-center mt-1 text-[10px] text-gray-700 leading-tight line-clamp-3">
                {task.description}
              </p>

              <div className="mt-4 w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-[10px] text-white font-bold transition-all duration-500"
                  style={{ width: `${progress}%` }}
                >
                  {progress > 15 && `${progress}%`}
                </div>
              </div>

              <div className="mt-4 bg-gradient-to-r from-[#7D5414] to-[#A6731A] text-[#FFE4A1] py-2 rounded-full text-center text-sm font-bold shadow-md">
                {duration}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODALS — PASS TASK DATA + UPDATE FUNCTION */}
      {openTaskId === 1 && (
        <WideTask1
          task={tasks.find(t => t.id === 1)!}
          onClose={() => setOpenTaskId(null)}
          onUpdate={updateTask}
        />
      )}
      {openTaskId === 2 && (
        <WideTask2
          task={tasks.find(t => t.id === 2)!}
          onClose={() => setOpenTaskId(null)}
          onUpdate={updateTask}
        />
      )}
      {openTaskId === 3 && (
        <WideTask3
          task={tasks.find(t => t.id === 3)!}
          onClose={() => setOpenTaskId(null)}
          onUpdate={updateTask}
        />
      )}
    </>
  );
}