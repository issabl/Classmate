import React, { useState } from "react";
import { Bell, ClipboardList, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "@tanstack/react-router";
import ChangePass from "./changepass";

const SignIn: React.FC = () => {
  const [showChangePass, setShowChangePass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // NEW
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Login failed.");
        setIsLoading(false);
        return;
      }

      // Success → redirect to /home
      navigate({ to: "/home" });
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to connect to server. Is backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex overflow-hidden">
      {/* LEFT SIDE — FORM */}
      <div className="w-1/2 h-full flex flex-col justify-center px-24">
        <img
          src="/ClassMate.png"
          alt="ClassMate Logo"
          className="w-[180px] mb-12 mx-auto -ml-10"
          draggable="false"
        />

        <h2 className="text-4xl font-bold text-black mb-1 text-center">Welcome</h2>
        <p className="text-gray-500 mb-10 text-sm text-center">Never miss a deadline again</p>

        {/* Inputs */}
        <div className="space-y-6 w-[541px] mx-auto">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // toggle type
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-3 mb-6 w-[541px] mx-auto">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-yellow-600" />
            Remember me
          </label>

          <button className="hover:underline" onClick={() => setShowChangePass(true)}>
            Forgot password?
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="py-3 px-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium mb-4 w-[541px] mx-auto">
            {errorMessage}
          </div>
        )}

        {/* Sign In Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-[541px] py-3 bg-gradient-to-b from-[#D8A75B] to-[#5D3900] text-white rounded-xl text-center font-medium mx-auto flex justify-center items-center gap-3"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Sign in"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-6 text-gray-500 w-[541px] mx-auto">
          <div className="grow border-t" />
          <span className="text-sm">or</span>
          <div className="grow border-t" />
        </div>

        {/* Google Sign In */}
        <button className="w-[541px] border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 text-sm hover:bg-gray-50 transition mx-auto">
          <img
            src="https://logo.svgcdn.com/logos/google-icon.png"
            className="w-5 h-5"
            alt="Google logo"
          />
          Sign In with Google
        </button>

        {/* Sign Up */}
        <p className="text-sm text-center mt-8 text-gray-600 w-[541px] mx-auto">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#A06A28] hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* RIGHT SIDE — IMAGE */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <img
          src="/intro.png"
          alt="ClassMate intro visual"
          className="absolute top-1/2 ml-45 transform -translate-y-1/2 translate-x-0 max-h-full max-w-full object-contain"
          draggable="false"
        />

        <div className="absolute bottom-12 right-36 text-white max-w-sm drop-shadow-lg text-center">
          <h3 className="text-2xl font-extrabold leading-snug">
            Stay on Top of Your <br />
            Studies with{" "}
            <img
              src="/ClassMate.png"
              alt="ClassMate Logo"
              className="inline-block w-[145px] ml-2 align-baseline"
              draggable="false"
            />
          </h3>

          <p className="text-sm opacity-90 mt-2 leading-relaxed">
            ClassMate helps students organize tasks, manage deadlines, and never miss a class.
            Designed for productivity and built for student life.
          </p>

          <div className="flex gap-2 mt-4 ml-5">
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 text-xs rounded-lg backdrop-blur-sm">
              <Bell size={14} /> Task Reminder
            </span>

            <span className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 text-xs rounded-lg backdrop-blur-sm">
              <ClipboardList size={14} /> Task & Assignment Tracking
            </span>
          </div>
        </div>

        {/* MODAL */}
        {showChangePass && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ChangePass onClose={() => setShowChangePass(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
