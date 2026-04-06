import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
  type Document,
  ExternalBlob,
  useAddDocument,
  useDeleteDocument,
  useGetAllDocuments,
  useUpdateDocument,
} from "@/hooks/useQueries";
import {
  Eye,
  File,
  FileImage,
  FileText,
  FileVideo,
  FolderOpen,
  Pencil,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

function getFileIcon(docType: string) {
  if (docType.startsWith("image/"))
    return <FileImage className="h-4 w-4" style={{ color: "#8B5CF6" }} />;
  if (docType.startsWith("video/"))
    return <FileVideo className="h-4 w-4" style={{ color: "#3B82F6" }} />;
  if (docType.includes("pdf"))
    return <FileText className="h-4 w-4" style={{ color: "#EF4444" }} />;
  if (docType.includes("word") || docType.includes("document"))
    return <FileText className="h-4 w-4" style={{ color: "#2563EB" }} />;
  if (docType.includes("sheet") || docType.includes("excel"))
    return <FileText className="h-4 w-4" style={{ color: "#16A34A" }} />;
  return <File className="h-4 w-4" style={{ color: "#6B7280" }} />;
}

function formatSize(bytes: bigint): string {
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function getExtBadgeColor(docType: string): { bg: string; color: string } {
  if (docType.includes("pdf"))
    return { bg: "rgba(239,68,68,0.1)", color: "#dc2626" };
  if (docType.startsWith("image/"))
    return { bg: "rgba(139,92,246,0.1)", color: "#7c3aed" };
  if (docType.includes("word"))
    return { bg: "rgba(37,99,235,0.1)", color: "#1d4ed8" };
  if (docType.includes("sheet"))
    return { bg: "rgba(22,163,74,0.1)", color: "#15803d" };
  return { bg: "rgba(107,114,128,0.1)", color: "#4b5563" };
}

export function DocumentTab() {
  const { data: documents = [], isLoading } = useGetAllDocuments();
  const addDoc = useAddDocument();
  const updateDoc = useUpdateDocument();
  const deleteDoc = useDeleteDocument();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [editDoc, setEditDoc] = useState<Document | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    docType: "",
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadProgress(0);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) => {
        setUploadProgress(p);
      });

      await addDoc.mutateAsync({
        name: file.name,
        docType: file.type || "application/octet-stream",
        description: "",
        blob,
        size: BigInt(file.size),
      });
      toast.success("Document uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openEdit = (doc: Document) => {
    setEditDoc(doc);
    setEditForm({
      name: doc.name,
      description: doc.description,
      docType: doc.docType,
    });
  };

  const handleEditSave = async () => {
    if (!editDoc) return;
    try {
      await updateDoc.mutateAsync({
        id: editDoc.id,
        document: { ...editDoc, ...editForm },
      });
      toast.success("Document updated!");
      setEditDoc(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      await deleteDoc.mutateAsync(id);
      toast.success("Document deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="bg-white rounded-xl p-6 shadow-card flex flex-wrap items-center justify-between gap-4"
        style={{ border: "1px solid #D9DEE6" }}
      >
        <div>
          <h2 className="text-base font-semibold" style={{ color: "#111827" }}>
            Document Management
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
            {documents.length} documents stored
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            data-ocid="documents.upload_button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={addDoc.isPending || uploadProgress !== null}
            style={{ background: "#142D4A", color: "white" }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Progress */}
      {uploadProgress !== null && (
        <div
          data-ocid="documents.loading_state"
          className="bg-white rounded-xl p-4 shadow-card"
          style={{ border: "1px solid #D9DEE6" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Upload
              className="h-4 w-4 animate-bounce"
              style={{ color: "#C7A24A" }}
            />
            <span className="text-sm font-medium">
              Uploading... {uploadProgress}%
            </span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {/* Documents table */}
      <div
        className="bg-white rounded-xl shadow-card overflow-hidden"
        style={{ border: "1px solid #D9DEE6" }}
      >
        {isLoading ? (
          <div
            data-ocid="documents.loading_state"
            className="p-10 text-center text-sm"
            style={{ color: "#6B7280" }}
          >
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div data-ocid="documents.empty_state" className="p-12 text-center">
            <FolderOpen
              className="h-12 w-12 mx-auto mb-3"
              style={{ color: "#D1D5DB" }}
            />
            <p className="text-sm" style={{ color: "#6B7280" }}>
              No documents yet. Upload your first document.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ background: "#F9FAFB" }}>
                  <TableHead className="text-xs font-semibold w-8" />
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Type</TableHead>
                  <TableHead className="text-xs font-semibold">
                    Description
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Uploaded
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Size</TableHead>
                  <TableHead className="text-xs font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc, idx) => {
                  const badgeColor = getExtBadgeColor(doc.docType);
                  return (
                    <TableRow
                      key={doc.id}
                      data-ocid={`documents.item.${idx + 1}`}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>{getFileIcon(doc.docType)}</TableCell>
                      <TableCell className="text-xs font-medium max-w-[160px] truncate">
                        {doc.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-mono"
                          style={{
                            background: badgeColor.bg,
                            color: badgeColor.color,
                            borderColor: "transparent",
                          }}
                        >
                          {doc.docType.split("/").pop() || doc.docType}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="text-xs max-w-[120px] truncate"
                        style={{ color: "#6B7280" }}
                      >
                        {doc.description || "—"}
                      </TableCell>
                      <TableCell
                        className="text-xs"
                        style={{ color: "#6B7280" }}
                      >
                        {new Date(Number(doc.uploadedAt)).toLocaleDateString(
                          "en-IN",
                        )}
                      </TableCell>
                      <TableCell
                        className="text-xs"
                        style={{ color: "#6B7280" }}
                      >
                        {formatSize(doc.size)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <a
                            href={doc.blob.getDirectURL()}
                            target="_blank"
                            rel="noreferrer"
                            data-ocid={`documents.button.${idx + 1}`}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="View/Download"
                          >
                            <Eye
                              className="h-3.5 w-3.5"
                              style={{ color: "#6B7280" }}
                            />
                          </a>
                          <button
                            type="button"
                            data-ocid={`documents.edit_button.${idx + 1}`}
                            onClick={() => openEdit(doc)}
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
                            data-ocid={`documents.delete_button.${idx + 1}`}
                            onClick={() => handleDelete(doc.id)}
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
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editDoc} onOpenChange={(o) => !o && setEditDoc(null)}>
        <DialogContent data-ocid="documents.dialog" className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Name</Label>
              <Input
                data-ocid="documents.input"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Document Type</Label>
              <Input
                data-ocid="documents.input"
                value={editForm.docType}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, docType: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <Textarea
                data-ocid="documents.textarea"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className="resize-none text-sm"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                data-ocid="documents.cancel_button"
                variant="outline"
                size="sm"
                onClick={() => setEditDoc(null)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="documents.save_button"
                size="sm"
                onClick={handleEditSave}
                disabled={updateDoc.isPending}
                style={{ background: "#142D4A", color: "white" }}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
