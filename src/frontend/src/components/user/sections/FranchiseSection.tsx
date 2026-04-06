import type { User } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAllFranchiseApplications,
  useSubmitFranchiseApplication,
} from "@/hooks/useQueries";
import { Building2, CheckCircle, Clock, Loader2, XCircle } from "lucide-react";
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

export function FranchiseSection({ user }: { user: User }) {
  const submit = useSubmitFranchiseApplication();
  const { data: allApps = [] } = useGetAllFranchiseApplications();
  const myApps = allApps.filter((a) => a.userId === user.id);

  const [form, setForm] = useState({
    fullName: user.fullName,
    phone: user.phone,
    address: "",
    city: "",
    state: "",
    investmentCapacity: "",
    businessExperience: "",
    areaPreference: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit.mutateAsync({ userId: user.id, ...form });
      setSubmitted(true);
      toast.success("Franchise application submitted!");
    } catch {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(139,92,246,0.1)" }}
        >
          <Building2 className="h-6 w-6" style={{ color: "#8B5CF6" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Franchise Apply 🏪
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Join the Anshika Udhyog Group franchise network
          </p>
        </div>
      </div>

      {/* Franchise Benefits */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { emoji: "💰", label: "High ROI", desc: "20-35% returns" },
          { emoji: "🤝", label: "Full Support", desc: "Training & mentoring" },
          { emoji: "🏆", label: "Proven Brand", desc: "Established network" },
        ].map((b) => (
          <div
            key={b.label}
            className="rounded-xl p-4 text-center"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div className="text-2xl mb-1">{b.emoji}</div>
            <p className="text-xs font-semibold" style={{ color: "#142D4A" }}>
              {b.label}
            </p>
            <p className="text-[10px]" style={{ color: "#6B7280" }}>
              {b.desc}
            </p>
          </div>
        ))}
      </div>

      {myApps.length > 0 && (
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
          {myApps.map((app, i) => {
            const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.pending;
            return (
              <div
                key={app.id}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: "#F9FAFB" }}
                data-ocid={`franchise.item.${i + 1}`}
              >
                <div>
                  <p className="text-sm font-medium">
                    {app.city}, {app.state}
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    Investment: {app.investmentCapacity}
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
                  {app.status}
                </Badge>
              </div>
            );
          })}
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
          data-ocid="franchise.success_state"
        >
          <div className="text-5xl mb-3">✅</div>
          <h3 className="text-lg font-bold" style={{ color: "#142D4A" }}>
            Application Submitted!
          </h3>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Our franchise team will contact you within 3 business days.
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
            Franchise Application Form
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                data-ocid="franchise.input"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                data-ocid="franchise.input"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Address</Label>
            <Textarea
              data-ocid="franchise.textarea"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input
                data-ocid="franchise.input"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Input
                data-ocid="franchise.input"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Investment Capacity</Label>
              <Input
                data-ocid="franchise.input"
                value={form.investmentCapacity}
                onChange={(e) =>
                  updateField("investmentCapacity", e.target.value)
                }
                placeholder="e.g. ₹5-10 Lakhs"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Business Experience</Label>
              <Input
                data-ocid="franchise.input"
                value={form.businessExperience}
                onChange={(e) =>
                  updateField("businessExperience", e.target.value)
                }
                placeholder="Years of experience"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Area Preference</Label>
            <Input
              data-ocid="franchise.input"
              value={form.areaPreference}
              onChange={(e) => updateField("areaPreference", e.target.value)}
              placeholder="District/Area you want to operate in"
              required
            />
          </div>
          <Button
            type="submit"
            data-ocid="franchise.submit_button"
            disabled={submit.isPending}
            className="w-full h-11 font-semibold"
            style={{ background: "#142D4A", color: "#C7A24A" }}
          >
            {submit.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit Franchise Application
          </Button>
        </form>
      )}
    </div>
  );
}
