import { LogOut } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface LogoutModalProps {
  onCancel: () => void;
}

export default function LogoutModal({ onCancel }: LogoutModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    // Redirect to SignIn page
    router.navigate({ to: "/signin" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white w-[400px] h-[360px] md:w-[450px] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.15)] p-6 flex flex-col items-center relative">
        
        {/* Leaving Icon */}
        <div className="bg-[#7D5414] rounded-full p-4 -mt-1 flex items-center justify-center shadow-md">
          <LogOut className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <h1 className="mt-4 text-xl font-bold text-gray-800 text-center">Oh no! You are leaving</h1>
        <p className="mt-2 text-sm text-gray-500 text-center">Are you sure?</p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col w-full gap-3">
          <button
            onClick={handleConfirm}
            className="w-full py-2 bg-[#7D5414]  text-white rounded-xl font-semibold hover:bg-amber-500 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
          >
            No
          </button>
        </div>

        {/* Bottom Logo */}
        <div className="absolute bottom-6 flex justify-center w-full ">
          <img src="/ClassMate.png" alt="ClassMate Logo" className="h-3 filter blur-[1px]" />
        </div>
      </div>
    </div>
  );
}
