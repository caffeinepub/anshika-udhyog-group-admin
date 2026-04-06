import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type KYCRecord,
  useGetAllKYCRecords,
  useRejectKYC,
  useVerifyKYC,
} from "@/hooks/useQueries";
import { CheckCircle, Eye, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
  verified: { bg: "rgba(34,197,94,0.1)", color: "#22C55E" },
  rejected: { bg: "rgba(239,68,68,0.1)", color: "#EF4444" },
};

export function KYCTab() {
  const { data: records = [], isLoading } = useGetAllKYCRecords();
  const verify = useVerifyKYC();
  const rejectKYC = useRejectKYC();
  const [viewRecord, setViewRecord] = useState<KYCRecord | null>(null);

  const handleVerify = async (id: string) => {
    try {
      await verify.mutateAsync(id);
      toast.success("KYC verified!");
    } catch {
      toast.error("Verification failed");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectKYC.mutateAsync(id);
      toast.success("KYC rejected");
    } catch {
      toast.error("Rejection failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}
        >
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "#111827" }}>
            KYC Management
          </h2>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            {records.length} KYC submissions
          </p>
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {isLoading ? (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="kyc.loading_state"
          >
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#C7A24A" }}
            />
          </div>
        ) : records.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="kyc.empty_state"
          >
            <ShieldCheck className="h-12 w-12" style={{ color: "#D1D5DB" }} />
            <p style={{ color: "#6B7280" }}>No KYC submissions yet.</p>
          </div>
        ) : (
          <Table data-ocid="kyc.table">
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Aadhaar No.</TableHead>
                <TableHead>PAN No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((rec, i) => {
                const statusStyle =
                  STATUS_COLORS[rec.status] ?? STATUS_COLORS.pending;
                return (
                  <TableRow key={rec.id} data-ocid={`kyc.item.${i + 1}`}>
                    <TableCell className="font-medium">{rec.userId}</TableCell>
                    <TableCell>
                      XXXX-XXXX-{rec.aadhaarNumber.slice(-4)}
                    </TableCell>
                    <TableCell>{rec.panNumber}</TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: "none",
                        }}
                      >
                        {rec.status}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: "#6B7280", fontSize: 12 }}>
                      {new Date(
                        Number(rec.submittedAt) / 1_000_000,
                      ).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`kyc.edit_button.${i + 1}`}
                          onClick={() => setViewRecord(rec)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        {rec.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              data-ocid={`kyc.confirm_button.${i + 1}`}
                              style={{ color: "#22C55E" }}
                              onClick={() => handleVerify(rec.id)}
                              disabled={verify.isPending}
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              data-ocid={`kyc.delete_button.${i + 1}`}
                              style={{ color: "#EF4444" }}
                              onClick={() => handleReject(rec.id)}
                              disabled={rejectKYC.isPending}
                            >
                              <XCircle className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* View KYC Details */}
      <Dialog open={!!viewRecord} onOpenChange={() => setViewRecord(null)}>
        <DialogContent data-ocid="kyc.dialog" style={{ background: "#fff" }}>
          <DialogHeader>
            <DialogTitle>KYC Record Details</DialogTitle>
          </DialogHeader>
          {viewRecord && (
            <div className="space-y-3 text-sm">
              {[
                ["User ID", viewRecord.userId],
                [
                  "Aadhaar Number",
                  `XXXX-XXXX-${viewRecord.aadhaarNumber.slice(-4)}`,
                ],
                ["PAN Number", viewRecord.panNumber],
                ["Status", viewRecord.status],
                [
                  "Submitted",
                  new Date(
                    Number(viewRecord.submittedAt) / 1_000_000,
                  ).toLocaleDateString("en-IN"),
                ],
                [
                  "Verified At",
                  viewRecord.verifiedAt
                    ? new Date(
                        Number(viewRecord.verifiedAt) / 1_000_000,
                      ).toLocaleDateString("en-IN")
                    : "Not yet",
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="w-32 font-medium text-gray-500 shrink-0">
                    {label}:
                  </span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {["Aadhaar Doc", "PAN Doc", "Photo"].map((label) => (
                  <div
                    key={label}
                    className="aspect-square rounded-lg flex items-center justify-center text-xs"
                    style={{ background: "#F3F4F6", color: "#6B7280" }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button
            variant="outline"
            data-ocid="kyc.close_button"
            onClick={() => setViewRecord(null)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
