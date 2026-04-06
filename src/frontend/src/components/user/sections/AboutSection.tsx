import { motion } from "motion/react";

export function AboutSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0B1C30, #142D4A)",
          boxShadow: "0 8px 32px rgba(20,45,74,0.2)",
        }}
      >
        <div className="p-8 text-center">
          <img
            src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
            alt="AUG Logo"
            className="w-24 h-24 mx-auto rounded-full mb-4"
            style={{ border: "3px solid rgba(199,162,74,0.4)" }}
          />
          <h1 className="text-2xl font-bold" style={{ color: "#C7A24A" }}>
            ANSHIKA UDHYOG GROUP™
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Empowering Businesses. Building Futures.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            {["Est. 2020", "Pan India", "10,000+ Members"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(199,162,74,0.15)",
                  color: "#C7A24A",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            emoji: "🎯",
            title: "Our Mission",
            color: "#3B82F6",
            bg: "rgba(59,130,246,0.08)",
            text: "To create a self-sustaining ecosystem of entrepreneurs across India by providing accessible business opportunities, quality products, and comprehensive support systems to every member.",
          },
          {
            emoji: "🔭",
            title: "Our Vision",
            color: "#8B5CF6",
            bg: "rgba(139,92,246,0.08)",
            text: "To become India's largest multi-level business network, empowering 1 million families with financial independence through our franchise, manufacturing, and distribution model.",
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5"
            style={{ background: item.bg, border: `1px solid ${item.color}20` }}
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <h3 className="font-bold mb-2" style={{ color: item.color }}>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Core Values */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <h3 className="font-bold text-base mb-4" style={{ color: "#142D4A" }}>
          🌟 Core Values
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { emoji: "🤝", value: "Integrity" },
            { emoji: "💪", value: "Excellence" },
            { emoji: "🌱", value: "Growth" },
            { emoji: "🤜", value: "Unity" },
            { emoji: "❤️", value: "Trust" },
            { emoji: "🚀", value: "Innovation" },
          ].map((v) => (
            <div
              key={v.value}
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ background: "#F9FAFB" }}
            >
              <span className="text-xl">{v.emoji}</span>
              <span
                className="text-sm font-medium"
                style={{ color: "#374151" }}
              >
                {v.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { value: "5+", label: "Years", emoji: "📅" },
          { value: "50+", label: "Cities", emoji: "🏙️" },
          { value: "200+", label: "Products", emoji: "📦" },
          { value: "10K+", label: "Partners", emoji: "🤝" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center"
            style={{ background: "linear-gradient(135deg, #142D4A, #1e3d5c)" }}
          >
            <div className="text-2xl">{stat.emoji}</div>
            <p className="text-xl font-bold mt-1" style={{ color: "#C7A24A" }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
