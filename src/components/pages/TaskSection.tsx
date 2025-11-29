import Sidebar from "../Home/sidebar";
import WhiteContainer from "../Layout/whitecontainer";
import TopSection from "../Layout/TopPart";

import { Calendar, Clock, ChevronDown, X } from "lucide-react";

export default function TaskSection() {
  return (
    <div className="flex w-full bg-[#E7E7E7]">

      <Sidebar />

      <WhiteContainer>
        <TopSection />

        <div className="mt-4 px-8 pb-8 w-full"> {/* slightly smaller spacing */}
          {/* MAIN FORM WRAPPER */}
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 border border-gray-200 max-h-[580px] overflow-y-auto">


            {/* TASK TITLE */}
            <label className="block text-base font-semibold mb-1.5">Task Title</label> {/* smaller text */}
            <input
              type="text"
              placeholder="Enter task title"
              className="w-[60%] bg-[#F0F0F0] rounded-lg px-3 py-2.5 mb-4 outline-none text-gray-700 text-sm" // smaller input
            />

            {/* DESCRIPTION */}
            <label className="block text-base font-semibold mb-1.5">Description</label>
            <textarea
              placeholder="Enter task description"
              className="w-[70%] bg-[#F0F0F0] rounded-lg px-3 py-2.5 h-28 mb-6 outline-none text-gray-700 text-sm" 
            />

            {/* DATE + INVITE MEMBERS ROW */}
            <div className="flex items-start gap-15"> {/* reduced gap */}

              {/* LEFT COLUMN (DATE & TIME & PRIORITY) */}
              <div className="w-[45%]">

                {/* DATE */}
                <label className="block text-base font-semibold mb-1.5">Date</label>
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="DD/MM/YY"
                    className="bg-[#EBEBEB] rounded-lg px-3 py-1.5 w-[40%] outline-none text-gray-700 text-sm"
                  />

                  <span className="text-gray-400 text-sm">—</span>

                  <input
                    type="text"
                    placeholder="DD/MM/YY"
                    className="bg-[#EBEBEB] rounded-lg px-3 py-1.5 w-[40%] outline-none text-gray-700 text-sm"
                  />

                  <Calendar className="text-gray-600" size={18} /> {/* smaller icon */}
                </div>

                {/* TIME */}
                <label className="block text-base font-semibold mb-1.5">Time</label>
                <div className="flex items-center gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="HH:MM (AM/PM)"
                    className="bg-[#EBEBEB] rounded-lg px-3 py-1.5 w-[50%] outline-none text-gray-700 text-sm"
                  />
                  <Clock size={18} className="text-gray-600" />
                </div>

                {/* PRIORITY SECTION */}
                <label className="block text-base font-semibold mb-2">Priority</label>
                <div className="flex items-center gap-3">
                  <button className="bg-[#EBEBEB] text-gray-600 px-5 py-1.5 rounded-lg text-sm">
                    Low
                  </button>

                  <button className="bg-[#A76BF1] text-white px-5 py-1.5 rounded-lg text-sm">
                    Med
                  </button>

                  <button className="bg-[#EBEBEB] text-gray-600 px-5 py-1.5 rounded-lg text-sm">
                    High
                  </button>
                </div>
              </div>

              {/* INVITE MEMBERS CARD */}
              <div className="w-[40%]">
                <div className="p-4 rounded-xl border border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-linear-to-b from-[#F4E5C8] to-[#C5912D]">
                  <h2 className="font-semibold text-base mb-2.5">Invite Members</h2>

                  {/* SELECT DROPDOWN */}
                  <div className="relative mb-3">
                    <button className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2 flex justify-between items-center text-sm">
                      <span className="text-gray-600">Select Members</span>
                      <ChevronDown size={18} className="text-gray-600" />
                    </button>
                  </div>

                  {/* SELECTED MEMBERS LIST */}
                  <div className="flex flex-col gap-1.5">
                    {/* MEMBER 1 */}
                    <div className="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <img src="/person1.png" className="w-6 h-6 rounded-full" />
                        <span className="text-gray-800">Novin Mae Aguilar</span>
                      </div>
                      <X size={18} className="text-gray-700 cursor-pointer" />
                    </div>

                    {/* MEMBER 2 */}
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
