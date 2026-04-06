import { FileCheck, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const SALES_METRICS = [
  { label: "Monthly Target", value: "₹ 50,000", emoji: "🎯", color: "#3B82F6" },
  { label: "Achieved", value: "₹ 32,500", emoji: "✅", color: "#22C55E" },
  { label: "Pending Orders", value: "12", emoji: "⏳", color: "#F59E0B" },
  { label: "Commission", value: "₹ 3,250", emoji: "💰", color: "#C7A24A" },
];

const PRODUCT_SALES = [
  { product: "AUG Herbal Powder", qty: 45, revenue: "₹13,455", trend: "+12%" },
  { product: "AUG Aloe Vera Gel", qty: 32, revenue: "₹6,368", trend: "+8%" },
  { product: "Herbal Tea Pack", qty: 28, revenue: "₹5,572", trend: "+15%" },
  { product: "Neem Powder", qty: 55, revenue: "₹5,225", trend: "-3%" },
];

export function SalesSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(34,197,94,0.1)" }}
        >
          <FileCheck className="h-6 w-6" style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Sales Dashboard 📈
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your sales performance and metrics
          </p>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        {SALES_METRICS.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl p-4"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl animate-pulse">{metric.emoji}</span>
              <TrendingUp className="h-4 w-4" style={{ color: metric.color }} />
            </div>
            <p className="text-xl font-bold" style={{ color: metric.color }}>
              {metric.value}
            </p>
            <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Product performance */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "#F3F4F6" }}>
          <h3 className="font-semibold text-sm" style={{ color: "#142D4A" }}>
            Product Performance
          </h3>
        </div>
        <div>
          {PRODUCT_SALES.map((item, i) => (
            <div
              key={item.product}
              className="flex items-center gap-3 px-5 py-3.5 border-b last:border-b-0"
              style={{ borderColor: "#F9FAFB" }}
              data-ocid={`sales.item.${i + 1}`}
            >
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "#111827" }}>
                  {item.product}
                </p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>
                  Qty: {item.qty}
                </p>
              </div>
              <p className="text-sm font-semibold" style={{ color: "#142D4A" }}>
                {item.revenue}
              </p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: item.trend.startsWith("+")
                    ? "rgba(34,197,94,0.1)"
                    : "rgba(239,68,68,0.1)",
                  color: item.trend.startsWith("+") ? "#22C55E" : "#EF4444",
                }}
              >
                {item.trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
