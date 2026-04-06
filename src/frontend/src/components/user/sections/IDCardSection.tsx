import type { User } from "@/backend";
import { IdCard } from "lucide-react";
import { motion } from "motion/react";

function makeBars(userId: string): { key: string; width: number }[] {
  const chars = userId.split("").map((c) => c.charCodeAt(0));
  return Array.from({ length: 28 }, (_, i) => ({
    key: `b${i}-${chars[i % chars.length] ?? 65}`,
    width: ((chars[i % chars.length] ?? 65) + i) % 3 === 0 ? 3 : 1,
  }));
}

export function IDCardSection({ user }: { user: User }) {
  const bars = makeBars(user.id);

  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(199,162,74,0.1)" }}
        >
          <IdCard className="h-6 w-6" style={{ color: "#C7A24A" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            ID Card 📳
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your official member ID card
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 12px 40px rgba(20,45,74,0.25)",
          maxWidth: 380,
          margin: "0 auto",
        }}
      >
        {/* Card header */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #0B1C30, #142D4A)" }}
        >
          <img
            src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
            style={{ border: "2px solid rgba(199,162,74,0.5)" }}
          />
          <div>
            <p
              className="text-xs font-bold tracking-wider"
              style={{ color: "#C7A24A" }}
            >
              ANSHIKA UDHYOG GROUP™
            </p>
            <p
              className="text-[10px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Official Member ID Card
            </p>
          </div>
          <div className="ml-auto text-right">
            <p
              className="text-[10px]"
              style={{ color: "rgba(199,162,74,0.5)" }}
            >
              MEMBER
            </p>
            <span className="text-lg">🏆</span>
          </div>
        </div>

        {/* Card body */}
        <div className="px-6 py-5" style={{ background: "#fff" }}>
          <div className="flex gap-4">
            <div
              className="w-20 h-24 rounded-xl flex items-center justify-center text-3xl font-bold flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #142D4A, #1e3d5c)",
                color: "#C7A24A",
              }}
            >
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold" style={{ color: "#142D4A" }}>
                {user.fullName}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                @{user.username}
              </p>
              <div className="mt-2 space-y-1.5">
                {(
                  [
                    ["Role", user.role.toUpperCase()],
                    ["Phone", user.phone || "N/A"],
                    ["Member ID", user.id.slice(0, 12).toUpperCase()],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wide w-16"
                      style={{ color: "#9CA3AF" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#374151" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Barcode */}
          <div
            className="mt-4 pt-3 border-t flex items-center justify-between"
            style={{ borderColor: "#F3F4F6" }}
          >
            <div className="flex gap-0.5">
              {bars.map((bar) => (
                <div
                  key={bar.key}
                  style={{
                    width: bar.width,
                    height: 24,
                    background: "#142D4A",
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
            <div
              className="w-8 h-8 flex-shrink-0 ml-3 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: "rgba(199,162,74,0.1)", color: "#C7A24A" }}
            >
              AUG
            </div>
          </div>
        </div>

        <div
          className="px-6 py-2 text-center text-[10px]"
          style={{ background: "#142D4A", color: "rgba(255,255,255,0.4)" }}
        >
          Valid • Anshika Udhyog Group™ • {new Date().getFullYear()}
        </div>
      </motion.div>

      <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
        This is your official digital ID card
      </p>
    </div>
  );
}
