import { motion } from "motion/react";

const INCOME_STREAMS = [
  {
    emoji: "💰",
    title: "Direct Sales Income",
    subtitle: "Product Sales Profit",
    desc: "Earn 15-25% profit margin on every product you sell directly to customers.",
    color: "#3B82F6",
    amount: "₹500 - ₹50,000/month",
    pulse: true,
  },
  {
    emoji: "📊",
    title: "Team Commission",
    subtitle: "Downline Performance",
    desc: "Earn 5-10% commission on your entire downline team's sales volume.",
    color: "#8B5CF6",
    amount: "₹1,000 - ₹200,000/month",
    pulse: true,
  },
  {
    emoji: "🏪",
    title: "Franchise Royalty",
    subtitle: "Passive Income",
    desc: "Monthly royalty income from your franchise unit's performance.",
    color: "#C7A24A",
    amount: "₹5,000 - ₹100,000/month",
    pulse: false,
  },
  {
    emoji: "🏆",
    title: "Performance Bonus",
    subtitle: "Achievement Reward",
    desc: "Special bonuses for achieving monthly and annual sales targets.",
    color: "#22C55E",
    amount: "₹2,000 - ₹25,000/month",
    pulse: false,
  },
  {
    emoji: "🚀",
    title: "Leadership Bonus",
    subtitle: "Top Earner Reward",
    desc: "Exclusive bonuses for leaders who build and mentor large teams.",
    color: "#EC4899",
    amount: "₹10,000 - ₹500,000/month",
    pulse: true,
  },
  {
    emoji: "🌐",
    title: "Lifetime Benefits",
    subtitle: "Residual Income",
    desc: "Build a network once and earn residual income for life.",
    color: "#F59E0B",
    amount: "Lifetime earnings",
    pulse: false,
  },
];

export function MultipleIncomeSection() {
  return (
    <div className="space-y-5 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
          Multiple Income Streams 💸
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Build wealth through multiple income channels
        </p>
      </motion.div>

      {/* Total potential banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-6 text-center"
        style={{
          background: "linear-gradient(135deg, #0B1C30, #1e3d5c)",
          boxShadow: "0 8px 24px rgba(20,45,74,0.25)",
        }}
      >
        <p className="text-sm" style={{ color: "rgba(199,162,74,0.6)" }}>
          Total Monthly Income Potential
        </p>
        <p className="text-4xl font-bold mt-1" style={{ color: "#C7A24A" }}>
          ₹ 5 Lakh+
        </p>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Combined from all income streams
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INCOME_STREAMS.map((stream, i) => (
          <motion.div
            key={stream.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl p-5 relative overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {stream.pulse && (
              <div
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: stream.color }}
              />
            )}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
              style={{ background: `${stream.color}12` }}
            >
              {stream.emoji}
            </div>
            <h3 className="font-bold text-sm" style={{ color: stream.color }}>
              {stream.title}
            </h3>
            <p
              className="text-[11px] font-medium mt-0.5"
              style={{ color: "#9CA3AF" }}
            >
              {stream.subtitle}
            </p>
            <p
              className="text-xs mt-2 leading-relaxed"
              style={{ color: "#6B7280" }}
            >
              {stream.desc}
            </p>
            <div
              className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold inline-block"
              style={{ background: `${stream.color}12`, color: stream.color }}
            >
              {stream.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
