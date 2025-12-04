import { LogOut } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface LogoutModalProps {
  onCancel: () => void;
}

export default function LogoutModal({ onCancel }: LogoutModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    router.navigate({ to: "/signup" });
  };

  return (
    <div className="logout-modal-backdrop">
      <div className="logout-modal-container">
        {/* Icon */}
        <div className="logout-modal-icon">
          <LogOut />
        </div>

        {/* Text */}
        <h1 className="text-xl font-bold">Oh no! You are leaving</h1>
        <p className="text-sm">Are you sure?</p>

        {/* Buttons */}
        <div className="logout-modal-buttons">
          <button onClick={handleConfirm} className="logout-modal-confirm">
            Yes
          </button>
          <button onClick={onCancel} className="logout-modal-cancel">
            No
          </button>
        </div>

        {/* Bottom logo */}
        <img
          src="/ClassMate.png"
          alt="ClassMate Logo"
          className="logout-modal-logo"
        />
      </div>
    </div>
  );
}
