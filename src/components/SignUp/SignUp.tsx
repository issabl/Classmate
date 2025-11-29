import { Bell, ClipboardList } from "lucide-react";

const SignUp = () => {
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
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>
        </div>

        <button className="w-[541px] py-3 rounded-xl font-medium text-white bg-linear-to-b from-[#D8A75B] to-[#5D3900] shadow-md hover:opacity-95 transition mx-auto mt-8">
          Sign up
        </button>

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
