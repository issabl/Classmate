// src/pages/SignUp.tsx
import { useState } from "react";
import { Bell, ClipboardList, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const SignUp = () => {
  const navigate = useNavigate();

  // States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error states
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validators
  const validateFullName = (name: string) => {
    if (!name.trim()) return "Full name is required.";
    const re = /^[A-Za-z\s]+$/;
    return re.test(name)
      ? ""
      : "Full name must contain only letters and spaces.";
  };

  const validateEmail = (em: string) => {
    if (!em.trim()) return "Email is required.";
    const re = /^\S+@\S+\.\S+$/;
    return re.test(em) ? "" : "Invalid email format.";
  };

  const validatePassword = (pw: string) => {
    if (!pw) return "Password is required.";
    if (pw.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  // Handle sign up
  const handleSignUp = async () => {
    setServerError("");
    setSuccessMessage("");

    const fnErr = validateFullName(fullName);
    const emErr = validateEmail(email);
    const pwErr = validatePassword(password);

    setFullNameError(fnErr);
    setEmailError(emErr);
    setPasswordError(pwErr);

    if (fnErr || emErr || pwErr) return;

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        console.warn("Invalid JSON from backend:", text);
      }

      if (res.ok) {
        setSuccessMessage("Account created successfully!");

        // Redirect after 1.2 seconds
        setTimeout(() => {
          navigate({ to: "/" });
        }, 1200);
      } else {
        setServerError(
          data.error || data.message || `Server error: ${res.status}`
        );
      }
    } catch (err: any) {
      console.error("Network error:", err);
      setServerError("Failed to connect. Is backend running on port 3000?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT — HERO */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <img
          src="/intro.png"
          alt="intro"
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[-100px] max-h-full object-contain ml-[-200px]"
          draggable="false"
        />
        <div className="absolute bottom-12 right-60 text-white max-w-sm drop-shadow-lg text-center">
          <h3 className="text-2xl font-extrabold leading-snug">
            Stay on Top of Your <br /> Studies with{" "}
            <img
              src="/ClassMate.png"
              alt="Logo"
              className="inline-block w-[145px] ml-2 align-baseline"
            />
          </h3>
          <p className="text-sm opacity-90 mt-2 leading-relaxed">
            ClassMate helps students organize tasks, manage deadlines, and never
            miss a class.
          </p>
          <div className="flex gap-2 mt-4 justify-center">
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 text-xs rounded-lg backdrop-blur-sm">
              <Bell size={14} /> Task Reminder
            </span>
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 text-xs rounded-lg backdrop-blur-sm">
              <ClipboardList size={14} /> Task & Assignment Tracking
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — FORM */}
      <div className="w-1/2 h-full flex flex-col justify-center px-24 bg-gray-50">
        <img src="/ClassMate.png" alt="Logo" className="w-48 mx-auto mb-8" />

        <h2 className="text-4xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-gray-600 text-center mb-8">
          Start organizing your student life
        </p>

        <div className="space-y-6 w-full max-w-lg mx-auto">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFullNameError(validateFullName(e.target.value));
              }}
              className={`w-full px-4 py-3 rounded-xl border ${
                fullNameError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              disabled={isLoading}
            />
            {fullNameError && (
              <p className="mt-1 text-sm text-red-600">{fullNameError}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="juan@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(validateEmail(e.target.value));
              }}
              className={`w-full px-4 py-3 rounded-xl border ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              disabled={isLoading}
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
                className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          {/* Success / Error Messages */}
          {successMessage && (
            <div className="flex items-center justify-center gap-3 py-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
              <CheckCircle size={28} />
              <p className="font-bold">{successMessage}</p>
            </div>
          )}

          {serverError && (
            <div className="py-3 px-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium">
              {serverError}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-b from-[#D8A75B] to-[#8B4513] hover:from-[#e0b36b] hover:to-[#a0522d] transition shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>

        <div className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate({ to: "/" })}
            className="font-bold text-amber-700 hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
