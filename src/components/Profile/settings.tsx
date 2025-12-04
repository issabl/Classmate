import React, { useState } from "react";
import { Shield, HelpCircle, UserMinus, ArrowLeft, Eye, EyeOff } from "lucide-react";

interface SettingsProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsProps) {
  const [section, setSection] = useState<"security" | "help" | "delete" | "changePassword" | "forgotPassword">("security");

  // Editable User Info
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

  // Save Name & Email
  const handleSaveInfo = () => {
    if (!fullName.trim()) {
      alert("Full name cannot be empty!");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email!");
      return;
    }
    setIsEditingInfo(false);
    alert("Profile updated successfully!");
  };

  // Change Password
  const handleChangePassword = () => {
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white w-[720px] h-[680px] rounded-[32px] shadow-2xl overflow-hidden relative font-sans">

        {/* Back Button */}
        <button
          onClick={section === "security" ? onClose : () => setSection("security")}
          className="absolute top-7 left-8 flex items-center gap-2 text-gray-700 hover:text-black transition text-sm font-medium z-10"
        >
          <ArrowLeft size={18} />
          {section === "security" ? "Settings" : "Back"}
        </button>

        {/* LEFT SIDEBAR */}
        <div className="absolute left-0 top-0 w-56 h-full bg-gradient-to-b from-amber-50 to-white border-r border-gray-100 pt-24 px-6">
          <div className="space-y-6">
            <button
              onClick={() => setSection("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                section === "security" ? "bg-amber-100 text-amber-900 font-bold" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Shield size={18} /> Account Security
            </button>

            <button
              onClick={() => setSection("help")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                section === "help" ? "bg-amber-100 text-amber-900 font-bold" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HelpCircle size={18} /> Help & Support
            </button>

            <button
              onClick={() => setSection("delete")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                section === "delete" ? "bg-red-100 text-red-700 font-bold" : "text-red-600 hover:bg-red-50"
              }`}
            >
              <UserMinus size={18} /> Delete Account
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="ml-56 h-full flex items-center justify-center px-10 overflow-y-auto">

          {/* ACCOUNT SECURITY */}
          {section === "security" && (
            <div className="w-full max-w-lg space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Account Security</h2>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Personal Information</h3>
                  <button onClick={() => setIsEditingInfo(!isEditingInfo)} className="text-amber-700 underline text-sm">
                    {isEditingInfo ? "Cancel" : "Edit"}
                  </button>
                </div>

                {isEditingInfo ? (
                  <div className="space-y-4">
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500" />
                    <button onClick={handleSaveInfo} className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold hover:bg-amber-700">
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-medium">Full Name:</span> {fullName}</p>
                    <p><span className="font-medium">Email:</span> {email}</p>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Security Settings</h3>
                <button onClick={() => setSection("changePassword")} className="text-amber-700 underline font-medium">
                  Change Password
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Login Activity</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Last login: Nov 11, 2025 3:45 PM</li>
                  <li>• Device: Chrome on Windows</li>
                </ul>
              </div>

              <p className="text-center text-xs text-gray-500">App Version: v1.0.0 (November 2025)</p>
            </div>
          )}

          {/* HELP & SUPPORT */}
          {section === "help" && (
            <div className="w-full max-w-lg space-y-5">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Help & Support</h2>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-3">Getting Started</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Tap + button to create a new task</li>
                  <li>• Join or create teams from Home → Teams</li>
                  <li>• Use Google Sign-In for faster access</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-3">Common Issues</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Tasks not saving? → Check your internet connection</li>
                  <li>• Forgot password? → Use "Forgot password?" on login</li>
                  <li>• App not loading? → Clear browser cache</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                <p className="font-semibold text-amber-900">Need immediate help?</p>
                <p className="text-amber-800 mt-2">support@classmate.app</p>
                <p className="text-xs text-amber-700 mt-1">We reply within 24 hours</p>
              </div>
            </div>
          )}

          {/* DELETE ACCOUNT */}
          {section === "delete" && (
            <div className="w-full max-w-md text-center space-y-8">
              <h2 className="text-3xl font-bold text-red-600">Delete Account</h2>
              <p className="text-gray-700 leading-relaxed">
                This action <span className="font-bold text-red-600">cannot be undone</span>.<br />
                All your tasks, teams, and data will be permanently deleted.
              </p>

              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
                <p className="text-red-800 font-bold text-lg">
                  You are about to permanently delete your ClassMate account.
                </p>
              </div>

              <div className="space-y-4">
                <button onClick={() => setSection("security")} className="w-full py-4 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50">
                  Cancel
                </button>
                <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">
                  Yes, Delete My Account
                </button>
              </div>
            </div>
          )}

          {/* CHANGE PASSWORD */}
          {section === "changePassword" && (
            <div className="w-full max-w-md space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Change Password</h2>

              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-amber-500" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-10 text-gray-500">
                    {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-amber-500" />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-10 text-gray-500">
                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-amber-500" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-10 text-gray-500">
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {passwordError && <p className="text-red-600 text-center font-medium">{passwordError}</p>}
                {passwordSuccess && <p className="text-green-600 text-center font-bold">{passwordSuccess}</p>}

                <button onClick={handleChangePassword} className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-700 text-lg">
                  Save New Password
                </button>

                <button onClick={() => setSection("forgotPassword")} className="text-amber-700 underline text-center w-full text-sm">
                  Forgot password?
                </button>
              </div>
            </div>
          )}

          {/* FORGOT PASSWORD */}
          {section === "forgotPassword" && (
            <div className="w-full max-w-md text-center space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Reset Your Password</h2>
              <p className="text-gray-600">We’ll send a 6-digit code to your email</p>

              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {email.charAt(0).toUpperCase()}
                </div>
                <p className="font-bold text-lg">{email}</p>
                <p className="text-sm text-gray-600 mt-1">Send code via email</p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-700">
                  Send Code
                </button>
                <button onClick={() => setSection("security")} className="w-full border border-gray-300 py-4 rounded-xl font-medium hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-amber-700 font-bold text-sm">
          ClassMate
        </div>
      </div>
    </div>
  );
}