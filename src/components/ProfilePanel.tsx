import { useState } from "react";
import ProfilePanel from "./Profile/profile";// Make sure the path is correct

export default function ProfileModalWrapper({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Your top profile icon */}
      <button onClick={() => setOpen(true)}>
        <img
          src="/your-profile-pic.jpg"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Blur Background */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Profile Panel */}
          <div className="relative z-10">
            <ProfilePanel onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Optional children */}
      {children}
    </>
  );
}
