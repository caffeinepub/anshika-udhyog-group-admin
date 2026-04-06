import type { User } from "@/backend";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { motion } from "motion/react";

const MOCK_TRANSACTIONS = [
  {
    type: "credit",
    desc: "Team Commission - March 2026",
    amount: 2500,
    date: "Mar 31, 2026",
  },
  {
    type: "credit",
    desc: "Direct Sales Bonus",
    amount: 1200,
    date: "Mar 28, 2026",
  },
  {
    type: "debit",
    desc: "Withdrawal Processed",
    amount: 5000,
    date: "Mar 20, 2026",
  },
  {
    type: "credit",
    desc: "Performance Incentive",
    amount: 800,
    date: "Mar 15, 2026",
  },
  {
    type: "credit",
    desc: "Product Sale Commission",
    amount: 350,
    date: "Mar 10, 2026",
  },
];

export function WalletSection({ user }: { user: User }) {
  return (
    <div className="space-y-5 max-w-xl">
      <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
        Wallet 💰
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #142D4A, #1e3d5c)",
          boxShadow: "0 8px 24px rgba(20,45,74,0.25)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: "rgba(199,162,74,0.2)" }}
          >
            <Wallet className="h-5 w-5" style={{ color: "#C7A24A" }} />
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Available Balance
          </p>
        </div>
        <p className="text-4xl font-bold" style={{ color: "#C7A24A" }}>
          ₹{Number(user.walletBalance).toLocaleString("en-IN")}
        </p>
        <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Updated as of today
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4" style={{ color: "#22C55E" }} />
            <span className="text-xs font-medium" style={{ color: "#22C55E" }}>
              Total Earned
            </span>
          </div>
          <p className="text-xl font-bold" style={{ color: "#111827" }}>
            ₹5,850
          </p>
          <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
            This month
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4" style={{ color: "#EF4444" }} />
            <span className="text-xs font-medium" style={{ color: "#EF4444" }}>
              Withdrawn
            </span>
          </div>
          <p className="text-xl font-bold" style={{ color: "#111827" }}>
            ₹5,000
          </p>
          <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
            This month
          </p>
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "#F3F4F6" }}>
          <h3 className="font-semibold text-sm" style={{ color: "#142D4A" }}>
            Transaction History
          </h3>
        </div>
        <div className="divide-y" style={{ borderColor: "#F9FAFB" }}>
          {MOCK_TRANSACTIONS.map((tx, i) => (
            <div
              key={tx.desc}
              className="flex items-center gap-3 px-5 py-3.5"
              data-ocid={`wallet.item.${i + 1}`}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    tx.type === "credit"
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(239,68,68,0.1)",
                  color: tx.type === "credit" ? "#22C55E" : "#EF4444",
                }}
              >
                {tx.type === "credit" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "#111827" }}
                >
                  {tx.desc}
                </p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>
                  {tx.date}
                </p>
              </div>
              <p
                className="text-sm font-bold flex-shrink-0"
                style={{ color: tx.type === "credit" ? "#22C55E" : "#EF4444" }}
              >
                {tx.type === "credit" ? "+" : "-"}₹
                {tx.amount.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
