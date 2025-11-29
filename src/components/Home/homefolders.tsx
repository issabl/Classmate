import { Pencil, CalendarCheck, Share2 } from "lucide-react";

export default function HomeFolders() {
  const tasks = [
    {
      title: "Digital Poster",
      subject: "Digital Technologies",
      time: "10:30 AM – 11:30 AM",
      due: "Thursday",
      bg: "/4.png",
      // Custom positions for this task
      titlePosition: { top: "29px", left: "22px" },
      subjectPosition: { top: "45px", left: "22px" },
      timePosition: { bottom: "78px", left: "22px" },
      duePosition: { top: "30px", right: "14px" },
    },
    {
      title: "Digital Poster",
      subject: "Digital Technologies",
      time: "10:30 AM – 11:30 AM",
      due: "Thursday",
      bg: "/3.png",
      // Default positions will be used
    },
    {
      title: "Team Presentation",
      subject: "Rizal’s life",
      time: "10:30 AM – 11:30 AM",
      due: "Wednesday",
      bg: "/2.png",
    },
    {
      title: "System Integration",
      subject: "Odoo task",
      time: "10:30 AM – 11:30 AM",
      due: "Tuesday",
      hasAvatars: true,
      bg: "/1.png",
    },
  ];

  // Customize card size, position, and spacing
  const cardWidth = "316px";
  const cardHeight = "155px";
  const stackTop = "330px";
  const stackLeft = "1090px";
  const cardSpacing = "-90px"; // negative margin for overlap

  // Default overlay positions if not specified in the task
  const overlayPositions = {
    title: { top: "44px", left: "22px" },
    subject: { top: "60px", left: "22px" },
    time: { bottom: "60px", left: "22px" },
    icons: { bottom: "20px", right: "220px" },
    due: { top: "12px", right: "16px" },
  };

  return (
    <div
      className="absolute"
      style={{
        top: stackTop,
        left: stackLeft,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {tasks.map((task, i) => (
        <div
          key={i}
          className="relative rounded-xl"
          style={{
            width: cardWidth,
            height: cardHeight,
            backgroundImage: `url(${task.bg})`,
            backgroundSize: "contain", // ensures full image is visible
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            marginTop: i === 0 ? "0px" : cardSpacing,
          }}
        >
          {/* Due date */}
          <div
            className="absolute text-[11px] font-bold text-gray-800"
            style={task.duePosition || overlayPositions.due}
          >
            Due {task.due}
          </div>

          {/* Title */}
          <h2
            className="absolute text-[16px] font-sm text-gray-900 leading-none"
            style={task.titlePosition || overlayPositions.title}
          >
            {task.title}
          </h2>

          {/* Subject */}
          <p
            className="absolute text-[11px] text-gray-800"
            style={task.subjectPosition || overlayPositions.subject}
          >
            {task.subject}
          </p>

          {/* Time */}
          <p
            className="absolute text-[11px] font-semibold text-gray-900"
            style={task.timePosition || overlayPositions.time}
          >
            {task.time}
          </p>

          {/* Icons / Avatars */}
          <div
            className="absolute flex items-center gap-2"
            style={overlayPositions.icons}
          >
            {task.hasAvatars ? (
              <>
                <img
                  src="https://i.pravatar.cc/28?img=1"
                  className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                />
                <img
                  src="https://i.pravatar.cc/28?img=2"
                  className="w-7 h-7 rounded-full border-2 border-white shadow-sm -ml-3"
                />
                <Share2 size={15} className="text-gray-900" />
              </>
            ) : (
              <>
                <Pencil size={15} className="text-gray-900" />
                <CalendarCheck size={15} className="text-gray-900" />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
