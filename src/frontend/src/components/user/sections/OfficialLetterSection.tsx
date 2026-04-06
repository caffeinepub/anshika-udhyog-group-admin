import { FileText } from "lucide-react";
import { motion } from "motion/react";

export function OfficialLetterSection() {
  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(59,130,246,0.1)" }}
        >
          <FileText className="h-6 w-6" style={{ color: "#3B82F6" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Official Letters ✉️
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Official letters issued to you
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl p-8 text-center"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        data-ocid="official-letter.empty_state"
      >
        <div className="text-5xl mb-3">✉️</div>
        <h3 className="font-semibold" style={{ color: "#142D4A" }}>
          No Letters Issued
        </h3>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Official letters from Anshika Udhyog Group will appear here once
          issued by admin.
        </p>
      </motion.div>
    </div>
  );
}
