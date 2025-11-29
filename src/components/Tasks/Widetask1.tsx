import { Trash2, Share2, Circle, CheckCircle, X } from "lucide-react";

export default function WideTask1({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose} // clicking the overlay closes modal
    >
      <div
        className="w-[340px] rounded-3xl shadow-2xl p-6 text-white relative"
        style={{
          background: "linear-gradient(180deg, #D8A75B 0%, #3A2608 100%)",
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
        <h2 className="text-center text-xl font-semibold mb-2">
          Midterm Project Meeting
        </h2>

        {/* Time Section */}
        <div className="flex justify-between text-sm px-4 mb-2">
          <div className="flex flex-col text-center">
            <span className="font-semibold">10:00 AM</span>
            <span className="text-white/70">Start</span>
          </div>

          <div className="bg-[#FFEACA] text-[#89570B] rounded-full px-3 py-1 text-s font-semibold h-[30px]">
            2 hours
          </div>

          <div className="flex flex-col text-center">
            <span className="font-semibold">12:00 PM</span>
            <span className="text-white/70">End</span>
          </div>
        </div>

        {/* Avatars + Share */}
        <div className="flex justify-center justify-between mb-3">
          <div className="flex -space-x-2">
            <img
              src="https://i.pravatar.cc/40?img=1"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=2"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=3"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <Share2 className="text-white w-5 h-5 cursor-pointer mt-1 ml-1" />
        </div>

        {/* Task Description */}
        <p className="text-sm font-semibold mb-1">Task Description</p>
        <div className="bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl text-xs leading-relaxed mb-4">
          Prepare and present the midterm project focusing on the integration of
          different modules into a single system. Ensure documentation is
          updated, slides are ready, and the demo is functional.
        </div>

        {/* Checklist */}
        <p className="text-sm font-semibold mb-2">Checklist</p>

        <div className="space-y-3 text-sm">
          {/* Item 1 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-white w-4 h-4" />
              <span>Assign task to members</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>

          {/* Item 2 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Circle className="text-white w-4 h-4" />
              <span>Make a group chat</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>

          {/* Item 3 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-white w-4 h-4" />
              <span>Submit documentation</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>

          {/* Item 4 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Circle className="text-white w-4 h-4" />
              <span>Mag tanga</span>
            </div>
            <Trash2 className="text-white/80 w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Progress Bar */}
       <div className="mt-6">
            <div className="w-full bg-white/40 h-3 rounded-full overflow-hidden relative">
                <div
                className="h-full bg-[#DF8700] rounded-r-full flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: "50%" }}
                >
                50%
                </div>
            </div>
            </div>


        {/* Complete Button */}
        <button className="mt-4 w-full bg-[#FFEACA] text- py-2 rounded-full font-semibold">
          Complete
        </button>
      </div>
    </div>
  );
}
