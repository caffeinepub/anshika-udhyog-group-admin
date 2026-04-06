import { Star } from "lucide-react";
import { motion } from "motion/react";

const B2B_TIERS = [
  {
    level: 1,
    title: "Associate Partner",
    emoji: "🌱",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    commission: "5%",
    requirement: "Register + 2 direct referrals",
    benefits: [
      "Product at wholesale price",
      "Basic marketing support",
      "Monthly newsletter",
    ],
  },
  {
    level: 2,
    title: "Silver Partner",
    emoji: "🥈",
    color: "#9CA3AF",
    bg: "rgba(156,163,175,0.08)",
    commission: "10%",
    requirement: "5 active downline members",
    benefits: [
      "All Associate benefits",
      "Priority product allocation",
      "Sales training program",
    ],
  },
  {
    level: 3,
    title: "Gold Partner",
    emoji: "🥇",
    color: "#C7A24A",
    bg: "rgba(199,162,74,0.08)",
    commission: "15%",
    requirement: "20 active downline members",
    benefits: [
      "All Silver benefits",
      "Dedicated account manager",
      "Exclusive product range",
    ],
  },
  {
    level: 4,
    title: "Platinum Partner",
    emoji: "🏆",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    commission: "20%",
    requirement: "50 active downline members",
    benefits: [
      "All Gold benefits",
      "Leadership bonus",
      "Company car incentive",
    ],
  },
  {
    level: 5,
    title: "Diamond Partner",
    emoji: "💎",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    commission: "25%",
    requirement: "100+ active downline members",
    benefits: [
      "All Platinum benefits",
      "International trip incentive",
      "Profit sharing",
    ],
  },
];

export function B2BMarketingSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(199,162,74,0.1)" }}
        >
          <Star className="h-6 w-6" style={{ color: "#C7A24A" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            B2B Marketing Plan ⭐
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Build your network and earn commissions
          </p>
        </div>
      </div>

      {/* How it works */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "linear-gradient(135deg, #0B1C30, #142D4A)",
          boxShadow: "0 4px 16px rgba(20,45,74,0.2)",
        }}
      >
        <h3 className="font-bold text-sm mb-3" style={{ color: "#C7A24A" }}>
          How It Works
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {["Register", "Build Team", "Earn Monthly"].map((step, i) => (
            <div key={step} className="text-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2"
                style={{ background: "rgba(199,162,74,0.2)", color: "#C7A24A" }}
              >
                {i + 1}
              </div>
              <p
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="space-y-3">
        {B2B_TIERS.map((tier, i) => (
          <motion.div
            key={tier.level}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl p-5"
            style={{ background: tier.bg, border: `1px solid ${tier.color}20` }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 animate-bounce"
                style={{
                  background: `${tier.color}15`,
                  animationDuration: `${1.5 + i * 0.2}s`,
                }}
              >
                {tier.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3
                    className="font-bold text-sm"
                    style={{ color: tier.color }}
                  >
                    Level {tier.level}: {tier.title}
                  </h3>
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-full"
                    style={{ background: `${tier.color}20`, color: tier.color }}
                  >
                    {tier.commission}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                  {tier.requirement}
                </p>
                <ul className="mt-2 space-y-1">
                  {tier.benefits.map((b) => (
                    <li key={b} className="text-xs flex items-center gap-1.5">
                      <span style={{ color: tier.color }}>✓</span>
                      <span style={{ color: "#374151" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
