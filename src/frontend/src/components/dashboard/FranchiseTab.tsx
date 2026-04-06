import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  type FranchiseApplication,
  useApproveFranchiseApplication,
  useGetAllFranchiseApplications,
  useRejectFranchiseApplication,
} from "@/hooks/useQueries";
import { CheckCircle, Eye, Loader2, Store, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
  approved: { bg: "rgba(34,197,94,0.1)", color: "#22C55E" },
  rejected: { bg: "rgba(239,68,68,0.1)", color: "#EF4444" },
};

export function FranchiseTab() {
  const { data: applications = [], isLoading } =
    useGetAllFranchiseApplications();
  const approve = useApproveFranchiseApplication();
  const reject = useRejectFranchiseApplication();

  const [viewApp, setViewApp] = useState<FranchiseApplication | null>(null);
  const [actionApp, setActionApp] = useState<{
    app: FranchiseApplication;
    type: "approve" | "reject";
  } | null>(null);
  const [note, setNote] = useState("");

  const handleAction = async () => {
    if (!actionApp) return;
    try {
      if (actionApp.type === "approve") {
        await approve.mutateAsync({ id: actionApp.app.id, note });
        toast.success("Franchise application approved!");
      } else {
        await reject.mutateAsync({ id: actionApp.app.id, note });
        toast.success("Franchise application rejected");
      }
      setActionApp(null);
      setNote("");
    } catch {
      toast.error("Action failed");
    }
  };

  const isPending = approve.isPending || reject.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ background: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}
        >
          <Store className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "#111827" }}>
            Franchise Applications
          </h2>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            {applications.length} total applications
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
            data-ocid="franchise.loading_state"
          >
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#C7A24A" }}
            />
          </div>
        ) : applications.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="franchise.empty_state"
          >
            <Store className="h-12 w-12" style={{ color: "#D1D5DB" }} />
            <p style={{ color: "#6B7280" }}>No franchise applications yet.</p>
          </div>
        ) : (
          <Table data-ocid="franchise.table">
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>City/State</TableHead>
                <TableHead>Investment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app, i) => {
                const statusStyle =
                  STATUS_COLORS[app.status] ?? STATUS_COLORS.pending;
                return (
                  <TableRow key={app.id} data-ocid={`franchise.item.${i + 1}`}>
                    <TableCell className="font-medium">
                      {app.fullName}
                    </TableCell>
                    <TableCell>
                      {app.city}, {app.state}
                    </TableCell>
                    <TableCell>{app.investmentCapacity}</TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: "none",
                        }}
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: "#6B7280", fontSize: 12 }}>
                      {new Date(
                        Number(app.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`franchise.edit_button.${i + 1}`}
                          onClick={() => setViewApp(app)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        {app.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              data-ocid={`franchise.confirm_button.${i + 1}`}
                              style={{ color: "#22C55E" }}
                              onClick={() => {
                                setActionApp({ app, type: "approve" });
                                setNote("");
                              }}
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              data-ocid={`franchise.delete_button.${i + 1}`}
                              style={{ color: "#EF4444" }}
                              onClick={() => {
                                setActionApp({ app, type: "reject" });
                                setNote("");
                              }}
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

      {/* View Modal */}
      <Dialog open={!!viewApp} onOpenChange={() => setViewApp(null)}>
        <DialogContent
          data-ocid="franchise.dialog"
          style={{ background: "#fff" }}
        >
          <DialogHeader>
            <DialogTitle>Franchise Application Details</DialogTitle>
          </DialogHeader>
          {viewApp && (
            <div className="space-y-3 text-sm">
              {[
                ["Applicant", viewApp.fullName],
                ["Phone", viewApp.phone],
                ["Address", viewApp.address],
                ["City", viewApp.city],
                ["State", viewApp.state],
                ["Investment Capacity", viewApp.investmentCapacity],
                ["Business Experience", viewApp.businessExperience],
                ["Area Preference", viewApp.areaPreference],
                ["Status", viewApp.status],
                ["Admin Note", viewApp.adminNote || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="w-36 font-medium text-gray-500 shrink-0">
                    {label}:
                  </span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            data-ocid="franchise.close_button"
            onClick={() => setViewApp(null)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Action Modal */}
      <Dialog open={!!actionApp} onOpenChange={() => setActionApp(null)}>
        <DialogContent
          data-ocid="franchise.dialog"
          style={{ background: "#fff" }}
        >
          <DialogHeader>
            <DialogTitle>
              {actionApp?.type === "approve" ? "Approve" : "Reject"} Franchise
              Application
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Applicant: <strong>{actionApp?.app.fullName}</strong>
            </p>
            <div className="space-y-1.5">
              <Label>Admin Note</Label>
              <Textarea
                data-ocid="franchise.textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                data-ocid="franchise.cancel_button"
                onClick={() => setActionApp(null)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="franchise.confirm_button"
                disabled={isPending}
                onClick={handleAction}
                style={{
                  background:
                    actionApp?.type === "approve" ? "#22C55E" : "#EF4444",
                  color: "#fff",
                  border: "none",
                }}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {actionApp?.type === "approve" ? "Approve" : "Reject"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
