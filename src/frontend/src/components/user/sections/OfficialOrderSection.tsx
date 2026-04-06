import { ScrollText } from "lucide-react";
import { motion } from "motion/react";

export function OfficialOrderSection() {
  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(139,92,246,0.1)" }}
        >
          <ScrollText className="h-6 w-6" style={{ color: "#8B5CF6" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Official Orders 📝
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Official orders and directives
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl p-8 text-center"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        data-ocid="official-order.empty_state"
      >
        <div className="text-5xl mb-3">📝</div>
        <h3 className="font-semibold" style={{ color: "#142D4A" }}>
          No Orders Issued
        </h3>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Official orders issued by the admin to you will appear here.
        </p>
      </motion.div>
    </div>
  );
}
