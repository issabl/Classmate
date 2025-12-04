import { ChevronLeft } from "lucide-react";

interface EditProfileProps {
  onClose: () => void;
}

export default function EditProfile({ onClose }: EditProfileProps) {
  return (
    // Full-screen overlay with blurred background
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose} // Close if clicking outside
    >
      {/* Floating panel */}
      <div
        className="relative w-[640px] h-[650px] rounded-[30px] shadow-[0px_8px_30px_rgba(0,0,0,0.15)] p-6 flex gap-6 items-start"
        style={{
          backgroundColor: "var(--teams-bg)",
          color: "var(--teams-text)",
          borderColor: "var(--teams-border)"
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Back button */}
        <div className="absolute top-9 left-9 flex items-center gap-2">
          <ChevronLeft
            size={26}
            className="cursor-pointer"
            style={{ color: "var(--teams-text)" }}
            onClick={onClose}
          />
        </div>

        {/* Name and email */}
        <div className="absolute top-20 left-10 flex flex-col">
          <h1 className="text-[22px] font-bold leading-none" style={{ color: "var(--teams-text)" }}>
            Princess A. Petancio
          </h1>
          <p className="text-xs" style={{ color: "var(--teams-text)" }}>
            princess.a.petancio@gmail.com
          </p>
        </div>

        {/* Left Profile Image */}
        <div className="mt-40 -ml-40 flex-shrink-0">
          <img
            src="/issa.jpeg"
            alt="Profile"
            className="w-[280px] h-[280px] object-cover rounded-full shadow-lg border-4 border-[#5D3900]"
          />
        </div>
{/* Right Content */}
<div className="flex-1 mt-37 ml-2 flex flex-col justify-between">
  {/* Form */}
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <label className="text-sm mb-1" style={{ color: "var(--teams-text)" }}>First Name</label>
      <input
        type="text"
        className="w-full py-2 px-3 rounded-lg outline-none backdrop-blur-sm"
        style={{ backgroundColor: "#FFFFFF", color: "var(--teams-text)", border: "1px solid var(--teams-border)" }}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm mb-1" style={{ color: "var(--teams-text)" }}>Last Name</label>
      <input
        type="text"
        className="w-full py-2 px-3 rounded-lg outline-none backdrop-blur-sm"
        style={{ backgroundColor: "#FFFFFF", color: "var(--teams-text)", border: "1px solid var(--teams-border)" }}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm mb-1" style={{ color: "var(--teams-text)" }}>Email</label>
      <input
        type="email"
        className="w-full py-2 px-3 rounded-lg outline-none backdrop-blur-sm"
        style={{ backgroundColor: "#FFFFFF", color: "var(--teams-text)", border: "1px solid var(--teams-border)" }}
      />
    </div>

  {/* Upload Button aligned like Update button */}
  <div className="mt-2 flex justify-start">
    <button
      className="w-[180px] py-3 rounded-full text-sm font-medium backdrop-blur-sm hover:opacity-90 transition"
      style={{ backgroundColor: "var(--teams-bg)", color: "var(--teams-text)", border: "1px solid var(--teams-border)" }}
    >
      Upload new photo
    </button>
  </div>
</div>

{/* Update button */}
<div className="mt-4 flex justify-start">
  <button className="w-[180px] py-3 rounded-full bg-gradient-to-r from-[#C59A4A] to-[#9B6A28] text-white font-medium shadow-md hover:opacity-90 transition">
    Update Profile
  </button>
          </div>
        </div>
      </div>
    </div>
  );
}
