import type { User } from "@/backend";
import {
  Bell,
  Building2,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import type { UserSection } from "../UserNav";

interface HomeSectionProps {
  user: User;
  onNavigate: (section: UserSection) => void;
}

const QUICK_ACTIONS = [
  {
    key: "loan" as UserSection,
    label: "Loan Apply",
    icon: <CreditCard className="h-6 w-6" />,
    emoji: "💳",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    key: "franchise" as UserSection,
    label: "Franchise",
    icon: <Building2 className="h-6 w-6" />,
    emoji: "🏪",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
  },
  {
    key: "kyc" as UserSection,
    label: "KYC",
    icon: <ShieldCheck className="h-6 w-6" />,
    emoji: "🛡️",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
  },
  {
    key: "wallet" as UserSection,
    label: "Wallet",
    icon: <Wallet className="h-6 w-6" />,
    emoji: "💰",
    color: "#C7A24A",
    bg: "rgba(199,162,74,0.1)",
  },
  {
    key: "shopping" as UserSection,
    label: "Shopping",
    icon: <ShoppingBag className="h-6 w-6" />,
    emoji: "🛍️",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.1)",
  },
  {
    key: "notifications" as UserSection,
    label: "Alerts",
    icon: <Bell className="h-6 w-6" />,
    emoji: "🔔",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
  },
];

const COMPANY_UPDATES = [
  {
    dot: "#22C55E",
    text: "New franchise opportunities available in 15 cities",
  },
  { dot: "#C7A24A", text: "Monthly income plan updated for Q2 2026" },
  { dot: "#3B82F6", text: "New machine catalogue uploaded" },
];

export function HomeSection({ user, onNavigate }: HomeSectionProps) {
  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0B1C30 0%, #142D4A 60%, #1a3a5c 100%)",
          boxShadow: "0 8px 32px rgba(20,45,74,0.3)",
        }}
      >
        <div className="px-6 py-6 flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
            style={{ background: "#C7A24A", color: "#0B1C30" }}
          >
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm" style={{ color: "rgba(199,162,74,0.7)" }}>
              Namaste 🙏
            </p>
            <h1 className="text-xl font-bold text-white truncate">
              {user.fullName}
            </h1>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              @{user.username} • {user.role}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs" style={{ color: "rgba(199,162,74,0.6)" }}>
              Wallet Balance
            </p>
            <p className="text-2xl font-bold" style={{ color: "#C7A24A" }}>
              ₹{Number(user.walletBalance).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <div
          className="px-6 py-3 flex items-center gap-4"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#22C55E" }}
            />
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Account Active
            </span>
          </div>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            |
          </span>
          <span className="text-xs" style={{ color: "rgba(199,162,74,0.6)" }}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-bold mb-3" style={{ color: "#142D4A" }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.key}
              type="button"
              data-ocid={`home.${action.key}.button`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onNavigate(action.key)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-105"
              style={{
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ background: action.bg }}
              >
                {action.emoji}
              </div>
              <span
                className="text-xs font-medium text-center leading-tight"
                style={{ color: "#374151" }}
              >
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-5"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            className="font-semibold text-sm mb-3"
            style={{ color: "#142D4A" }}
          >
            📊 Your Account Summary
          </h3>
          <div className="space-y-2">
            {(
              [
                [
                  "Member Since",
                  new Date(
                    Number(user.createdAt) / 1_000_000,
                  ).toLocaleDateString("en-IN"),
                ],
                ["Phone", user.phone || "Not set"],
                ["Email", user.email || "Not set"],
                ["Role", user.role],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span style={{ color: "#6B7280" }}>{label}</span>
                <span className="font-medium" style={{ color: "#111827" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl p-5"
          style={{
            background: "linear-gradient(135deg, #142D4A, #1e3d5c)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            className="font-semibold text-sm mb-3"
            style={{ color: "#C7A24A" }}
          >
            🏆 Company Updates
          </h3>
          <div className="space-y-3">
            {COMPANY_UPDATES.map((item) => (
              <div key={item.text} className="flex items-start gap-2.5">
                <span
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: item.dot }}
                />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
