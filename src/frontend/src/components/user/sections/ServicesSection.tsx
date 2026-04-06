import { motion } from "motion/react";

const SERVICES = [
  {
    emoji: "⚙️",
    title: "Manufacturing",
    color: "#3B82F6",
    desc: "State-of-the-art manufacturing units producing quality goods across multiple categories.",
  },
  {
    emoji: "🛡️",
    title: "Franchise Network",
    color: "#8B5CF6",
    desc: "Pan-India franchise network offering business opportunities with full brand support.",
  },
  {
    emoji: "📊",
    title: "B2B Marketing",
    color: "#C7A24A",
    desc: "Direct B2B channel for wholesale distribution to retailers and business partners.",
  },
  {
    emoji: "🌱",
    title: "Agricultural Supply",
    color: "#22C55E",
    desc: "Raw material sourcing and agricultural supply chain for manufacturing operations.",
  },
  {
    emoji: "🚚",
    title: "Logistics",
    color: "#F59E0B",
    desc: "End-to-end logistics and delivery solutions for products across India.",
  },
  {
    emoji: "💻",
    title: "Digital Platform",
    color: "#EC4899",
    desc: "Digital member management platform for tracking income, orders, and accounts.",
  },
  {
    emoji: "🏦",
    title: "Financial Services",
    color: "#14B8A6",
    desc: "Loan services, wallet management, and financial support for members.",
  },
  {
    emoji: "🎓",
    title: "Training & Education",
    color: "#F97316",
    desc: "Comprehensive training programs to upskill members in sales and marketing.",
  },
];

export function ServicesSection() {
  return (
    <div className="space-y-5 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
          Our Services 🌟
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Comprehensive services to support your business journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl p-5 hover:shadow-lg transition-shadow"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${service.color}15` }}
              >
                {service.emoji}
              </div>
              <div>
                <h3
                  className="font-bold text-sm"
                  style={{ color: service.color }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs mt-1 leading-relaxed"
                  style={{ color: "#6B7280" }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
