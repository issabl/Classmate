import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ChangePass({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  // Backend-related states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtpToken, setServerOtpToken] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Password visibility
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const API_URL = "http://localhost:3000/api/auth"; // updated port

  // -----------------------------
  // SEND OTP
  // -----------------------------
  const handleSendOTP = async () => {
    if (!email) return alert("Please enter your email");
    try {
      const res = await fetch(`${API_URL}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("OTP sent to your email!");
        setStep(3); // move to enter OTP step
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Could not send OTP.");
    }
  };

  // -----------------------------
  // VERIFY OTP
  // -----------------------------
  const handleVerifyOTP = async () => {
    if (!otp) return alert("Enter OTP");
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        setServerOtpToken(data.token);
        setStep(4); // move to reset password step
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Could not verify OTP.");
    }
  };

  // -----------------------------
  // RESET PASSWORD
  // -----------------------------
  const handleResetPassword = async () => {
    if (!newPass || !confirmPass) return alert("Complete all fields");
    if (newPass !== confirmPass) return alert("Passwords do not match");

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: serverOtpToken,
          newPassword: newPass,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Password updated successfully!");
        setStep(5); // success
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Could not reset password.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#1e1e1e]/50 p-4 fixed inset-0 z-50">
      <div className="bg-white w-[400px] h-[360px] md:w-[450px] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.15)] p-6 flex flex-col items-center relative">
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-4 right-6 text-gray-600 text-xl">
          ×
        </button>

        {/* STEP 1 */}
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

        {/* STEP 2 - ENTER EMAIL */}
        {step === 2 && (
          <div className="flex flex-col items-center text-center mt-6 w-full">
            <h2 className="text-[20px] font-semibold">Forgot Password ?</h2>
            <p className="text-[15px] mt-5 px-4">
              We’ll send a verification code to help you reset it safely.
            </p>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-6 w-[85%] bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none"
            />
            <button
              onClick={handleSendOTP}
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
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-6 w-[85%] bg-[#e6e6e6] rounded-full px-4 py-2 text-[16px] outline-none tracking-[0.4em] text-center"
            />
            <button
              onClick={handleVerifyOTP}
              className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm"
            >
              Proceed
            </button>
          </div>
        )}

        {/* STEP 4 - RESET PASSWORD */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center mt-5 w-full">
            <h2 className="text-[16px] font-semibold">Create New Password</h2>
            <div className="w-[85%] mt-5">
              <p className="text-[12px] text-left mb-1">New Password</p>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
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
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
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
              onClick={handleResetPassword}
              className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[200px] py-2 rounded-full shadow-md text-sm"
            >
              Update Password
            </button>
          </div>
        )}

        {/* STEP 5 - SUCCESS */}
        {step === 5 && (
          <div className="flex flex-col items-center text-center mt-2 w-full animate-fadeIn">
            <CheckCircle size={70} className="text-green-500 mb-4" />
            <h2 className="text-[20px] font-semibold">Password Updated</h2>
            <p className="text-[15px] mt-3 px-6">
              Your password has been successfully changed.
            </p>
            <button
              onClick={onClose}
              className="mt-8 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}