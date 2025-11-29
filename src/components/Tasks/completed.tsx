interface CompletedTasksProps {
  onClose: () => void;
}

export default function CompletedTasks({ onClose }: CompletedTasksProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-[300px] h-[550px] rounded-3xl bg-white p-4 flex flex-col shadow-xl relative font-[SP_Pro]">

        {/* Back button */}
        <button
          className="text-lg mb-1 -ml-60"
          onClick={onClose}
        >
          &lt;
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-[15px] font-bold mb-3 ml-3">
          <span>Completed tasks</span>
          <div className="ml-2 w-6 h-6 rounded-full border border-black flex items-center justify-center text-[9px]">
            4
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-5 px-1 mt-7">

          {/* Card 5 */}
          <div
          className="w-[120px] h-[150px] rounded-2xl p-3 text-[10px] relative bg-cover bg-center"
          style={{ backgroundImage: "url('/5.png')" }}
        >
            <p className="absolute bottom-2 left-3 text-[8px] font-semibold">3/10</p>
            <div className="absolute mt-29 ml-20 w-6 h-6 rounded-full border border-black flex items-center justify-center bg-white/80">
              ✓
            </div>
          </div>

          {/* Card 6 */}
          <div
            className="w-[120px] h-[150px] rounded-2xl p-3 text-[10px] relative bg-cover bg-center"
            style={{ backgroundImage: "url('6.png')" }}
          >
            <p className="absolute bottom-2 left-3 text-[8px] font-semibold">4/10</p>
            <div className="absolute mt-29 ml-20 w-6 h-6 rounded-full border border-black flex items-center justify-center bg-white/80">
              ✓
            </div>
          </div>

          {/* Card 7 */}
          <div
            className="w-[120px] h-[150px] rounded-2xl p-3 text-[10px] relative bg-cover bg-center"
            style={{ backgroundImage: "url('7.png')" }}
          >
            <p className="absolute bottom-2 left-3 text-[8px] font-semibold">1/10</p>
            <div className="absolute mt-29 ml-20 w-6 h-6 rounded-full border border-black flex items-center justify-center bg-white/80">
              ✓
            </div>
          </div>

          {/* Card 8 */}
          <div
            className="w-[120px] h-[150px] rounded-2xl p-3 text-[10px] relative bg-cover bg-center"
            style={{ backgroundImage: "url('/8.png')" }}
          >
            <p className="absolute bottom-2 left-3 text-[8px] font-semibold">2/10</p>
            <div className="absolute mt-29 ml-20 w-6 h-6 rounded-full border border-black flex items-center justify-center bg-white/80">
              ✓
            </div>
          </div>

          <div className="mx-auto mt-auto">
          <img
            src="/ClassMate.png"
            alt="ClassMate Logo"
            className="w-30 h-auto filter-[blur(1px)] mt-6 ml-17"
          />
        </div>

        </div>
      </div>
    </div>
  );
}
