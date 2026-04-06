import type { User } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ExternalBlob,
  useGetAllKYCRecords,
  useSubmitKYC,
} from "@/hooks/useQueries";
import { Loader2, ShieldCheck, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const KYC_FIELDS = [
  {
    id: "aadhaarDoc" as const,
    label: "Aadhaar Document (PDF/Image)",
    emoji: "📋",
  },
  { id: "panDoc" as const, label: "PAN Document (PDF/Image)", emoji: "📋" },
  { id: "photo" as const, label: "Passport Photo", emoji: "📸" },
];

export function KYCSection({ user }: { user: User }) {
  const submit = useSubmitKYC();
  const { data: kycRecords = [] } = useGetAllKYCRecords();
  const myKYC = kycRecords.find((k) => k.userId === user.id);

  const [form, setForm] = useState({ aadhaarNumber: "", panNumber: "" });
  const [files, setFiles] = useState<{
    aadhaarDoc: File | null;
    panDoc: File | null;
    photo: File | null;
  }>({
    aadhaarDoc: null,
    panDoc: null,
    photo: null,
  });
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const aadhaarRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const fieldRefs = { aadhaarDoc: aadhaarRef, panDoc: panRef, photo: photoRef };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.aadhaarDoc || !files.panDoc || !files.photo) {
      toast.error("Please upload all required documents");
      return;
    }
    try {
      setUploadProgress(0);
      const [aadhaarBytes, panBytes, photoBytes] = await Promise.all([
        files.aadhaarDoc.arrayBuffer(),
        files.panDoc.arrayBuffer(),
        files.photo.arrayBuffer(),
      ]);
      const aadhaarBlob = ExternalBlob.fromBytes(new Uint8Array(aadhaarBytes));
      const panBlob = ExternalBlob.fromBytes(new Uint8Array(panBytes));
      const photoBlob = ExternalBlob.fromBytes(
        new Uint8Array(photoBytes),
      ).withUploadProgress((p) => setUploadProgress(p));

      await submit.mutateAsync({
        userId: user.id,
        aadhaarNumber: form.aadhaarNumber,
        panNumber: form.panNumber,
        aadhaarDoc: aadhaarBlob,
        panDoc: panBlob,
        photo: photoBlob,
      });
      setUploadProgress(null);
      toast.success("KYC submitted successfully!");
    } catch {
      toast.error("KYC submission failed");
      setUploadProgress(null);
    }
  };

  const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    pending: { bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
    verified: { bg: "rgba(34,197,94,0.1)", color: "#22C55E" },
    rejected: { bg: "rgba(239,68,68,0.1)", color: "#EF4444" },
  };

  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(34,197,94,0.1)" }}
        >
          <ShieldCheck className="h-6 w-6" style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            KYC Verification 🛡️
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Submit your KYC documents for verification
          </p>
        </div>
      </div>

      {myKYC && (
        <div
          className="rounded-xl p-4"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm" style={{ color: "#142D4A" }}>
              KYC Status
            </p>
            <Badge
              style={{
                background:
                  STATUS_COLORS[myKYC.status]?.bg ?? "rgba(245,158,11,0.1)",
                color: STATUS_COLORS[myKYC.status]?.color ?? "#F59E0B",
                border: "none",
              }}
            >
              {myKYC.status.toUpperCase()}
            </Badge>
          </div>
          {myKYC.status === "verified" && (
            <p className="text-xs mt-2" style={{ color: "#22C55E" }}>
              ✔ Your KYC is verified. Full access unlocked.
            </p>
          )}
          {myKYC.status === "pending" && (
            <p className="text-xs mt-2" style={{ color: "#F59E0B" }}>
              ⏳ Under review. Usually takes 1-2 business days.
            </p>
          )}
          {myKYC.status === "rejected" && (
            <p className="text-xs mt-2" style={{ color: "#EF4444" }}>
              ❌ Documents rejected. Please resubmit below.
            </p>
          )}
        </div>
      )}

      {(!myKYC || myKYC.status === "rejected") && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-6 space-y-4"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3 className="font-semibold" style={{ color: "#142D4A" }}>
            Submit KYC Documents
          </h3>
          <div className="space-y-1.5">
            <Label>Aadhaar Number</Label>
            <Input
              data-ocid="kyc.input"
              value={form.aadhaarNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, aadhaarNumber: e.target.value }))
              }
              placeholder="XXXX XXXX XXXX"
              maxLength={14}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>PAN Number</Label>
            <Input
              data-ocid="kyc.input"
              value={form.panNumber}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  panNumber: e.target.value.toUpperCase(),
                }))
              }
              placeholder="ABCDE1234F"
              maxLength={10}
              required
            />
          </div>

          {KYC_FIELDS.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <Label htmlFor={`kyc-${field.id}`}>{field.label}</Label>
              <label
                htmlFor={`kyc-${field.id}`}
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-green-400 transition-colors block"
                style={{
                  borderColor: files[field.id]
                    ? "#22C55E"
                    : "rgba(199,162,74,0.4)",
                }}
                data-ocid="kyc.upload_button"
              >
                <input
                  id={`kyc-${field.id}`}
                  type="file"
                  ref={fieldRefs[field.id]}
                  className="hidden"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setFiles((p) => ({ ...p, [field.id]: f }));
                  }}
                />
                {files[field.id] ? (
                  <p className="text-sm text-green-600">
                    {field.emoji} {files[field.id]!.name}
                  </p>
                ) : (
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>
                    <Upload className="h-4 w-4 inline mr-1" />
                    Click to upload
                  </p>
                )}
              </label>
            </div>
          ))}

          {uploadProgress !== null && (
            <Progress value={uploadProgress} className="h-1" />
          )}

          <Button
            type="submit"
            data-ocid="kyc.submit_button"
            disabled={submit.isPending}
            className="w-full h-11 font-semibold"
            style={{ background: "#142D4A", color: "#C7A24A" }}
          >
            {submit.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit KYC Documents
          </Button>
        </form>
      )}
    </div>
  );
}
