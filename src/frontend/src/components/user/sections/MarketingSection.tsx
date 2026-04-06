import { Truck } from "lucide-react";
import { motion } from "motion/react";

const MARKETING_STRATEGIES = [
  {
    emoji: "📱",
    title: "Social Media Marketing",
    desc: "Leverage WhatsApp, Facebook, and Instagram to reach customers. Share product stories, testimonials, and offers.",
    tips: [
      "Post daily product updates",
      "Share customer success stories",
      "Use AUG branded content",
    ],
    color: "#3B82F6",
  },
  {
    emoji: "🤝",
    title: "Referral Marketing",
    desc: "Build your network through personal referrals. Every member you refer earns you commission.",
    tips: [
      "Refer minimum 2 people/month",
      "Follow up regularly",
      "Provide product demos",
    ],
    color: "#22C55E",
  },
  {
    emoji: "🎪",
    title: "Event Marketing",
    desc: "Organize local product demos, health camps, and business opportunity presentations.",
    tips: [
      "Monthly local meetings",
      "Product demonstration",
      "Business plan presentations",
    ],
    color: "#8B5CF6",
  },
  {
    emoji: "📦",
    title: "BTL Activities",
    desc: "Below-the-line marketing with pamphlets, banners, and local advertising for your area.",
    tips: ["Local area pamphlets", "Shop display boards", "Retail tie-ups"],
    color: "#C7A24A",
  },
];

export function MarketingSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(236,72,153,0.1)" }}
        >
          <Truck className="h-6 w-6" style={{ color: "#EC4899" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Marketing 📣
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Marketing strategies and resources
          </p>
        </div>
      </div>

      {/* Stats banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-5"
        style={{
          background: "linear-gradient(135deg, #0B1C30, #142D4A)",
          boxShadow: "0 4px 16px rgba(20,45,74,0.2)",
        }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Active Leads", value: "24", emoji: "👥" },
            { label: "Conversions", value: "8", emoji: "✅" },
            { label: "Conversion Rate", value: "33%", emoji: "📊" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xl mb-1">{stat.emoji}</div>
              <p className="text-xl font-bold" style={{ color: "#C7A24A" }}>
                {stat.value}
              </p>
              <p
                className="text-[10px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        {MARKETING_STRATEGIES.map((strategy, i) => (
          <motion.div
            key={strategy.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl p-5"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: `${strategy.color}10`,
                  animation: `bounce ${2 + i * 0.3}s ease-in-out infinite`,
                }}
              >
                {strategy.emoji}
              </div>
              <div className="flex-1">
                <h3
                  className="font-bold text-sm"
                  style={{ color: strategy.color }}
                >
                  {strategy.title}
                </h3>
                <p
                  className="text-xs mt-1.5 leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  {strategy.desc}
                </p>
                <ul className="mt-2 space-y-1">
                  {strategy.tips.map((tip) => (
                    <li key={tip} className="text-xs flex items-center gap-1.5">
                      <span style={{ color: strategy.color }}>•</span>
                      <span style={{ color: "#374151" }}>{tip}</span>
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
