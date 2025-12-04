import React, { useState } from "react";
import {
  Shield,
  HelpCircle,
  UserMinus,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [section, setSection] = useState<
    "security" | "help" | "delete" | "changePassword"
  >("security");

  // Personal Info
  const [fullName, setFullName] = useState("Princess A. Petancio");
  const [email, setEmail] = useState("princess.a.petancio@gmail.com");
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  // Change Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleSaveInfo = () => {
    if (!fullName.trim()) return alert("Full name cannot be empty!");
    if (!email.includes("@") || !email.includes(".")) return alert("Invalid email!");
    setIsEditingInfo(false);
    alert("Profile updated!");
  };

  const handleChangePassword = () => {
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordSuccess("Password changed successfully!");
    setTimeout(() => {
      setSection("security");
      setPasswordSuccess("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[650px] rounded-3xl shadow-2xl overflow-hidden relative flex">
        {/* Back Button */}
        <button
          onClick={section === "security" ? onClose : () => setSection("security")}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-sidebar-text-light dark:text-sidebar-text-dark"
        >
          <ArrowLeft size={22} />
          {section === "security" ? "Settings" : "Back"}
        </button>

        {/* LEFT SIDEBAR */}
        <div className="w-80 pt-28 px-8 h-full settings-sidebar">
          <nav className="space-y-6">
            <button
              onClick={() => setSection("security")}
              className={`sidebar-button ${
                section === "security" ? "active" : "inactive"
              }`}
            >
              <Shield size={20} />
              Account Security
            </button>

            <button
              onClick={() => setSection("help")}
              className={`sidebar-button ${
                section === "help" ? "active" : "inactive"
              }`}
            >
              <HelpCircle size={24} />
              Help & Support
            </button>

            <button
              onClick={() => setSection("delete")}
              className={`sidebar-button font-bold delete-btn ${
                section === "delete" ? "active" : "inactive"
              }`}
            >
              <UserMinus size={24} />
              Delete Account
            </button>
          </nav>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 flex items-center justify-center p-10 overflow-auto h-full settings-content">
          <div className="w-full max-w-lg content-wrapper">
            {/* ACCOUNT SECURITY */}
            {section === "security" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold mt-2">
  <span className="right-label">Account Security</span>
</h1>

                {/* Personal Info */}
<div className="rounded-3xl p-6 shadow-sm border content-card">
  <div className="flex justify-between items-center mb-3">
    <h3 className="font-bold text-lg">Personal Information</h3>
    <button
      onClick={() => setIsEditingInfo(!isEditingInfo)}
      className="text-amber-500 font-medium"
    >
      {isEditingInfo ? "Cancel" : "Edit"}
    </button>
  </div>

  {isEditingInfo ? (
    <div className="space-y-3">
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full px-4 py-3 border rounded-2xl focus:ring-4 outline-none input-field"
        placeholder="Full Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border rounded-2xl focus:ring-4 outline-none input-field"
        placeholder="Email"
      />
      <button
        onClick={handleSaveInfo}
        className="w-full font-bold py-3 rounded-2xl hover:bg-amber-700 transition content-button"
      >
        Save Changes
      </button>
    </div>
  ) : (
    <div className="space-y-2 text-sm">
      <p>
        Full Name:{" "}
        <span className="user-info-text font-medium">{fullName}</span>
      </p>
      <p>
        Email:{" "}
        <span className="user-info-text font-medium">{email}</span>
      </p>
    </div>
  )}
</div>


                {/* Security Settings */}
                <div className="rounded-3xl p-6 shadow-sm border content-card">
                  <h3 className="font-bold text-lg mb-3">Security Settings</h3>
                  <button className="text-amber-500 font-medium hover:underline" onClick={() => setSection("changePassword")}>
                    Change Password
                  </button>
                </div>

                {/* Login Activity */}
                <div className="rounded-3xl p-6 shadow-sm border content-card">
                  <h3 className="font-bold text-lg mb-3">Login Activity</h3>
                  <ul className="space-y-1 text-sm leading-relaxed text-white-700">
                    <li>• <strong>Last login:</strong> Nov 11, 2025 3:45 PM</li>
                    <li>• <strong>Device:</strong> Chrome on Windows</li>
                  </ul>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    App Version: v1.0.0 (November 2025)
                  </p>
                </div>
              </div>
            )}

            {/* HELP & SUPPORT */}
            {section === "help" && (
              <div className="space-y-4">
               <h1 className="text-3xl font-bold mt-2">
  <span className="right-label">Help & Support</span>
</h1>

                <div className="rounded-3xl p-4 shadow-sm border content-card">
                  <h3 className="font-bold text-lg mb-2">Getting Started</h3>
                  <ul className="text-black-700 space-y-1 text-sm leading-relaxed">
                    <li>• Tap + button to create a new task</li>
                    <li>• Join or create teams from Home → Teams</li>
                    <li>• Use Google Sign-In for faster access</li>
                  </ul>
                </div>

                <div className="rounded-3xl p-4 shadow-sm border content-card">
                  <h3 className="font-bold text-lg mb-2">Common Issues</h3>
                  <ul className="text-black-700 space-y-1 text-sm leading-relaxed">
                    <li>• Tasks not saving? → Check your internet connection</li>
                    <li>• Forgot password? → Use “Forgot password?” on login</li>
                    <li>• App not loading? → Clear browser cache</li>
                  </ul>
                </div>

                <div className="rounded-3xl p-4 text-center shadow-sm border content-card-help">
                  <p className="font-bold text-amber-900 text-lg">Need immediate help?</p>
                  <p className="text-amber-800 font-medium mt-1">support@classmate.app</p>
                  <p className="text-xs text-amber-700 mt-1">We reply within 24 hours</p>
                </div>
              </div>
            )}

            {/* DELETE ACCOUNT */}
            {section === "delete" && (
              <div className="text-center space-y-10">
                <h1 className="text-3xl font-bold mt-2">
  <span className="right-label">Delete Account</span>
</h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                  This action <strong>cannot be undone</strong>.<br />
                  All your tasks, teams, and data will be permanently deleted.
                </p>

                <div className="bg-black-50 border-2 border-red-300 rounded-3xl p-10 max-w-md mx-auto content-card">
                  <p className="text-red-700 font-bold text-xl">
                    You are about to permanently delete your ClassMate account.
                  </p>
                </div>

                <div className="space-y-5 max-w-sm mx-auto">
                  <button
                    onClick={() => setSection("security")}
                    className="w-full py-5 border-2 border-gray-300 rounded-3xl font-bold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button className="w-full py-5 bg-red-600 text-white rounded-3xl font-bold hover:bg-red-700 transition shadow-lg">
                    Yes, Delete My Account
                  </button>
                </div>
              </div>
            )}

            {/* CHANGE PASSWORD */}
            {section === "changePassword" && (
              <div className="space-y-8 max-w-md mx-auto">
                <h1 className="text-3xl font-bold mt-2">
  <span className="right-label">Change Password</span>
</h1>
                <div className="space-y-4">
                  {/* Current Password */}
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none input-field"
                    />
                    <button
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showCurrent ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {/* New Password */}
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none input-field"
                    />
                    <button
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showNew ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-5 py-4 border rounded-2xl focus:ring-4 outline-none input-field"
                    />
                    <button
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirm ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {passwordError && (
                    <p className="text-red-600 font-medium">{passwordError}</p>
                  )}
                  {passwordSuccess && (
                    <p className="text-green-600 font-medium">{passwordSuccess}</p>
                  )}

                  <button
                    onClick={handleChangePassword}
                    className="w-full py-4 rounded-2xl font-bold hover:bg-amber-700 transition content-button"
                  >
                    Save New Password
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-500 font-bold text-xl">
            ClassMate
          </div>
        </div>
      </div>
    </div>
  );
}
