import React, { useState } from "react";
import { Shield, HelpCircle, UserMinus, ArrowLeft } from "lucide-react";

interface SettingsProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsProps) {

  const [section, setSection] = useState("security");

  return (
   <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6">
  <div className="bg-white w-[640px] h-[650px] rounded-[30px] shadow-[0px_8px_30px_rgba(0,0,0,0.15)] overflow-hidden relative font-[SP_Pro] p-6 flex text-[11px]">

        {/* Back */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 flex items-center gap-1 text-gray-700 text-[15px]"
        >
          <ArrowLeft className="w-3 h-3" /> Settings
        </button>

        {/* LEFT SIDE TABS */}
        <div className="w-[180px] h-full flex flex-col gap-6 mt-20 ml-2 text-[14px]">
          <button
            onClick={() => setSection("security")}
            className={`flex items-center gap-2 ${
              section === "security" ? "font-semibold" : "text-gray-500" 
            }`}
          >
            <Shield className="w-3 h-3" /> Account Security
          </button>

          <button
            onClick={() => setSection("help")}
            className={`flex items-center gap-2 ${
              section === "help" ? "font-semibold" : "text-gray-500"
            }`}
          >
            <HelpCircle className="w-3 h-3" /> Help & Support
          </button>

          <button
            onClick={() => setSection("delete")}
            className={`flex items-center gap-2 ${
              section === "delete" ? "font-semibold" : "text-gray-500"
            }`}
          >
            <UserMinus className="w-3 h-3" /> Delete Account
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 h-full flex items-center justify-center pr-2">
          <div className="w-[400px] h-[500px] bg-[#F8F8F8] rounded-xl shadow-inner p-6 overflow-hidden text-[13px]">

            {section === "security" && (
              <div>
                <h2 className="text-base font-semibold mb-6">Account Security</h2>

                <h3 className="font-medium">Personal Information</h3>
                <div className="mt-1 leading-4">
                  <p>Full Name: Princess A. Petancio</p>
                  <p>Email: princess.a.petancio@gmail.com</p>
                </div>
                <button className="underline mt-1">Change Name or Update Email</button>

                <h3 className="font-medium mt-4">Security Settings</h3>
                <button className="underline mt-1">Change Password</button>

                <h3 className="font-medium mt-4">Login Activity</h3>
                <ul className="mt-1 list-disc ml-4 leading-4">
                  <li>Last login: Nov 11, 2025 3:45 PM</li>
                  <li>Device: Chrome on Windows</li>
                </ul>

                <h3 className="font-medium mt-4">App Version</h3>
                <p className="mt-1">v1.0.0 (November 2025)</p>
              </div>
            )}

            {section === "help" && (
              <div>
                <h2 className="text-base font-semibold mb-4">Help & Support</h2>

                <h3 className="font-medium">1. Getting Started</h3>
                <ul className="mt-1 ml-4 list-disc leading-4">
                  <li>Tap + Add Task to create a task</li>
                  <li>Go to Home → Teams to join one</li>
                  <li>Use Google Sign In on login page</li>
                </ul>

                <h3 className="font-medium mt-4">2. Common Issues</h3>
                <ul className="mt-1 ml-4 list-disc leading-4">
                  <li>Forgot password? → Click "Forgot password?"</li>
                  <li>Dark mode not working? → Toggle in Settings</li>
                  <li>Tasks not saving? → Check internet & refresh app</li>
                </ul>

                <h3 className="font-medium mt-4">3. Contact Us</h3>
                <p className="mt-1 leading-4">Email: support@classmate.com</p>
                <p>Response within 24 hours</p>

                <h3 className="font-medium mt-4">4. App Version</h3>
                <p className="mt-1">v1.0.0</p>
              </div>
            )}

            {section === "delete" && (
              <div>
                <h2 className="text-base font-semibold mb-2">
                  Deleting your account is irreversible.
                </h2>
                <p className="text-red-500 mb-4">This action cannot be undone.</p>

                <button className="w-full py-1.5 bg-gray-200 rounded-lg mb-2">
                  Cancel
                </button>
                <button className="w-full py-1.5 bg-[#A97942] text-white rounded-lg">
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-[#A97942] font-semibold">
          ClassMate
        </div>
      </div>
    </div>
  );
}
