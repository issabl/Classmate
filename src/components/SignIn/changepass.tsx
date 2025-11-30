import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

const API_URL = "http://localhost:5000";

export default function ChangePass({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  // States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Request OTP
  const requestOTP = async () => {
    if (!email) return alert("Please enter your email");

    try {
      const res = await fetch(`${API_URL}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP sent successfully!");
        setStep(3); // go to OTP input
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setStep(4); // go to reset password
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to verify OTP");
    }
  };

  // Reset Password
  const resetPassword = async () => {
    if (!newPass || !confirmPass) return alert("Enter all fields");
    if (newPass !== confirmPass) return alert("Passwords do not match");

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: newPass }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(5); // success
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reset password");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#1e1e1e]/50 p-4 fixed inset-0 z-50">
      <div className="bg-white w-[400px] h-[360px] md:w-[450px] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.15)] p-6 flex flex-col items-center relative">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-6 text-gray-600 text-xl">×</button>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col items-center text-center mt-6">
            <h2 className="text-[20px] font-semibold">Change Password</h2>
            <p className="text-[15px] mt-5 px-4">For your account’s security, we’ll send an OTP to verify your identity.</p>
            <button onClick={() => setStep(2)} className="mt-9 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[190px] py-2 rounded-full shadow-md text-sm">Next</button>
          </div>
        )}

        {/* STEP 2 - Email Input */}
        {step === 2 && (
          <div className="flex flex-col items-center text-center mt-6 w-full">
            <h2 className="text-[20px] font-semibold">Forgot Password ?</h2>
            <p className="text-[15px] mt-5 px-4">Enter your email to receive a verification code.</p>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-6 w-[85%] bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none"
            />
            <button onClick={requestOTP} className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm">Get OTP</button>
          </div>
        )}

        {/* STEP 3 - OTP Input */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center mt-6 w-full">
            <h2 className="text-[20px] font-semibold">Enter OTP</h2>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-5 w-[85%] bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none text-center"
            />
            <button onClick={verifyOTP} className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm">Verify OTP</button>
          </div>
        )}

        {/* STEP 4 - Reset Password */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center mt-5 w-full">
            <h2 className="text-[16px] font-semibold">Create New Password</h2>

            <div className="w-[85%] mt-5 relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none"
              />
              <span onClick={() => setShowPass(!showPass)} className="absolute right-4 top-2.5 cursor-pointer">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>

            <div className="w-[85%] mt-5 relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full bg-[#e6e6e6] rounded-full px-4 py-2 text-[13px] outline-none"
              />
              <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-2.5 cursor-pointer">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>

            <button onClick={resetPassword} className="mt-6 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[200px] py-2 rounded-full shadow-md text-sm">Update Password</button>
          </div>
        )}

        {/* STEP 5 - Success */}
        {step === 5 && (
          <div className="flex flex-col items-center text-center mt-2 w-full animate-fadeIn">
            <CheckCircle size={70} className="text-green-500 mb-4" />
            <h2 className="text-[20px] font-semibold">Password Updated</h2>
            <p className="text-[15px] mt-3 px-6">Your password has been successfully changed. You can now sign in with your new password.</p>
            <button onClick={onClose} className="mt-8 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white w-[180px] py-2 rounded-full shadow-md text-sm">Continue</button>
          </div>
        )}

      </div>
    </div>
  );
}
