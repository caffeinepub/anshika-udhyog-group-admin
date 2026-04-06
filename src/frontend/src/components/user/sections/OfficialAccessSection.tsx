import type { User } from "@/backend";
import { KeyRound } from "lucide-react";
import { motion } from "motion/react";

interface AccessItem {
  label: string;
  value: string;
  icon: string;
}

export function OfficialAccessSection({ user }: { user: User }) {
  const accessItems: AccessItem[] = [
    { label: "User ID", value: user.id.slice(0, 16).toUpperCase(), icon: "📌" },
    { label: "Username", value: user.username, icon: "👤" },
    { label: "Role", value: user.role.toUpperCase(), icon: "🎖️" },
    {
      label: "Member Since",
      value: new Date(Number(user.createdAt) / 1_000_000).toLocaleDateString(
        "en-IN",
      ),
      icon: "📅",
    },
    {
      label: "Status",
      value: user.isActive ? "Active" : "Inactive",
      icon: "✅",
    },
  ];

  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(245,158,11,0.1)" }}
        >
          <KeyRound className="h-6 w-6" style={{ color: "#F59E0B" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Official Access 🔑
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your credentials & access details
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ background: "linear-gradient(135deg, #142D4A, #1e3d5c)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#C7A24A" }}>
            Access Credentials
          </p>
        </div>
        <div className="p-5 space-y-4">
          {accessItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: "#F9FAFB" }}
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#6B7280" }}
                >
                  {item.label}
                </span>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "#142D4A" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
