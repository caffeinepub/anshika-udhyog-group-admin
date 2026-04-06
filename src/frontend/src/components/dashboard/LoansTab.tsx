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
  type LoanApplication,
  useApproveLoanApplication,
  useGetAllLoanApplications,
  useRejectLoanApplication,
} from "@/hooks/useQueries";
import { CheckCircle, CreditCard, Eye, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
  approved: { bg: "rgba(34,197,94,0.1)", color: "#22C55E" },
  rejected: { bg: "rgba(239,68,68,0.1)", color: "#EF4444" },
};

export function LoansTab() {
  const { data: loans = [], isLoading } = useGetAllLoanApplications();
  const approve = useApproveLoanApplication();
  const reject = useRejectLoanApplication();

  const [viewLoan, setViewLoan] = useState<LoanApplication | null>(null);
  const [actionLoan, setActionLoan] = useState<{
    loan: LoanApplication;
    type: "approve" | "reject";
  } | null>(null);
  const [note, setNote] = useState("");

  const handleAction = async () => {
    if (!actionLoan) return;
    try {
      if (actionLoan.type === "approve") {
        await approve.mutateAsync({ id: actionLoan.loan.id, note });
        toast.success("Loan approved!");
      } else {
        await reject.mutateAsync({ id: actionLoan.loan.id, note });
        toast.success("Loan rejected");
      }
      setActionLoan(null);
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
          style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}
        >
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "#111827" }}>
            Loan Applications
          </h2>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            {loans.length} total applications
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
            data-ocid="loans.loading_state"
          >
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#C7A24A" }}
            />
          </div>
        ) : loans.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="loans.empty_state"
          >
            <CreditCard className="h-12 w-12" style={{ color: "#D1D5DB" }} />
            <p style={{ color: "#6B7280" }}>No loan applications yet.</p>
          </div>
        ) : (
          <Table data-ocid="loans.table">
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan, i) => {
                const statusStyle =
                  STATUS_COLORS[loan.status] ?? STATUS_COLORS.pending;
                return (
                  <TableRow key={loan.id} data-ocid={`loans.item.${i + 1}`}>
                    <TableCell className="font-medium">
                      {loan.fullName}
                    </TableCell>
                    <TableCell>
                      ₹{Number(loan.loanAmount).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="max-w-32 truncate">
                      {loan.purpose}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: "none",
                        }}
                      >
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: "#6B7280", fontSize: 12 }}>
                      {new Date(
                        Number(loan.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`loans.edit_button.${i + 1}`}
                          onClick={() => setViewLoan(loan)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        {loan.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              data-ocid={`loans.confirm_button.${i + 1}`}
                              style={{ color: "#22C55E" }}
                              onClick={() => {
                                setActionLoan({ loan, type: "approve" });
                                setNote("");
                              }}
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              data-ocid={`loans.delete_button.${i + 1}`}
                              style={{ color: "#EF4444" }}
                              onClick={() => {
                                setActionLoan({ loan, type: "reject" });
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

      {/* View Details Modal */}
      <Dialog open={!!viewLoan} onOpenChange={() => setViewLoan(null)}>
        <DialogContent data-ocid="loans.dialog" style={{ background: "#fff" }}>
          <DialogHeader>
            <DialogTitle>Loan Application Details</DialogTitle>
          </DialogHeader>
          {viewLoan && (
            <div className="space-y-3 text-sm">
              {[
                ["Applicant", viewLoan.fullName],
                ["Phone", viewLoan.phone],
                ["Address", viewLoan.address],
                [
                  "Loan Amount",
                  `₹${Number(viewLoan.loanAmount).toLocaleString("en-IN")}`,
                ],
                ["Purpose", viewLoan.purpose],
                ["Monthly Income", viewLoan.monthlyIncome],
                ["Existing Loans", viewLoan.existingLoans],
                ["Documents", viewLoan.documents],
                ["Status", viewLoan.status],
                ["Admin Note", viewLoan.adminNote || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="w-32 font-medium text-gray-500 shrink-0">
                    {label}:
                  </span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            data-ocid="loans.close_button"
            onClick={() => setViewLoan(null)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Approve/Reject Modal */}
      <Dialog open={!!actionLoan} onOpenChange={() => setActionLoan(null)}>
        <DialogContent data-ocid="loans.dialog" style={{ background: "#fff" }}>
          <DialogHeader>
            <DialogTitle>
              {actionLoan?.type === "approve" ? "Approve" : "Reject"} Loan
              Application
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Applicant: <strong>{actionLoan?.loan.fullName}</strong>
            </p>
            <div className="space-y-1.5">
              <Label>Admin Note (optional)</Label>
              <Textarea
                data-ocid="loans.textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                data-ocid="loans.cancel_button"
                onClick={() => setActionLoan(null)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="loans.confirm_button"
                disabled={isPending}
                onClick={handleAction}
                style={{
                  background:
                    actionLoan?.type === "approve" ? "#22C55E" : "#EF4444",
                  color: "#fff",
                  border: "none",
                }}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {actionLoan?.type === "approve" ? "Approve" : "Reject"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
