import { Check, Edit, Share2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface UpcomingProps {
  onClose: () => void;
}

export default function Upcoming({ onClose }: UpcomingProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    // Try to use onClose first, fallback to navigate if needed
    if (onClose) {
      onClose();
    } else {
      navigate({ to: "/" }); // fallback route
    }
  };

  return (
    // BACKDROP — CLICKING OUTSIDE CLOSES MODAL
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* MODAL — CLICK INSIDE DOES NOT CLOSE */}
      <div
        className="w-[300px] h-[550px] rounded-3xl bg-white p-4 flex flex-col shadow-xl relative font-[SP_Pro]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Back Button */}
        <button
  className="text-lg mb-1 -ml-60"
  onClick={onClose} // just close the modal
>
  &lt;
</button>


        {/* Header */}
        <div className="flex items-center gap-2 text-[15px] font-bold mb-1 ml-3">
          <span>Upcoming tasks</span>
          <div className="ml-2 w-6 h-6 rounded-full border border-black flex items-center justify-center text-[9px]">
            4
          </div>
        </div>

        {/* Add Task */}
        <button
          className="w-32 mb-3 px-3 py-1 rounded-full border border-black text-[10px] bg-transparent shadow ml-3"
          onClick={() => navigate({ to: "/add-task" })}
        >
          Add a task
        </button>

        {/* Task Cards */}
        <div className="flex flex-col overflow-y-auto pr-1 text-[9px] mt-4 ml-2">
          {([4, 3, 2, 1] as const).map((num) => {
            const titles = {
              4: "System Integration",
              3: "Digital Poster",
              2: "Team Presentation",
              1: "System Integration",
            };

            const subtitles = {
              4: "Odoo task",
              3: "Digital Technologies",
              2: "Rizal's life",
              1: "Odoo task",
            };

            const dueDates = {
              4: "Due Thursday",
              3: "Due Thursday",
              2: "Due Wednesday",
              1: "Due Tuesday",
            };

            const times = {
              4: "10:30 AM - 11:30 AM",
              3: "10:30 AM - 11:30 AM",
              2: "1:00 PM - 2:00 PM",
              1: "10:30 AM - 11:30 AM",
            };

            const manualOffset = {
              4: "0px",
              3: "-55px",
              2: "-35px",
              1: "-35px",
            };

            const profileOffsets = {
              4: { top: "28px", left: "70px" },
              3: { top: "54px", left: "120px" },
              2: { top: "50px", left: "70px" },
              1: { top: "50px", left: "75px" },
            };

            const shareOffsets = {
              4: { top: "30px", left: "120px" },
              3: { top: "59px", left: "145px" },
              2: { top: "55px", left: "120px" },
              1: { top: "55px", left: "125px" },
            };

            const elementOffsets = {
              4: { due: "3px", title: "8px", subtitle: "-12px", time: "0px" },
              3: { due: "6px", title: "35px", subtitle: "-12px", time: "0px" },
              2: { due: "6px", title: "30px", subtitle: "-12px", time: "0px" },
              1: { due: "6px", title: "30px", subtitle: "-12px", time: "0px" },
            };

            return (
              <div
                key={num}
                className="relative rounded-xl shadow flex flex-col overflow-hidden"
                style={{
                  backgroundImage: `url('/${num}.png')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  height: "110px",
                  marginTop: manualOffset[num],
                }}
              >
                <span
                  className="absolute right-2 text-[8px] mt-1"
                  style={{ top: elementOffsets[num].due }}
                >
                  {dueDates[num]}
                </span>

                <p
                  className="font-bold text-[13px] mx-3 mb-4"
                  style={{ marginTop: elementOffsets[num].title }}
                >
                  {titles[num]}
                </p>

                <p
                  className="opacity-70 text-[10px] mx-3"
                  style={{ marginTop: elementOffsets[num].subtitle }}
                >
                  {subtitles[num]}
                </p>

                {/* Profile Images */}
                <div
                  className="absolute flex gap-0.5"
                  style={{
                    top: profileOffsets[num].top,
                    left: profileOffsets[num].left,
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-white">
                    <img src="/p1.png" className="w-4 h-4 rounded-full" />
                  </div>

                  {num !== 3 && (
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-white">
                      <img src="/p2.png" className="w-4 h-4 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Share Icon */}
                <Share2
                  size={12}
                  className="absolute"
                  style={{
                    top: shareOffsets[num].top,
                    left: shareOffsets[num].left,
                  }}
                />

                {/* Time */}
                <p
                  className="text-[9px] mx-3"
                  style={{ marginTop: elementOffsets[num].time }}
                >
                  {times[num]}
                </p>

                {/* Edit + Check */}
                <Edit
                  size={14}
                  className="absolute"
                  style={{ top: "25px", right: "25px" }}
                />

                <Check
                  size={14}
                  className="absolute"
                  style={{ top: "25px", right: "8px" }}
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mx-auto mt-auto">
          <img
            src="/ClassMate.png"
            alt="ClassMate Logo"
            className="w-30 h-auto filter-[blur(1px)] mb-7"
          />
        </div>
      </div>
    </div>
  );
}
