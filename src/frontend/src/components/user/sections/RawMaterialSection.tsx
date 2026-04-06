import { Package } from "lucide-react";
import { motion } from "motion/react";

const RAW_MATERIALS = [
  {
    name: "Turmeric (Haldi)",
    emoji: "💛",
    origin: "Rajasthan, India",
    unit: "per kg",
    price: "₹120-180",
    color: "#F59E0B",
    desc: "Premium quality turmeric with high curcumin content.",
  },
  {
    name: "Neem Leaves",
    emoji: "🌿",
    origin: "UP, India",
    unit: "per kg",
    price: "₹80-120",
    color: "#22C55E",
    desc: "Organically harvested neem leaves for medicinal products.",
  },
  {
    name: "Aloe Vera Gel",
    emoji: "🌵",
    origin: "Gujarat, India",
    unit: "per liter",
    price: "₹200-350",
    color: "#14B8A6",
    desc: "Pure aloe vera gel extracted fresh from organic farms.",
  },
  {
    name: "Amla (Gooseberry)",
    emoji: "🛒",
    origin: "MP, India",
    unit: "per kg",
    price: "₹90-150",
    color: "#8B5CF6",
    desc: "Vitamin C rich amla for health supplements and cosmetics.",
  },
  {
    name: "Ashwagandha Root",
    emoji: "🌻",
    origin: "Madhya Pradesh",
    unit: "per kg",
    price: "₹300-500",
    color: "#EC4899",
    desc: "Premium ashwagandha roots for herbal formulations.",
  },
  {
    name: "Mustard Oil",
    emoji: "🌼",
    origin: "Punjab, India",
    unit: "per liter",
    price: "₹120-160",
    color: "#F97316",
    desc: "Cold-pressed mustard oil for cooking and pharmaceutical use.",
  },
];

export function RawMaterialSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(245,158,11,0.1)" }}
        >
          <Package className="h-6 w-6" style={{ color: "#F59E0B" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Raw Materials 📦
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Our raw material catalogue and sourcing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {RAW_MATERIALS.map((mat, i) => (
          <motion.div
            key={mat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl p-5 flex items-start gap-3"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: `${mat.color}10`,
                animation: `bounce ${2 + i * 0.2}s ease-in-out infinite`,
              }}
            >
              {mat.emoji}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm" style={{ color: mat.color }}>
                {mat.name}
              </h3>
              <p className="text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>
                📍 {mat.origin}
              </p>
              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {mat.desc}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                  {mat.unit}
                </span>
                <span
                  className="font-bold text-sm"
                  style={{ color: mat.color }}
                >
                  {mat.price}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
