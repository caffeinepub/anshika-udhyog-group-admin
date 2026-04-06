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
import { Textarea } from "@/components/ui/textarea";
import {
  ExternalBlob,
  type GalleryItem,
  useAddGalleryImage,
  useDeleteGalleryItem,
  useGetAllGalleryItems,
  useUpdateGalleryItem,
} from "@/hooks/useQueries";
import {
  Image as ImageIcon,
  Pencil,
  Trash2,
  Upload,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function GalleryTab() {
  const { data: items = [], isLoading } = useGetAllGalleryItems();
  const addImage = useAddGalleryImage();
  const updateItem = useUpdateGalleryItem();
  const deleteItem = useDeleteGalleryItem();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category).filter(Boolean))),
  ];
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const title = file.name.replace(/\.[^.]+$/, "");
    const category = "General";

    try {
      setUploadProgress(0);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) => {
        setUploadProgress(p);
      });

      await addImage.mutateAsync({
        title,
        description: "",
        category,
        blob,
      });
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openEdit = (item: GalleryItem) => {
    setEditItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      category: item.category,
    });
  };

  const handleEditSave = async () => {
    if (!editItem) return;
    try {
      await updateItem.mutateAsync({
        id: editItem.id,
        item: { ...editItem, ...editForm },
      });
      toast.success("Updated!");
      setEditItem(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteItem.mutateAsync(id);
      toast.success("Image deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const openLightbox = (item: GalleryItem) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  return (
    <div className="space-y-6">
      {/* Header / Upload */}
      <div
        className="bg-white rounded-xl p-6 shadow-card flex flex-wrap items-center justify-between gap-4"
        style={{ border: "1px solid #D9DEE6" }}
      >
        <div>
          <h2 className="text-base font-semibold" style={{ color: "#111827" }}>
            Gallery Management
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
            {items.length} images in gallery
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            data-ocid="gallery.upload_button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={addImage.isPending || uploadProgress !== null}
            style={{ background: "#142D4A", color: "white" }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>
      </div>

      {/* Upload progress */}
      {uploadProgress !== null && (
        <div
          data-ocid="gallery.loading_state"
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

      {/* Category filters */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid="gallery.tab"
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors"
              style={{
                background: activeCategory === cat ? "#142D4A" : "white",
                color: activeCategory === cat ? "white" : "#374151",
                border: "1px solid",
                borderColor: activeCategory === cat ? "#142D4A" : "#D9DEE6",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery grid */}
      {isLoading ? (
        <div
          data-ocid="gallery.loading_state"
          className="text-center py-10 text-sm"
          style={{ color: "#6B7280" }}
        >
          Loading gallery...
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          data-ocid="gallery.empty_state"
          className="bg-white rounded-xl p-12 text-center shadow-card"
          style={{ border: "1px solid #D9DEE6" }}
        >
          <ImageIcon
            className="h-12 w-12 mx-auto mb-3"
            style={{ color: "#D1D5DB" }}
          />
          <p className="text-sm" style={{ color: "#6B7280" }}>
            No images yet. Upload your first image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              data-ocid={`gallery.item.${idx + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-xl overflow-hidden shadow-card"
              style={{ border: "1px solid #D9DEE6" }}
            >
              {/* Image */}
              <button
                type="button"
                className="relative w-full aspect-square overflow-hidden cursor-pointer block"
                onClick={() => openLightbox(item)}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.blob.getDirectURL()}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>

              {/* Info */}
              <div className="p-3">
                <p
                  className="text-xs font-semibold truncate"
                  style={{ color: "#111827" }}
                >
                  {item.title}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>
                  {item.category}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <button
                    type="button"
                    data-ocid={`gallery.edit_button.${idx + 1}`}
                    onClick={() => openEdit(item)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Pencil className="h-3 w-3" style={{ color: "#6B7280" }} />
                  </button>
                  <button
                    type="button"
                    data-ocid={`gallery.delete_button.${idx + 1}`}
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" style={{ color: "#EF4444" }} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-ocid="gallery.modal"
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              data-ocid="gallery.close_button"
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxItem.blob.getDirectURL()}
              alt={lightboxItem.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 text-center">
              <p className="text-white font-semibold">{lightboxItem.title}</p>
              <p className="text-white/60 text-xs">{lightboxItem.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent data-ocid="gallery.dialog" className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Title</Label>
              <Input
                data-ocid="gallery.input"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Category</Label>
              <Input
                data-ocid="gallery.input"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, category: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <Textarea
                data-ocid="gallery.textarea"
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
                data-ocid="gallery.cancel_button"
                variant="outline"
                size="sm"
                onClick={() => setEditItem(null)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="gallery.save_button"
                size="sm"
                onClick={handleEditSave}
                disabled={updateItem.isPending}
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
