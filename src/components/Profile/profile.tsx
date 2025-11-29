import { Settings } from "lucide-react";
import { useState } from "react";
import EditProfile from "./Edit";
import SettingsModal from "./settings"; // <-- make sure this exists

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="bg-white w-[640px] h-[650px] rounded-[30px] shadow-[0px_8px_30px_rgba(0,0,0,0.15)] overflow-hidden relative">
      
      {/* Header gradient */}
      <div
        className="w-full p-6 flex items-center justify-between rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
        style={{ background: "linear-gradient(to right, #FFB84A, #B36265)" }}
      >
        <div className="flex items-center gap-4">
          <img
            src="/issa.jpeg"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-white"
            alt="Profile"
          />
          <div className="text-white">
            <h2 className="text-xl font-semibold">Princess A. Petancio</h2>
            <p className="text-sm opacity-90">princess.a.petancio@gmail.com</p>
          </div>
        </div>

        {/* Settings Icon + Edit Profile */}
        <div className="flex items-center">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-white/40 text-white px-4 py-2 rounded-lg text-sm border border-white/60 hover:bg-white/60 transition ml-6"
          >
            Edit Profile
          </button>

          {/* SETTINGS FLOATING MODAL OPENER */}
          <button onClick={() => setShowSettings(true)}>
          <Settings
            className="text-white cursor-pointer ml-4"
            style={{ width: 28, height: 28 }}
          />
        </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold mb-4 text-gray-800">Achievement Wall</h3>

        {/* Achievement Wall */}
        <div className="grid grid-cols-3 gap-4 mb-9">
          {/* Completed Tasks */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#A1FFE1] to-[#5DB958] p-6 text-white shadow-xl w-[180px] h-[120px]">
            <div className="absolute inset-0 shadow-[inset_0_8px_20px_rgba(0,0,0,0.25)] pointer-events-none rounded-3xl" />
            <div className="relative z-10 text-center">
              <p className="text-xs font-medium opacity-95 mb-1">Completed Tasks</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <p className="text-5xl font-bold">4</p>
                <div className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-2xl">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overdue Tasks */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FF9999] to-[#983535] p-6 text-white shadow-xl w-[180px] h-[120px]">
            <div className="absolute inset-0 shadow-[inset_0_8px_20px_rgba(0,0,0,0.3)] pointer-events-none rounded-3xl" />
            <div className="relative z-10 text-center">
              <p className="text-xs font-medium opacity-95 mb-1">Overdue Tasks</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <p className="text-5xl font-bold">3</p>
                <div className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-2xl">!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#ACCDFF] to-[#5085D5] p-6 text-white shadow-xl w-[180px] h-[120px]">
            <div className="absolute inset-0 shadow-[inset_0_8px_20px_rgba(0,0,0,0.25)] pointer-events-none rounded-3xl" />
            <div className="relative z-10 text-center">
              <p className="text-xs font-medium opacity-95 mb-1">Upcoming Deadlines</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <p className="text-5xl font-bold">4</p>
                <div className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teams */}
        <div className="bg-white rounded-3xl p-6 mb-8 border border-gray-100 shadow-[inset_0_3px_8px_rgba(0,0,0,0.08)]
                    max-h-[330px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

          {/* App Dev */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl 
                              flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>

              <div>
                <p className="font-semibold text-gray-800">App Dev</p>
                <p className="text-xs text-gray-500">Novin Mae Aguilar • 3 others</p>
              </div>
            </div>

            <button className="bg-black text-white px-5 py-2 rounded-2xl text-sm font-medium hover:bg-gray-900 transition">
              View Team
            </button>
          </div>

          <div className="h-px bg-gray-100 mb-5"></div>

          {/* Functional English */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl 
                              flex items-center justify-center text-white font-bold text-sm">
                FE
              </div>

              <div>
                <p className="font-semibold text-gray-800">Functional English</p>
                <p className="text-xs text-gray-500">Nikol Makaluya • 4 others</p>
              </div>
            </div>

            <span className="bg-amber-400 text-white px-4 py-2 rounded-2xl text-sm font-medium">
              New Task Added
            </span>
          </div>

          <div className="h-px bg-gray-100 mb-5"></div>

          {/* Database Management */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl 
                              flex items-center justify-center text-white font-bold text-sm">
                DB
              </div>

              <div>
                <p className="font-semibold text-gray-800">Database Management</p>
                <p className="text-xs text-gray-500">Maria Isabela Tayag • 4 others</p>
              </div>
            </div>

            <span className="bg-rose-500 text-white px-4 py-2 rounded-2xl text-sm font-medium">
              Deadline Friday!
            </span>
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <img
            src="/ClassMate.png"
            alt="ClassMate Logo"
            className="w-auto h-3 filter blur-[1px]"
          />
        </div>

      </div>

      {/* Floating EditProfile modal */}
      {isEditing && <EditProfile onClose={() => setIsEditing(false)} />}

      {/* Floating Settings modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
