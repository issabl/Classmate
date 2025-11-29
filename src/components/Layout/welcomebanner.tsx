const WelcomeBanner = ({ width = 730, height = 130 }: { width?: number; height?: number }) => {
  return (
    <div
      className="relative z-40"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        marginLeft: "30px",
        marginTop: "10px",
      }}
    >
      <div className="relative rounded-2xl overflow-hidden w-full h-full">
        {/* Background Image */}
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/banner.png')" }}
        ></div>

        {/* Inner shadow overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.25)",
          }}
        ></div>

        {/* Content */}
        <div className="absolute inset-0 px-6 py-4 flex items-center rounded-2xl">
          <div>
            <h2 className="text-[22px] font-bold text-white font-[Montserrat]">
              Welcome back, Princess!
            </h2>
            <p className="text-xs text-white mt-1 leading-relaxed">
              You’ve completed 3 out of 5 tasks today.<br />
              Stay focused—you’re almost there!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
