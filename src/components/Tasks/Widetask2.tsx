import { Trash2, Share2, Circle, CheckCircle, X } from "lucide-react";

export default function WideTask2({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose} // clicking the overlay closes modal
    >
      <div
        className="w-[340px] rounded-3xl shadow-2xl p-6 text-white relative"
        style={{
          background: "linear-gradient(180deg, #C5B6D4 0%, #2B0353 100%)",
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-2 text-[#5E417B]">
          Finalize Website UI
        </h2>

        {/* Time Section */}
        <div className="flex justify-between text-sm px-4 mb-2">
          <div className="flex flex-col text-center">
            <span className="font-semibold">01:00 PM</span>
            <span className="text-white/70">Start</span>
          </div>

          <div className="bg-[#A078C9] text-white rounded-full px-3 py-1 text-s font-semibold h-[30px]">
            3 hours
          </div>

          <div className="flex flex-col text-center">
            <span className="font-semibold">04:00 PM</span>
            <span className="text-white/70">End</span>
          </div>
        </div>

        {/* Avatars + Share */}
        <div className="flex justify-center justify-between mb-3">
          <div className="flex -space-x-2">
            <img
              src="https://i.pravatar.cc/40?img=4"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=5"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=6"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <Share2 className="text-white w-5 h-5 cursor-pointer mt-1 ml-1" />
        </div>

        {/* Task Description */}
        <p className="text-sm font-semibold mb-1">Task Description</p>
        <div className="bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl text-xs leading-relaxed mb-4">
          Finalize the UI components of the project including buttons,
          navigation layout, color adjustments, responsive views, and overall
          visual polishing. Ensure consistency across all pages.
        </div>

        {/* Checklist */}
        <p className="text-sm font-semibold mb-2">Checklist</p>

        <div className="space-y-3 text-sm">
          {/* Item 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Circle className="text-white w-4 h-4" />
              <span>Revise color palette</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>

          {/* Item 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-white w-4 h-4" />
              <span>Adjust button styles</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>

          {/* Item 3 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Circle className="text-white w-4 h-4" />
              <span>Fix responsive layout</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>

          {/* Item 4 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Circle className="text-white w-4 h-4" />
              <span>Clean up spacing</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-white/40 h-3 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-white rounded-r-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ width: "70%" }}
            >
              70%
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <button className="mt-4 w-full bg-[#C5B6D4] text-[#4B3C5A] py-2 rounded-full font-semibold">
          Complete
        </button>
      </div>
    </div>
  );
}
