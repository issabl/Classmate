import { LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface LogoutModalProps {
  onCancel: () => void;
}

export default function LogoutModal({ onCancel }: LogoutModalProps) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Clear session/localStorage
    localStorage.clear();

    // Navigate to sign-in page
    navigate({ to: "/" });

    // Close modal
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white w-[400px] h-[360px] md:w-[450px] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.15)] p-6 flex flex-col items-center relative">
        
        {/* Icon */}
        <div className="bg-[#7D5414] rounded-full p-4 flex items-center justify-center shadow-md -mt-1">
          <LogOut className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <h1 className="mt-4 text-xl font-bold text-gray-800 text-center">
          Oh no! You are leaving
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Are you sure?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col w-full gap-3">
          <button
            onClick={handleConfirm}
            className="w-full py-2 bg-[#7D5414] text-white rounded-xl font-semibold hover:bg-amber-600 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            No
          </button>
        </div>

        {/* Bottom logo */}
        <div className="absolute bottom-6 flex justify-center w-full">
          <img
            src="/ClassMate.png"
            alt="ClassMate Logo"
            className="h-3 filter blur-[1px]"
          />
        </div>
      </div>
    </div>
  );
}
