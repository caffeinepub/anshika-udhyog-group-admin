import { Medal } from "lucide-react";
import { motion } from "motion/react";

export function CertificateSection() {
  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(199,162,74,0.1)" }}
        >
          <Medal className="h-6 w-6" style={{ color: "#C7A24A" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Certificates 🏅
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your achievement certificates
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-8 text-center"
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          border: "2px dashed rgba(199,162,74,0.3)",
        }}
        data-ocid="certificate.empty_state"
      >
        <div className="text-5xl mb-3">🏅</div>
        <h3 className="font-semibold" style={{ color: "#142D4A" }}>
          No Certificates Yet
        </h3>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          Complete milestones and achievements to earn certificates from Anshika
          Udhyog Group.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {["Sales Champion", "KYC Verified", "Top Recruiter"].map((cert) => (
            <div
              key={cert}
              className="p-3 rounded-lg text-center"
              style={{
                background: "rgba(199,162,74,0.05)",
                border: "1px solid rgba(199,162,74,0.2)",
              }}
            >
              <div className="text-2xl mb-1">🎖️</div>
              <p
                className="text-[10px] font-medium"
                style={{ color: "#9CA3AF" }}
              >
                {cert}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "#D1D5DB" }}>
                Locked
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
