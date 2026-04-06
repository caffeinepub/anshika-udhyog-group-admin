import { LayoutGrid } from "lucide-react";
import { motion } from "motion/react";

const INCOME_TIERS = [
  {
    range: "₹0 - ₹9,999",
    level: "Starter",
    emoji: "🌱",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    tasks: "5-10 sales/month",
    target: "10 team members",
  },
  {
    range: "₹10K - ₹49,999",
    level: "Bronze",
    emoji: "🥉",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    tasks: "15-30 sales/month",
    target: "25 team members",
  },
  {
    range: "₹50K - ₹99,999",
    level: "Silver",
    emoji: "🥈",
    color: "#9CA3AF",
    bg: "rgba(156,163,175,0.08)",
    tasks: "40-60 sales/month",
    target: "50 team members",
  },
  {
    range: "₹1L - ₹4,99,999",
    level: "Gold",
    emoji: "🥇",
    color: "#C7A24A",
    bg: "rgba(199,162,74,0.08)",
    tasks: "100+ sales/month",
    target: "100 team members",
  },
  {
    range: "₹5L+",
    level: "Platinum",
    emoji: "💎",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    tasks: "200+ sales/month",
    target: "200+ team members",
  },
];

export function IncomePlanSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(199,162,74,0.1)" }}
        >
          <LayoutGrid className="h-6 w-6" style={{ color: "#C7A24A" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Income Plan 📊
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Monthly income levels and targets
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {INCOME_TIERS.map((tier, i) => (
          <motion.div
            key={tier.level}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center">
              <div
                className="w-16 h-16 flex items-center justify-center text-3xl flex-shrink-0 animate-pulse"
                style={{
                  background: tier.bg,
                  animationDuration: `${2 + i * 0.3}s`,
                }}
              >
                {tier.emoji}
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between">
                  <h3
                    className="font-bold text-sm"
                    style={{ color: tier.color }}
                  >
                    {tier.level} Level
                  </h3>
                  <span
                    className="font-bold text-base"
                    style={{ color: "#142D4A" }}
                  >
                    {tier.range}
                  </span>
                </div>
                <div className="flex gap-4 mt-1">
                  <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                    📈 {tier.tasks}
                  </p>
                  <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                    👥 {tier.target}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
