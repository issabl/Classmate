// src/pages/SignIn.tsx
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate({ to: "/home" });
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left - Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <img src="/ClassMate.png" alt="Logo" className="h-12 mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-center mb-2">Welcome Back!</h2>
          <p className="text-gray-600 text-center mb-10">Sign in to continue organizing your studies</p>

          <div className="space-y-6">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />

            {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center">{error}</div>}

            <button onClick={handleLogin} disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-bold rounded-xl hover:shadow-xl transition disabled:opacity-70">
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <button onClick={() => navigate({ to: "/signup" })} className="text-amber-700 font-bold hover:underline">
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Right - Image */}
        <div className="w-1/2 bg-gradient-to-br from-amber-700 to-amber-900 relative overflow-hidden">
          <img src="/intro.png" alt="Study" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute bottom-10 left-10 text-white">
            <h3 className="text-4xl font-bold mb-4">Organize. Focus. Succeed.</h3>
            <p className="text-lg opacity-90">Your all-in-one student productivity app</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;