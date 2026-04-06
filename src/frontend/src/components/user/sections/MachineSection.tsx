import { Wrench } from "lucide-react";
import { motion } from "motion/react";

const MACHINES = [
  {
    name: "Industrial Mixer",
    emoji: "⚙️",
    color: "#3B82F6",
    desc: "Heavy-duty mixing machine for manufacturing herbal and food products. Capacity: 50kg per batch.",
    specs: ["Motor: 2HP", "Capacity: 50kg", "Material: SS 304"],
  },
  {
    name: "Spice Grinder",
    emoji: "🔧",
    color: "#F59E0B",
    desc: "High-speed grinding machine for spices and raw materials. Ultra-fine grinding capability.",
    specs: ["Speed: 3000 RPM", "Capacity: 30kg/hr", "Stainless Steel"],
  },
  {
    name: "Packaging Machine",
    emoji: "📦",
    color: "#22C55E",
    desc: "Automated packaging machine for sealing and filling products in pouches and sachets.",
    specs: ["Speed: 60 packs/min", "Weight: 5g-500g", "Auto-fill"],
  },
  {
    name: "Cold Press Machine",
    emoji: "🪴",
    color: "#8B5CF6",
    desc: "Cold-press extraction machine for essential oils and herbal extracts.",
    specs: ["Pressure: 200 bar", "Temp: Cold process", "Yield: 95%"],
  },
];

export function MachineSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(59,130,246,0.1)" }}
        >
          <Wrench className="h-6 w-6" style={{ color: "#3B82F6" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Machines ⚙️
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Our manufacturing machinery catalogue
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MACHINES.map((machine, i) => (
          <motion.div
            key={machine.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="h-28 flex items-center justify-center text-5xl"
              style={{ background: `${machine.color}10` }}
            >
              <span
                style={{
                  animation: `spin ${3 + i}s linear infinite`,
                  display: "inline-block",
                }}
              >
                {machine.emoji}
              </span>
            </div>
            <div className="p-4">
              <h3
                className="font-bold text-sm"
                style={{ color: machine.color }}
              >
                {machine.name}
              </h3>
              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {machine.desc}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {machine.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: `${machine.color}10`,
                      color: machine.color,
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
