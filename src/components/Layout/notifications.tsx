import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Notification {
  taskId: number;
  type: string; // "assigned", "upcoming", "due_soon"
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  days_left?: number;
  is_new: number; // 1 = new, 0 = read
}

interface NotificationPageProps {
  onClose: () => void;
  liveNotification?: Notification;
}

const NotificationPage = ({ onClose, liveNotification }: NotificationPageProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // replace with actual logged-in user ID

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/notifications/${userId}`);
      const data: Notification[] = await res.json();

      const now = new Date();
      const updated = data.map((task, index) => {
        const start = new Date(task.start_datetime);
        const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return { ...task, days_left: diff < 0 ? 0 : diff, _uid: `${task.taskId}-${task.type}-${index}` };
      });

      setNotifications(updated);
    } catch (err) {
      console.error("Fetch notifications error:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    try {
      await fetch(`http://localhost:3000/api/notifications/read/${userId}`, { method: "POST" });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_new: 0 })));
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    markAsRead();
    const interval = setInterval(fetchNotifications, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (liveNotification) {
      setNotifications((prev) => [
        { ...liveNotification, _uid: `${liveNotification.taskId}-${liveNotification.type}-${Date.now()}` },
        ...prev,
      ]);
    }
  }, [liveNotification]);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        onClick={onClose}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="notification-modal w-[300px] h-[550px] rounded-3xl p-4 flex flex-col shadow-xl font-[SP_Pro] relative pointer-events-auto border"
          style={{
            backgroundColor: "var(--notification-bg)",
            borderColor: "var(--notification-border)",
            color: "var(--notification-text)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={16} style={{ color: "var(--notification-text)" }} />
          </button>

          <h1 className="text-[14px] font-bold text-center mb-3">
            Upcoming Activities
          </h1>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {loading && <p className="text-[9px] text-center">Loading...</p>}

            {!loading && notifications.length === 0 && (
              <p className="text-[9px] text-center">No upcoming activities</p>
            )}

            {!loading &&
              notifications.map((task) => (
                <div
                  key={task.id}
                  className="w-full border shadow-sm rounded-xl p-3 relative"
                  style={{
                    backgroundColor: "var(--notification-item-bg)",
                    borderColor: "var(--notification-border)",
                    color: "var(--notification-item-text)",
                  }}
                >
                  {task.is_new === 1 && (
                    <span
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"
                      title="New"
                    ></span>
                  )}

                  <div className="flex justify-between">
                    <p className="font-bold text-[10px]">
                      {task.days_left === 0 ? "Today" : `${task.days_left} day(s) left`}
                    </p>
                    <p className="text-[9px]">
                      {new Date(task.start_datetime).toLocaleString()}
                    </p>
                  </div>

                  <p className="text-[11px] font-semibold mt-1">{task.title}</p>
                  <p className="text-[9px] mt-1 opacity-80">
                    {task.description || "No description"}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
