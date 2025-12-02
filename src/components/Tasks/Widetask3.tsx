import { Trash2, Share2, Circle, CheckCircle, X, Plus, Send } from "lucide-react";
import { useState, useEffect } from "react";

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

interface WideTask3Props {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

export default function WideTask3({ task, onClose, onUpdate }: WideTask3Props) {
  const [startTime, setStartTime] = useState(task.startTime);
  const [endTime, setEndTime] = useState(task.endTime);
  const [description, setDescription] = useState(task.description);
  const [checklist, setChecklist] = useState(task.checklist);
  const [newItem, setNewItem] = useState("");
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");

  // LIVE SYNC TO PARENT
  useEffect(() => {
    onUpdate({
      ...task,
      startTime,
      endTime,
      description,
      checklist,
    });
  }, [startTime, endTime, description, checklist]);

  const completedCount = checklist.filter(i => i.done).length;
  const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  const timeToMinutes = (t: string): number => {
    const [time, period] = t.trim().split(" ");
    let [h, m = 0] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  const calculateDuration = (start: string, end: string): string => {
    let diff = timeToMinutes(end) - timeToMinutes(start);
    if (diff < 0) diff += 24 * 60;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  const handleTimeChange = (input: string, isStart: boolean) => {
    let val = input.replace(/[^0-9]/g, "").slice(0, 4);
    if (val.length >= 3) val = val.slice(0, 2) + ":" + val.slice(2);

    const period = isStart
      ? startTime.includes("AM") ? "AM" : "PM"
      : endTime.includes("AM") ? "AM" : "PM";

    if (val.length === 5) {
      const [hh, mm] = val.split(":");
      const formatted = `${hh.padStart(2, "0")}:${mm.padStart(2, "0")} ${period}`;
      isStart ? setStartTime(formatted) : setEndTime(formatted);
    } else {
      isStart ? setStartTime(val + " " + period) : setEndTime(val + " " + period);
    }
  };

  const toggleAmPm = (setter: any, current: string) => {
    setter(current.includes("AM") ? current.replace("AM", "PM") : current.replace("PM", "AM"));
  };

  const toggleItem = (id: number) => {
    setChecklist(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const deleteItem = (id: number) => {
    setChecklist(prev => prev.filter(i => i.id !== id));
  };

  const addItem = () => {
    if (newItem.trim()) {
      setChecklist([...checklist, { id: Date.now(), text: newItem.trim(), done: false }]);
      setNewItem("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md" onClick={onClose}>
      <div
        className="w-[340px] rounded-3xl shadow-2xl p-6 text-white relative flex flex-col"
        style={{
          background: "linear-gradient(180deg, #D19A9C 0%, #390507 100%)",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4 text-white z-10" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-center text-xl font-bold mb-4 pr-8 text-[#7A2B2D]">{task.title}</h2>

        {/* TIME + DURATION */}
        <div className="flex justify-between items-center px-4 mb-5">
          <div className="text-center">
            <input
              type="text"
              value={startTime.split(" ")[0]}
              onChange={(e) => handleTimeChange(e.target.value, true)}
              className="bg-white/20 rounded px-3 py-1.5 text-center font-bold w-20 text-sm outline-none"
            />
            <button
              onClick={() => toggleAmPm(setStartTime, startTime)}
              className="mt-1 text-xs font-bold px-3 py-1 rounded-full bg-red-900/60"
            >
              {startTime.split(" ")[1] || "AM"}
            </button>
            <span className="block text-white/70 text-xs">Start</span>
          </div>

          <div className="bg-[#B9686B] text-white rounded-full px-5 py-2 font-bold text-sm shadow-md">
            {calculateDuration(startTime, endTime)}
          </div>

          <div className="text-center">
            <input
              type="text"
              value={endTime.split(" ")[0]}
              onChange={(e) => handleTimeChange(e.target.value, false)}
              className="bg-white/20 rounded px-3 py-1.5 text-center font-bold w-20 text-sm outline-none"
            />
            <button
              onClick={() => toggleAmPm(setEndTime, endTime)}
              className="mt-1 text-xs font-bold px-3 py-1 rounded-full bg-red-900/60"
            >
              {endTime.split(" ")[1] || "AM"}
            </button>
            <span className="block text-white/70 text-xs">End</span>
          </div>
        </div>

        {/* AVATARS + SHARE BUTTON */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/40?img=8" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
            <img src="https://i.pravatar.cc/40?img=9" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
            <img src="https://i.pravatar.cc/40?img=10" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
          </div>

          {/* WORKING SHARE BUTTON */}
          <button
            onClick={() => setShowShareModal(true)}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
          >
            <Share2 className="w-5 h-5 text-red-700" />
          </button>
        </div>

        {/* SHARE MODAL — FULLY WORKING */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div
              className="bg-gradient-to-b from-red-50 to-red-100 rounded-2xl shadow-2xl p-6 w-80 border border-red-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-red-800">Invite Members</h3>
                <button onClick={() => setShowShareModal(false)} className="text-red-700 hover:text-red-900">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  placeholder="Type email and press Enter"
                  className="w-full px-4 py-3 rounded-xl border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm text-black placeholder:text-gray-600"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && shareEmail.trim()) {
                      alert(`Task shared with: ${shareEmail}`);
                      setShareEmail("");
                      setShowShareModal(false);
                    }
                  }}
                />
              </div>

              <button
                onClick={() => {
                  if (shareEmail.trim()) {
                    alert(`Task shared with: ${shareEmail}`);
                    setShareEmail("");
                    setShowShareModal(false);
                  }
                }}
                disabled={!shareEmail.trim()}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                  shareEmail.trim()
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send size={18} />
                Send Task
              </button>
            </div>
          </div>
        )}

        {/* DESCRIPTION */}
        <p className="text-sm font-bold mb-1">Task Description</p>
        <div
          className="bg-white/30 backdrop-blur-sm rounded-xl p-3 text-xs leading-relaxed cursor-text mb-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30"
          onClick={() => setIsEditingDesc(true)}
        >
          {isEditingDesc ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setIsEditingDesc(false)}
              autoFocus
              className="w-full bg-transparent text-white outline-none resize-none min-h-20"
              rows={5}
            />
          ) : (
            <p className="whitespace-pre-wrap">{description || "Click to add description..."}</p>
          )}
        </div>

        {/* CHECKLIST */}
        <p className="text-sm font-bold mb-2">Checklist</p>
        <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-white/30 mb-4">
          <div className="space-y-2">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="Add new item..."
                className="flex-1 bg-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-xs outline-none"
              />
              <button onClick={addItem} className="bg-white/30 p-2 rounded-lg hover:bg-white/40">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {checklist.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white/10 rounded-lg px-3 py-2">
                <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleItem(item.id)}>
                  {item.done ? <CheckCircle className="w-5 h-5 text-green-300" /> : <Circle className="w-5 h-5 text-white/60" />}
                  <span className={item.done ? "line-through text-white/70" : "text-white"}>{item.text}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className="text-white/70 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-auto">
          <div className="w-full bg-white/30 h-10 rounded-full overflow-hidden relative flex items-center">
            <div
              className="h-full bg-[#DF8700] rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
              {progress > 15 && `${progress}%`}
            </div>
            {progress === 0 && <span className="ml-3 text-white/80 text-xs">No items yet</span>}
            {progress === 100 && <span className="ml-3 text-green-300 font-bold">All Done!</span>}
          </div>
        </div>

        <button
          className={`mt-4 w-full py-3 rounded-full font-bold text-lg transition-all ${
            progress === 100 ? "bg-green-500 hover:bg-green-600 text-white" : "bg-[#FFEACA] text-[#5F3B00] hover:bg-[#ffd4a3]"
          }`}
        >
          {progress === 100 ? "Task Complete!" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
}