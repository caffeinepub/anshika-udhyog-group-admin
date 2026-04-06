import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function WithdrawalSection() {
  const [form, setForm] = useState({
    amount: "",
    accountNumber: "",
    ifscCode: "",
    accountHolder: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Withdrawal request submitted!");
  };

  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(34,197,94,0.1)" }}
        >
          <TrendingUp className="h-6 w-6" style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Withdrawal 💸
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Withdraw your wallet balance to bank
          </p>
        </div>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl p-8 text-center"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          data-ocid="withdrawal.success_state"
        >
          <div className="text-5xl mb-3">🏦</div>
          <h3 className="text-lg font-bold" style={{ color: "#142D4A" }}>
            Withdrawal Requested!
          </h3>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Amount will be credited within 2-3 business days.
          </p>
          <Button
            className="mt-4"
            onClick={() => setSubmitted(false)}
            style={{ background: "#142D4A", color: "#C7A24A" }}
          >
            New Request
          </Button>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-6 space-y-4"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div className="space-y-1.5">
            <Label>Amount (₹)</Label>
            <Input
              data-ocid="withdrawal.input"
              type="number"
              value={form.amount}
              onChange={(e) => updateField("amount", e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Account Holder Name</Label>
            <Input
              data-ocid="withdrawal.input"
              value={form.accountHolder}
              onChange={(e) => updateField("accountHolder", e.target.value)}
              placeholder="As per bank records"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Bank Account Number</Label>
            <Input
              data-ocid="withdrawal.input"
              value={form.accountNumber}
              onChange={(e) => updateField("accountNumber", e.target.value)}
              placeholder="Account number"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>IFSC Code</Label>
            <Input
              data-ocid="withdrawal.input"
              value={form.ifscCode}
              onChange={(e) => updateField("ifscCode", e.target.value)}
              placeholder="e.g. SBIN0001234"
              required
            />
          </div>
          <Button
            type="submit"
            data-ocid="withdrawal.submit_button"
            disabled={loading}
            className="w-full h-11 font-semibold"
            style={{ background: "#142D4A", color: "#C7A24A" }}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Withdrawal Request
          </Button>
        </form>
      )}
    </div>
  );
}
