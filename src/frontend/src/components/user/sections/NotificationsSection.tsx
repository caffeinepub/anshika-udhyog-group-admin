import { Bell } from "lucide-react";
import { motion } from "motion/react";

const MOCK_NOTIFICATIONS = [
  {
    emoji: "🎉",
    title: "Welcome to Anshika Udhyog Group!",
    body: "Your account has been created. Start exploring your dashboard.",
    time: "Just now",
    read: false,
  },
  {
    emoji: "💰",
    title: "Wallet Credited",
    body: "\u20b9500 has been added to your wallet as welcome bonus.",
    time: "2 hours ago",
    read: false,
  },
  {
    emoji: "🔔",
    title: "KYC Reminder",
    body: "Please complete your KYC verification to unlock all features.",
    time: "1 day ago",
    read: true,
  },
];

export function NotificationsSection() {
  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl relative"
          style={{ background: "rgba(245,158,11,0.1)" }}
        >
          <Bell className="h-6 w-6" style={{ color: "#F59E0B" }} />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: "#EF4444", color: "#fff" }}
          >
            2
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Notifications 🔔
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your latest alerts and updates
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <motion.div
            key={notif.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4 flex items-start gap-3"
            style={{
              background: notif.read ? "#F9FAFB" : "#fff",
              boxShadow: notif.read ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
              border: notif.read ? "1px solid #F3F4F6" : "none",
            }}
          >
            <span className="text-2xl flex-shrink-0">{notif.emoji}</span>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#111827" }}
                >
                  {notif.title}
                </p>
                {!notif.read && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 animate-pulse"
                    style={{ background: "#3B82F6" }}
                  />
                )}
              </div>
              <p
                className="text-xs mt-0.5 leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {notif.body}
              </p>
              <p className="text-[10px] mt-1" style={{ color: "#9CA3AF" }}>
                {notif.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
