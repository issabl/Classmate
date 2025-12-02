import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ChangePass({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#1e1e1e]/50 p-4 fixed inset-0 z-50">
      {/* MAIN CONTAINER */}
      <div className="bg-white w-[400px] h-[360px] md:w-[450px] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.15)] p-6 flex flex-col items-center relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 text-xl"
        >
          
        </button>

        {/* STEP 1 - CHANGE PASSWORD CONFIRMATION */}
        {step === 1 && (
          <div className="flex flex-col items-center text-center mt-6">
            <h2 className="text-[20px] font-semibold">Change Password Confirmation</h2>
            <p className="text-[15px] mt-5 px-4">
              For your account’s security, we’ll send a one-time password (OTP) to verify
              your identity before proceeding.
            </p>

            <button
              onClick={() => setStep(2)}
              className="mt-9 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[190px] py-2 rounded-full shadow-md text-sm"
            >
              Get OTP
            </button>

            <div className="absolute bottom-6 flex justify-center w-full">
              <img src="/ClassMate.png" alt="ClassMate Logo" className="h-3 filter blur-[1px]" />
            </div>
          </div>
        )}

        {/* STEP 2 - FORGOT PASSWORD EMAIL INPUT */}
        {step === 2 && (
          <div className="flex flex-col items-center text-center mt-6 w-full">
            <h2 className="text-[20px] font-semibold">Forgot Password ?</h2>
            <p className="text-[15px] mt-5 px-4">
              We’ll send a verification code to help you reset it safely.
            </p>

            <input
              type="email"
              placeholder="Enter Email"
              className="mt-6 w-[85%] bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none"
            />

            <button
              onClick={() => setStep(3)}
              className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm"
            >
              Get OTP
            </button>

            <div className="absolute bottom-6 flex justify-center w-full">
              <img src="/ClassMate.png" alt="ClassMate Logo" className="h-3 filter blur-[1px]" />
            </div>
          </div>
        )}

        {/* STEP 3 - ENTER OTP */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center mt-6 w-full">
            <h2 className="text-[20px] font-semibold">Please enter your OTP Code</h2>
            <p className="text-[15px] mt-5 px-4">
              Enter the 6-digit OTP we sent to your email to confirm your identity.
            </p>

            <div className="mt-5 w-[85%] bg-[#e6e6e6] rounded-xl py-3 flex justify-between px-6 text-xl tracking-widest items-center">
              _ _ _ _ _ _
            </div>

            <button
              onClick={() => setStep(4)}
              className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm"
            >
              Proceed
            </button>

            <div className="absolute bottom-6 flex justify-center w-full">
              <img src="/ClassMate.png" alt="ClassMate Logo" className="h-3 filter blur-[1px]" />
            </div>
          </div>
        )}

        {/* STEP 4 - CREATE NEW PASSWORD */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center mt-5 w-full">
            <h2 className="text-[16px] font-semibold">Create New Password</h2>

            <div className="w-[85%] mt-5">
              <p className="text-[12px] text-left mb-1">New Password</p>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-2.5 cursor-pointer"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>

            <div className="w-[85%] mt-5">
              <p className="text-[12px] text-left mb-1">Confirm Password</p>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-2.5 cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep(5)}
              className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[200px] py-2 rounded-full shadow-md text-sm"
            >
              Update Password
            </button>

            <div className="absolute bottom-6 flex justify-center w-full">
              <img src="/ClassMate.png" alt="ClassMate Logo" className="h-3 filter blur-[1px]" />
            </div>
          </div>
        )}

        {/* STEP 5 — SUCCESS CONFIRMATION */}
        {step === 5 && (
          <div className="flex flex-col items-center text-center mt-2 w-full animate-fadeIn">
            <CheckCircle size={70} className="text-green-500 mb-4" />

            <h2 className="text-[20px] font-semibold">Password Updated</h2>
            <p className="text-[15px] mt-3 px-6">
              Your password has been successfully changed.  
              You can now sign in using your new password.
            </p>

            <button
              onClick={onClose}
              className="mt-8 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm"
            >
              Continue
            </button>

            <div className="absolute bottom-6 flex justify-center w-full">
              <img src="/ClassMate.png" alt="ClassMate Logo" className="h-3 filter blur-[1px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
