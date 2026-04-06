import { Zap } from "lucide-react";
import { motion } from "motion/react";

const UTILITIES = [
  {
    emoji: "⚡",
    title: "Electricity Bill",
    desc: "Pay electricity bill online",
    color: "#F59E0B",
    badge: "Coming Soon",
  },
  {
    emoji: "💧",
    title: "Water Bill",
    desc: "Municipal water bill payment",
    color: "#3B82F6",
    badge: "Coming Soon",
  },
  {
    emoji: "📱",
    title: "Mobile Recharge",
    desc: "Prepaid/postpaid recharge",
    color: "#22C55E",
    badge: "Coming Soon",
  },
  {
    emoji: "📺",
    title: "DTH Recharge",
    desc: "DTH and cable TV recharge",
    color: "#8B5CF6",
    badge: "Coming Soon",
  },
  {
    emoji: "📡",
    title: "Internet",
    desc: "Broadband bill payment",
    color: "#EC4899",
    badge: "Coming Soon",
  },
  {
    emoji: "🏠",
    title: "Home Insurance",
    desc: "Property insurance services",
    color: "#14B8A6",
    badge: "Coming Soon",
  },
];

export function UtilitiesSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(245,158,11,0.1)" }}
        >
          <Zap className="h-6 w-6" style={{ color: "#F59E0B" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Utilities ⚡
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Pay bills and recharge services
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {UTILITIES.map((util, i) => (
          <motion.div
            key={util.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl p-5 text-center relative"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 animate-pulse"
              style={{ background: `${util.color}12` }}
            >
              {util.emoji}
            </div>
            <h3 className="font-semibold text-sm" style={{ color: "#111827" }}>
              {util.title}
            </h3>
            <p className="text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>
              {util.desc}
            </p>
            <span
              className="text-[10px] font-medium mt-2 inline-block px-2 py-0.5 rounded-full"
              style={{ background: `${util.color}12`, color: util.color }}
            >
              {util.badge}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
