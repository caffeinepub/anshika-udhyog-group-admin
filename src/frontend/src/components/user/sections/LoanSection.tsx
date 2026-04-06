import type { User } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAllLoanApplications,
  useSubmitLoanApplication,
} from "@/hooks/useQueries";
import { CheckCircle, Clock, CreditCard, Loader2, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  pending: {
    icon: <Clock className="h-4 w-4" />,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
  },
  approved: {
    icon: <CheckCircle className="h-4 w-4" />,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
  },
  rejected: {
    icon: <XCircle className="h-4 w-4" />,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
  },
};

export function LoanSection({ user }: { user: User }) {
  const submit = useSubmitLoanApplication();
  const { data: allLoans = [] } = useGetAllLoanApplications();
  const myLoans = allLoans.filter((l) => l.userId === user.id);

  const [form, setForm] = useState({
    fullName: user.fullName,
    phone: user.phone,
    address: "",
    loanAmount: "",
    purpose: "",
    monthlyIncome: "",
    existingLoans: "None",
    documents: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit.mutateAsync({
        userId: user.id,
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        loanAmount: BigInt(Math.round(Number.parseFloat(form.loanAmount) || 0)),
        purpose: form.purpose,
        monthlyIncome: form.monthlyIncome,
        existingLoans: form.existingLoans,
        documents: form.documents,
      });
      setSubmitted(true);
      toast.success("Loan application submitted!");
    } catch {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(59,130,246,0.1)" }}
        >
          <CreditCard className="h-6 w-6" style={{ color: "#3B82F6" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Loan Apply 💳
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Apply for a loan from Anshika Udhyog Group
          </p>
        </div>
      </div>

      {/* Existing applications */}
      {myLoans.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            className="font-semibold text-sm mb-3"
            style={{ color: "#142D4A" }}
          >
            Your Applications
          </h3>
          <div className="space-y-2">
            {myLoans.map((loan, i) => {
              const cfg = STATUS_CONFIG[loan.status] ?? STATUS_CONFIG.pending;
              return (
                <div
                  key={loan.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: "#F9FAFB" }}
                  data-ocid={`loan.item.${i + 1}`}
                >
                  <div>
                    <p className="text-sm font-medium">{loan.purpose}</p>
                    <p className="text-xs" style={{ color: "#6B7280" }}>
                      ₹{Number(loan.loanAmount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Badge
                    style={{
                      background: cfg.bg,
                      color: cfg.color,
                      border: "none",
                    }}
                    className="gap-1"
                  >
                    {cfg.icon}
                    {loan.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl p-8 text-center"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          data-ocid="loan.success_state"
        >
          <div className="text-5xl mb-3">✅</div>
          <h3 className="text-lg font-bold" style={{ color: "#142D4A" }}>
            Application Submitted!
          </h3>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Our team will review your application and get back to you soon.
          </p>
          <Button
            className="mt-4"
            onClick={() => setSubmitted(false)}
            style={{ background: "#142D4A", color: "#C7A24A" }}
          >
            Apply Again
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
          <h3 className="font-semibold" style={{ color: "#142D4A" }}>
            Loan Application Form
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                data-ocid="loan.input"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                data-ocid="loan.input"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Address</Label>
            <Textarea
              data-ocid="loan.textarea"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Loan Amount (₹)</Label>
              <Input
                data-ocid="loan.input"
                type="number"
                value={form.loanAmount}
                onChange={(e) => updateField("loanAmount", e.target.value)}
                placeholder="e.g. 50000"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Monthly Income (₹)</Label>
              <Input
                data-ocid="loan.input"
                value={form.monthlyIncome}
                onChange={(e) => updateField("monthlyIncome", e.target.value)}
                placeholder="e.g. 20000"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Purpose of Loan</Label>
            <Input
              data-ocid="loan.input"
              value={form.purpose}
              onChange={(e) => updateField("purpose", e.target.value)}
              placeholder="Business expansion, equipment purchase..."
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Existing Loans</Label>
            <Input
              data-ocid="loan.input"
              value={form.existingLoans}
              onChange={(e) => updateField("existingLoans", e.target.value)}
              placeholder="None / List existing loans"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Document Description</Label>
            <Textarea
              data-ocid="loan.textarea"
              value={form.documents}
              onChange={(e) => updateField("documents", e.target.value)}
              placeholder="List documents you can provide: Aadhaar, PAN, ITR, etc."
              rows={2}
            />
          </div>
          <Button
            type="submit"
            data-ocid="loan.submit_button"
            disabled={submit.isPending}
            className="w-full h-11 font-semibold"
            style={{ background: "#142D4A", color: "#C7A24A" }}
          >
            {submit.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit Loan Application
          </Button>
        </form>
      )}
    </div>
  );
}
