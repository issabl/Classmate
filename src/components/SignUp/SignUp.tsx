import { useState } from "react";
import { Bell, ClipboardList } from "lucide-react";

const SignUp = () => {
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

  // Validators
  const validateFullName = (name: string) => {
    if (!name.trim()) return "Full name is required.";
    const re = /^[A-Za-z\s]+$/;
    return re.test(name) ? "" : "Full name must contain only letters and spaces.";
  };

  const validateEmail = (em: string) => {
    if (!em.trim()) return "Email is required.";
    const re = /^\S+@\S+\.\S+$/;
    return re.test(em) ? "" : "Please enter a valid email (e.g., user@example.com).";
  };

  const validatePassword = (pw: string) => {
    if (!pw) return "Password is required.";
    if (pw.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  // Handlers
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    setFullNameError(validateFullName(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSignUp = async () => {
    // Reset messages
    setServerError("");
    setSuccessMessage("");

    // Validate all
    const fnErr = validateFullName(fullName);
    const emErr = validateEmail(email);
    const pwErr = validatePasswordError(password);

    setFullNameError(fnErr);
    setEmailError(emErr);
    setPasswordError(pwErr);

    if (fnErr || emErr || pwErr) return;

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        setServerError(data.message || data.error || "Signup failed. Try again.");
      }
    } catch (err) {
      setServerError("Cannot connect to server. Is the backend running on port 5000?");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT SIDE — INTRO IMAGE */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <img
          src="/intro.png"
          alt="ClassMate intro visual"
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[-100px] max-h-full max-w-full object-contain ml-[-200px]"
          draggable="false"
        />

        <div className="absolute bottom-12 right-60 text-white max-w-sm drop-shadow-lg text-center">
          <h3 className="text-2xl font-extrabold leading-snug">
            Stay on Top of Your <br /> Studies with{" "}
            <img
              src="/ClassMate.png"
              alt="ClassMate Logo"
              className="inline-block w-[145px] ml-2 align-baseline"
              draggable="false"
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

      {/* RIGHT SIDE — FORM */}
      <div className="w-1/2 h-full flex flex-col justify-center px-24 bg-gray-50">
        <img src="/ClassMate.png" alt="Logo" className="w-48 mx-auto mb-8" />

        <h2 className="text-4xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-gray-600 text-center mb-8">Start organizing your student life</p>

        <div className="space-y-6 w-full max-w-lg mx-auto">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              value={fullName}
              onChange={handleFullNameChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                fullNameError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            />
            {fullNameError && <p className="mt-1 text-sm text-red-600">{fullNameError}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="juan@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            />
            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="text-center py-3 bg-green-100 text-green-700 rounded-lg font-medium">
              {successMessage}
            </div>
          )}

          {/* Server Error */}
          {serverError && (
            <div className="text-center py-3 bg-red-100 text-red-700 rounded-lg">
              {serverError}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSignUp}
            className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-b from-[#D8A75B] to-[#8B4513] hover:from-[#c89a50] hover:to-[#7a3a10] transition shadow-lg"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="font-bold text-amber-700 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;