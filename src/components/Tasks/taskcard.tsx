import { Maximize2 } from "lucide-react";
import { useState } from "react";
import WideTask1 from "./Widetask1";
import WideTask2 from "./Widetask2";
import WideTask3 from "./Widetask3";

export default function TaskCards() {
  const [openTask, setOpenTask] = useState<number | null>(null);

  const progress1 = 50;
  const progress2 = 70;
  const progress3 = 30;

  return (
    <>
<div className="flex gap-5 p-2 -mt-4 ml-2">
  {/* CARD 1 */}
  <div className="task-card w-[235px] h-[290px] rounded-3xl shadow-[0_4px_17px_rgba(0,0,0,0.2)] p-4">
    <div className="task-card-header bg-[#D8A75B] h-20 rounded-2xl relative flex items-center justify-center gap-2 px-4 font-semibold text-[16px]" style={{ color: "#764B06" }}>
      <Maximize2
        className="absolute top-2 right-2 h-5 w-5 text-[#764B06] cursor-pointer"
        onClick={() => setOpenTask(1)}
      />
      <img src="/school.png" className="h-20 w-auto -ml-4" />
      <span>Midterm Project Meeting</span>
    </div>

    <div className="mt-2 text-center text-[13px]">
      <p>10:00 AM — 3:00 PM</p>
      <p className="text-[#7D5414] dark:text-[#FBC46E] text-[12px] font-semibold">Start &nbsp; End</p>
    </div>

    <p className="text-center mt-1 text-[10px] text-gray-700 dark:text-gray-700 leading-tight">
      The team met to review progress on the IT project, discuss challenges, and assign next tasks.
    </p>

    <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
      <div
        className="h-4 flex items-center justify-center text-[10px] text-white font-semibold"
        style={{ width: `${progress1}%`, backgroundColor: "#D8A75B" }}
      >
        {progress1}%
      </div>
    </div>

    <div className="mt-4 bg-[#7D5414] text-[#FBC46E] py-2 rounded-full text-center text-sm font-medium">
      2 hours
    </div>
  </div>

  {/* CARD 2 */}
  <div className="task-card w-[235px] h-[290px] rounded-3xl shadow-[0_4px_17px_rgba(0,0,0,0.2)] p-4">
    <div className="task-card-header bg-[#C5B6D4] h-20 rounded-2xl relative flex items-center justify-center gap-2 px-4 font-semibold text-[16px]" style={{ color: "#545256" }}>
      <Maximize2
        className="absolute top-2 right-2 h-5 w-5 text-[#726381] cursor-pointer"
        onClick={() => setOpenTask(2)}
      />
      <img src="/notebook.png" className="h-20 w-auto -ml-2" />
      <span>Finalize Website UI</span>
    </div>

    <div className="mt-2 text-center text-[13px]">
      <p>10:00 AM — 3:00 PM</p>
      <p className="text-[#726381] dark:text-[#E1D1F1] text-[12px] font-semibold">Start &nbsp; End</p>
    </div>

    <p className="text-center mt-1 text-[10px] text-gray-700 dark:text-gray-700 leading-tight">
      The team met to review progress on the IT project, discuss challenges, and assign next tasks.
    </p>

    <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
      <div
        className="h-4 flex items-center justify-center text-[10px] text-white font-semibold"
        style={{ width: `${progress2}%`, backgroundColor: "#C5B6D4" }}
      >
        {progress2}%
      </div>
    </div>

    <div className="mt-4 bg-[#726381] text-[#E1D1F1] py-2 rounded-full text-center text-sm font-medium">
      2 hours
    </div>
  </div>

  {/* CARD 3 */}
  <div className="task-card w-[235px] h-[290px] rounded-3xl shadow-[0_4px_17px_rgba(0,0,0,0.2)] p-4">
    <div className="task-card-header bg-[#D19A9C] h-20 rounded-2xl relative flex items-center justify-center gap-2 px-4 font-semibold text-[16px]" style={{ color: "#A34346" }}>
      <Maximize2
        className="absolute top-2 right-2 h-5 w-5 text-[#A34346] cursor-pointer"
        onClick={() => setOpenTask(3)}
      />
      <img src="/student.png" className="h-20 w-auto -ml-4" />
      <span>Functional English Quiz</span>
    </div>

    <div className="mt-2 text-center text-[13px]">
      <p>10:00 AM — 3:00 PM</p>
      <p className="text-[#A34346] dark:text-[#FAC2C4] text-[12px] font-semibold">Start &nbsp; End</p>
    </div>

    <p className="text-center mt-1 text-[10px] text-gray-700 dark:text-gray-700 leading-tight">
      The team met to review progress on the IT project, discuss challenges, and assign next tasks.
    </p>

    <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
      <div
        className="h-4 flex items-center justify-center text-[10px] text-white font-semibold"
        style={{ width: `${progress3}%`, backgroundColor: "#D19A9C" }}
      >
        {progress3}%
      </div>
    </div>

    <div className="mt-4 bg-[#8E4B4D] text-[#FAC2C4] py-2 rounded-full text-center text-sm font-medium">
      2 hours
    </div>
  </div>
</div>

      {/* MODALS */}
      {openTask === 1 && <WideTask1 onClose={() => setOpenTask(null)} />}
      {openTask === 2 && <WideTask2 onClose={() => setOpenTask(null)} />}
      {openTask === 3 && <WideTask3 onClose={() => setOpenTask(null)} />}
    </>
  );
}
