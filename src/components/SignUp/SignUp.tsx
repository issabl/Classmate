import { Bell, ClipboardList } from "lucide-react";

const SignUp = () => {
<<<<<<< Updated upstream
=======
  // state for inputs + UI
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // error messages
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  
  // SUCCESS MESSAGE (NEW)
  const [successMessage, setSuccessMessage] = useState("");

  // validators
  const validateFullName = (name: string) => {
    if (!name.trim()) return "Full name is required.";
    const re = /^[A-Za-z\s]+$/;
    return re.test(name) ? "" : "Full name must contain only letters and spaces.";
  };

  const validateEmail = (em: string) => {
    if (!em.trim()) return "Email is required.";
    const re = /^\S+@\S+\.\S+$/;
    return re.test(em) ? "" : "Please enter a valid email address (example@mail.com).";
  };

  const validatePassword = (pw: string) => {
    if (!pw) return "Password is required.";
    if (pw.length < 6) return "Password should be at least 6 characters.";
    return "";
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setFullNameError(validateFullName(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  // UPDATED handleSignUp — NO ALERT ANYMORE
  const handleSignUp = async () => {
    setServerError("");
    setSuccessMessage(""); // clear previous success

    const fnErr = validateFullName(fullName);
    const emErr = validateEmail(email);
    const pwErr = validatePassword(password);

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

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        // SHOW SUCCESS MESSAGE BELOW PASSWORD
        setSuccessMessage("Account created successfully!");
        
        // Auto redirect after user sees the message
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1800);
      } else {
        setServerError(data.message || "Something went wrong on the server.");
      }
    } catch (err) {
      setServerError("Server error — is the backend running?");
      console.error(err);
    }
  };

>>>>>>> Stashed changes
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

      {/* RIGHT SIDE — SIGN UP FORM */}
      <div className="w-1/2 h-full flex flex-col justify-center px-24">
        <img
          src="/ClassMate.png"
          alt="ClassMate Logo"
          className="w-[180px] mb-10 mx-auto mr-6"
          draggable="false"
        />

        <h2 className="text-3xl font-bold text-black mb-2 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 mb-7 text-sm text-center">
          Start organizing your student life
        </p>

        {/* INPUTS */}
        <div className="space-y-6 w-[541px] mx-auto">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
<<<<<<< Updated upstream
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
=======

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash text-gray-500"></i>
                ) : (
                  <i className="fa-solid fa-eye text-gray-500"></i>
                )}
              </button>
            </div>

            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}

            {/* SUCCESS MESSAGE HERE — BELOW PASSWORD */}
            {successMessage && (
              <p className="mt-4 text-center text-green-600 font-semibold text-lg">
                {successMessage}
              </p>
            )}
>>>>>>> Stashed changes
          </div>
        </div>

        <button className="w-[541px] py-3 rounded-xl font-medium text-white bg-linear-to-b from-[#D8A75B] to-[#5D3900] shadow-md hover:opacity-95 transition mx-auto mt-8">
          Sign up
        </button>

<<<<<<< Updated upstream
=======
        {/* server error */}
        {serverError && (
          <p className="w-[541px] mx-auto mt-3 text-sm text-red-600 text-center">
            {serverError}
          </p>
        )}

>>>>>>> Stashed changes
        <div className="flex items-center justify-center gap-3 my-6 text-gray-500 w-[541px] mx-auto">
          <div className="grow border-t" />
          <span className="text-sm">or</span>
          <div className="grow border-t" />
        </div>

        <button className="w-[541px] border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 text-sm hover:bg-gray-50 transition mx-auto">
          <img
            src="https://logo.svgcdn.com/logos/google-icon.png"
            className="w-5 h-5"
            alt="Google logo"
          />
          Sign Up with Google
        </button>


       <p className="text-sm text-center mt-8 text-gray-600 w-[541px] mx-auto">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-semibold text-[#A06A28] hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;