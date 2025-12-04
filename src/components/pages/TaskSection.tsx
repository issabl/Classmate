import Sidebar from "../Home/sidebar";
import WhiteContainer from "../Layout/whitecontainer";
import TopSection from "../Layout/TopPart";
import { Calendar, X } from "lucide-react";

export default function TaskSection() {
  return (
    <div className="flex w-full min-h-screen bg-gray-100 home-container">
      <Sidebar />

      {/* WhiteContainer wraps everything */}
      <WhiteContainer 
      className="flex-1 flex flex-col p-6 md:p-10 min-h-screen">
        <TopSection />

        {/* Scrollable area for main form */}
        <div className="flex-1 overflow-auto mt-6">
          {/* MAIN FORM CARD */}
          <div
            className="rounded-3xl shadow-lg p-6 md:p-8 border max-w-5xl mx-auto"
            style={{
              backgroundColor: "var(--profile-bg)",
              color: "var(--profile-text)",
              borderColor: "var(--profile-border)",
            }}
          >
            {/* TASK TITLE */}
            <div className="mb-5">
              <label
                className="block text-base font-semibold mb-2"
                style={{ color: "var(--notification-text)" }}
              >
                Task Title
              </label>
              <input
                type="text"
                placeholder="Enter task title"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style={{ backgroundColor: "#D9D9D9", color: "#000" }}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
              <label
                className="block text-base font-semibold mb-2"
                style={{ color: "var(--notification-text)" }}
              >
                Description
              </label>
              <textarea
                placeholder="Enter task description"
                className="w-full rounded-lg px-4 py-3 h-32 resize-none outline-none text-sm"
                style={{ backgroundColor: "#D9D9D9", color: "#000" }}
              />
            </div>

            {/* DATE & TIME + INVITE MEMBERS */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT COLUMN */}
              <div className="flex-1">
                <label className="block text-base font-semibold mb-2" style={{ color: "var(--notification-text)" }}>
                  Date
                </label>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="DD/MM/YY"
                    className="rounded-lg px-4 py-3 w-full sm:w-32 text-sm outline-none"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                  <span className="text-gray-500 text-xl">—</span>
                  <input
                    type="text"
                    placeholder="DD/MM/YY"
                    className="rounded-lg px-4 py-3 w-full sm:w-32 text-sm outline-none"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                  <Calendar size={20} className="text-gray-600 ml-2" />
                </div>

                <label className="block text-base font-semibold mb-3" style={{ color: "var(--notification-text)" }}>
                  Time
                </label>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <input
                      type="text"
                      defaultValue="09:00"
                      className="rounded-lg px-4 py-3 w-28 text-sm outline-none"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                    <div className="flex gap-2">
                      <button className="bg-[#F0A855] text-white px-4 py-3 rounded-lg text-sm font-medium">AM</button>
                      <button className="bg-gray-300 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium">PM</button>
                    </div>
                    <span className="text-sm text-gray-600">Start</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <input
                      type="text"
                      defaultValue="05:00"
                      className="rounded-lg px-4 py-3 w-28 text-sm outline-none"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                    <div className="flex gap-2">
                      <button className="bg-gray-300 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium">AM</button>
                      <button className="bg-[#2D2D2D] text-white px-4 py-3 rounded-lg text-sm font-medium">PM</button>
                    </div>
                    <span className="text-sm text-gray-600">End</span>
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block text-base font-semibold mb-3" style={{ color: "var(--notification-text)" }}>
                    Priority
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-2 rounded-lg text-sm bg-gray-200 text-gray-600">Low</button>
                    <button className="px-6 py-2 rounded-lg text-sm bg-purple-600 text-white">Med</button>
                    <button className="px-6 py-2 rounded-lg text-sm bg-gray-200 text-gray-600">High</button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex-1">
                <div className="p-5 rounded-2xl shadow-lg border border-gray-300 w-full" style={{ background: "linear-gradient(to bottom, #F0A855, #8E3C09)" }}>
                  <h3 className="font-semibold text-base mb-4 text-white">Invite Members</h3>

                  <input
                    type="text"
                    placeholder="Type email and press Enter"
                    className="w-full rounded-lg px-4 py-3 text-sm outline-none mb-3"
                    style={{ backgroundColor: "white" }}
                  />

                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">N</div>
                        <span className="text-sm font-medium">Novin Mae Aguilar</span>
                      </div>
                      <X size={18} className="text-gray-600 cursor-pointer hover:text-red-600" />
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">M</div>
                        <span className="text-sm font-medium">Mary Jane Pogoy</span>
                      </div>
                      <X size={18} className="text-gray-600 cursor-pointer hover:text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ADD TASK BUTTON */}
            <div className="mt-10 text-center">
              <button className="bg-[#5F3B00] hover:bg-[#4A2F00] text-white font-semibold px-10 py-3 rounded-full text-base transition">
                Add a task
              </button>
            </div>
          </div>
        </div>
      </WhiteContainer>
    </div>
  );
}
