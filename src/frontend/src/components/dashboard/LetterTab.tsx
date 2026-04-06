import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  type Letter,
  LetterStatus,
  PaperSize,
  useCreateLetter,
  useDeleteLetter,
  useGetAllLetters,
  useUpdateLetter,
} from "@/hooks/useQueries";
import {
  CheckCheck,
  FileText,
  Pencil,
  Printer,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PAPER_SIZES: { value: PaperSize; label: string }[] = [
  { value: PaperSize.a4, label: "A4 (210 × 297 mm)" },
  { value: PaperSize.a5, label: "A5 (148 × 210 mm)" },
  { value: PaperSize.legal, label: "Legal (216 × 356 mm)" },
  { value: PaperSize.letter, label: "Letter (216 × 279 mm)" },
];

function generateRefNumber(count: number): string {
  return `AUG/${new Date().getFullYear()}/${String(count + 1).padStart(3, "0")}`;
}

function todayDateStr(): string {
  return new Date().toISOString().slice(0, 10);
}

interface FormState {
  paperSize: PaperSize;
  referenceNumber: string;
  date: string;
  recipientName: string;
  recipientAddress: string;
  subject: string;
  body: string;
  authorityName: string;
  designation: string;
}

const emptyForm = (count: number): FormState => ({
  paperSize: PaperSize.a4,
  referenceNumber: generateRefNumber(count),
  date: todayDateStr(),
  recipientName: "",
  recipientAddress: "",
  subject: "",
  body: "",
  authorityName: "",
  designation: "",
});

export function LetterTab() {
  const { data: letters = [], isLoading } = useGetAllLetters();
  const createLetter = useCreateLetter();
  const updateLetter = useUpdateLetter();
  const deleteLetter = useDeleteLetter();

  const [form, setForm] = useState<FormState>(() => emptyForm(0));
  const [editingRef, setEditingRef] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const updateField = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async (status: LetterStatus) => {
    const dateTs = BigInt(new Date(form.date).getTime());
    try {
      if (editingRef) {
        const existing = letters.find((l) => l.referenceNumber === editingRef);
        if (!existing) return;
        await updateLetter.mutateAsync({
          referenceNumber: editingRef,
          letter: {
            ...existing,
            ...form,
            date: dateTs,
            status,
          },
        });
        toast.success("Letter updated!");
      } else {
        await createLetter.mutateAsync({
          date: dateTs,
          recipientName: form.recipientName,
          recipientAddress: form.recipientAddress,
          subject: form.subject,
          body: form.body,
          authorityName: form.authorityName,
          designation: form.designation,
          paperSize: form.paperSize,
          status,
        });
        toast.success(
          status === LetterStatus.draft ? "Draft saved!" : "Letter finalized!",
        );
      }
      handleClear();
    } catch {
      toast.error("Failed to save letter");
    }
  };

  const handleEdit = (letter: Letter) => {
    setEditingRef(letter.referenceNumber);
    setForm({
      paperSize: letter.paperSize,
      referenceNumber: letter.referenceNumber,
      date: new Date(Number(letter.date)).toISOString().slice(0, 10),
      recipientName: letter.recipientName,
      recipientAddress: letter.recipientAddress,
      subject: letter.subject,
      body: letter.body,
      authorityName: letter.authorityName,
      designation: letter.designation,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (ref: string) => {
    if (!confirm("Delete this letter?")) return;
    try {
      await deleteLetter.mutateAsync(ref);
      toast.success("Letter deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleClear = () => {
    setEditingRef(null);
    setForm(emptyForm(letters.length));
  };

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="space-y-6">
      {/* Print area */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 print:static print:inset-auto print:bg-white print:py-0">
          <div className="relative">
            <button
              type="button"
              className="no-print absolute -top-4 -right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
              onClick={() => setShowPreview(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <LetterPreview form={form} />
          </div>
        </div>
      )}

      {/* Form section */}
      <div
        className="bg-white rounded-xl shadow-card overflow-hidden"
        style={{ border: "1px solid #D9DEE6" }}
      >
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: "#142D4A" }}
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5" style={{ color: "#C7A24A" }} />
            <h2 className="font-semibold text-white text-sm">
              {editingRef ? `Editing: ${editingRef}` : "New Official Letter"}
            </h2>
          </div>
          {editingRef && (
            <button
              type="button"
              onClick={handleClear}
              className="text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label
                  className="text-xs font-semibold"
                  style={{ color: "#374151" }}
                >
                  Paper Size
                </Label>
                <Select
                  value={form.paperSize}
                  onValueChange={(v) =>
                    updateField("paperSize", v as PaperSize)
                  }
                >
                  <SelectTrigger
                    data-ocid="letter.select"
                    className="h-9 text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAPER_SIZES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label
                  className="text-xs font-semibold"
                  style={{ color: "#374151" }}
                >
                  Reference Number
                </Label>
                <Input
                  data-ocid="letter.input"
                  value={form.referenceNumber}
                  onChange={(e) =>
                    updateField("referenceNumber", e.target.value)
                  }
                  className="h-9 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                className="text-xs font-semibold"
                style={{ color: "#374151" }}
              >
                Date
              </Label>
              <Input
                data-ocid="letter.input"
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label
                className="text-xs font-semibold"
                style={{ color: "#374151" }}
              >
                Recipient Name
              </Label>
              <Input
                data-ocid="letter.input"
                value={form.recipientName}
                onChange={(e) => updateField("recipientName", e.target.value)}
                placeholder="The Honourable..."
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label
                className="text-xs font-semibold"
                style={{ color: "#374151" }}
              >
                Recipient Address
              </Label>
              <Textarea
                data-ocid="letter.textarea"
                value={form.recipientAddress}
                onChange={(e) =>
                  updateField("recipientAddress", e.target.value)
                }
                placeholder="Address..."
                rows={3}
                className="text-sm resize-none"
              />
            </div>

            <div className="space-y-1">
              <Label
                className="text-xs font-semibold"
                style={{ color: "#374151" }}
              >
                Subject
              </Label>
              <Input
                data-ocid="letter.input"
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                placeholder="Re: ..."
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Label
                className="text-xs font-semibold"
                style={{ color: "#374151" }}
              >
                Letter Body
              </Label>
              <Textarea
                data-ocid="letter.textarea"
                value={form.body}
                onChange={(e) => updateField("body", e.target.value)}
                placeholder="Write the letter content here..."
                rows={8}
                className="text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label
                  className="text-xs font-semibold"
                  style={{ color: "#374151" }}
                >
                  Authority Name
                </Label>
                <Input
                  data-ocid="letter.input"
                  value={form.authorityName}
                  onChange={(e) => updateField("authorityName", e.target.value)}
                  placeholder="Name of signatory"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label
                  className="text-xs font-semibold"
                  style={{ color: "#374151" }}
                >
                  Designation
                </Label>
                <Input
                  data-ocid="letter.input"
                  value={form.designation}
                  onChange={(e) => updateField("designation", e.target.value)}
                  placeholder="e.g. Director"
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className="px-6 py-4 flex flex-wrap gap-3"
          style={{ borderTop: "1px solid #D9DEE6", background: "#F9FAFB" }}
        >
          <Button
            data-ocid="letter.save_button"
            variant="outline"
            size="sm"
            onClick={() => handleSave(LetterStatus.draft)}
            disabled={createLetter.isPending || updateLetter.isPending}
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            Save Draft
          </Button>
          <Button
            data-ocid="letter.primary_button"
            size="sm"
            onClick={() => handleSave(LetterStatus.finalized)}
            disabled={createLetter.isPending || updateLetter.isPending}
            style={{ background: "#142D4A", color: "white" }}
          >
            <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
            Finalize & Save
          </Button>
          <Button
            data-ocid="letter.button"
            size="sm"
            variant="outline"
            onClick={() => setShowPreview(true)}
          >
            Preview
          </Button>
          <Button
            data-ocid="letter.button"
            size="sm"
            variant="outline"
            onClick={handlePrint}
          >
            <Printer className="h-3.5 w-3.5 mr-1.5" />
            Print / PDF
          </Button>
          <Button
            data-ocid="letter.secondary_button"
            size="sm"
            variant="ghost"
            onClick={handleClear}
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* Letters table */}
      <div
        className="bg-white rounded-xl shadow-card overflow-hidden"
        style={{ border: "1px solid #D9DEE6" }}
      >
        <div
          className="px-6 py-4"
          style={{ borderBottom: "1px solid #D9DEE6" }}
        >
          <h2 className="text-sm font-semibold" style={{ color: "#111827" }}>
            All Letters ({letters.length})
          </h2>
        </div>

        {isLoading ? (
          <div
            data-ocid="letters.loading_state"
            className="p-8 text-center text-sm"
            style={{ color: "#6B7280" }}
          >
            Loading letters...
          </div>
        ) : letters.length === 0 ? (
          <div data-ocid="letters.empty_state" className="p-10 text-center">
            <FileText
              className="h-10 w-10 mx-auto mb-2"
              style={{ color: "#D1D5DB" }}
            />
            <p className="text-sm" style={{ color: "#6B7280" }}>
              No letters yet. Create your first letter above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ background: "#F9FAFB" }}>
                  <TableHead className="text-xs font-semibold">Ref #</TableHead>
                  <TableHead className="text-xs font-semibold">Date</TableHead>
                  <TableHead className="text-xs font-semibold">
                    Recipient
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Subject
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {letters.map((letter, idx) => (
                  <TableRow
                    key={letter.referenceNumber}
                    data-ocid={`letters.item.${idx + 1}`}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="text-xs font-mono font-medium">
                      {letter.referenceNumber}
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(Number(letter.date)).toLocaleDateString(
                        "en-IN",
                      )}
                    </TableCell>
                    <TableCell className="text-xs max-w-[120px] truncate">
                      {letter.recipientName || "—"}
                    </TableCell>
                    <TableCell className="text-xs max-w-[160px] truncate">
                      {letter.subject || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-[10px]"
                        style={{
                          background:
                            letter.status === LetterStatus.finalized
                              ? "rgba(34,197,94,0.1)"
                              : "rgba(234,179,8,0.1)",
                          color:
                            letter.status === LetterStatus.finalized
                              ? "#16a34a"
                              : "#ca8a04",
                          borderColor:
                            letter.status === LetterStatus.finalized
                              ? "rgba(34,197,94,0.3)"
                              : "rgba(234,179,8,0.3)",
                        }}
                      >
                        {letter.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          data-ocid={`letters.edit_button.${idx + 1}`}
                          onClick={() => handleEdit(letter)}
                          className="p-1.5 rounded hover:bg-gray-100"
                          title="Edit"
                        >
                          <Pencil
                            className="h-3.5 w-3.5"
                            style={{ color: "#6B7280" }}
                          />
                        </button>
                        <button
                          type="button"
                          data-ocid={`letters.delete_button.${idx + 1}`}
                          onClick={() => handleDelete(letter.referenceNumber)}
                          className="p-1.5 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2
                            className="h-3.5 w-3.5"
                            style={{ color: "#EF4444" }}
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

interface LetterPreviewProps {
  form: FormState;
}

function LetterPreview({ form }: LetterPreviewProps) {
  const paperClasses: Record<PaperSize, string> = {
    [PaperSize.a4]: "letter-a4",
    [PaperSize.a5]: "letter-a5",
    [PaperSize.legal]: "letter-legal",
    [PaperSize.letter]: "letter-letter",
  };

  return (
    <div
      className={`letterhead-paper ${paperClasses[form.paperSize]} mx-auto p-12 text-sm`}
      style={{ color: "#111", minHeight: "297mm" }}
    >
      {/* Letterhead */}
      <div
        className="flex items-center justify-between pb-4 mb-6"
        style={{ borderBottom: "3px solid #142D4A" }}
      >
        <div className="flex items-center gap-4">
          <img
            src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
            alt="AUG Logo"
            style={{ width: 72, height: 72 }}
          />
          <div>
            <h1
              className="text-xl font-bold tracking-wider"
              style={{ color: "#142D4A" }}
            >
              ANSHIKA UDHYOG GROUP™
            </h1>
            <p className="text-xs tracking-widest" style={{ color: "#C7A24A" }}>
              Official Administration
            </p>
          </div>
        </div>
        <div className="text-right text-xs" style={{ color: "#6B7280" }}>
          <p className="font-semibold text-sm" style={{ color: "#142D4A" }}>
            Ref: {form.referenceNumber || "—"}
          </p>
          <p>
            Date:{" "}
            {form.date
              ? new Date(form.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "—"}
          </p>
        </div>
      </div>

      {/* To */}
      {(form.recipientName || form.recipientAddress) && (
        <div className="mb-6">
          <p className="font-semibold">To,</p>
          {form.recipientName && (
            <p className="font-semibold">{form.recipientName}</p>
          )}
          {form.recipientAddress && (
            <p
              className="whitespace-pre-line text-xs mt-1"
              style={{ color: "#374151" }}
            >
              {form.recipientAddress}
            </p>
          )}
        </div>
      )}

      {/* Subject */}
      {form.subject && (
        <div className="mb-6">
          <p>
            <span className="font-bold">Sub: </span>
            <span className="font-semibold underline">{form.subject}</span>
          </p>
        </div>
      )}

      {/* Salutation */}
      <p className="mb-4">Sir/Madam,</p>

      {/* Body */}
      <div className="mb-10 leading-relaxed whitespace-pre-line">
        {form.body || (
          <span className="text-gray-400 italic">
            Letter body will appear here...
          </span>
        )}
      </div>

      {/* Signature */}
      <div className="mt-16">
        <div
          className="inline-block min-w-[200px]"
          style={{ borderTop: "1px solid #142D4A", paddingTop: "8px" }}
        >
          <p className="font-bold text-sm">
            {form.authorityName || "Authority Name"}
          </p>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            {form.designation || "Designation"}
          </p>
          <p className="text-xs mt-1" style={{ color: "#142D4A" }}>
            Anshika Udhyog Group™
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            [Seal]
          </p>
        </div>
      </div>
    </div>
  );
}
