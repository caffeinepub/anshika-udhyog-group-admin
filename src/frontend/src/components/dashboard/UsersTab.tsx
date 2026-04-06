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
import {
  AdminRole,
  ExternalBlob,
  type User,
  useCreateUser,
  useDeactivateUser,
  useGetAllUsers,
  useUpdateUser,
} from "@/hooks/useQueries";
import { Loader2, Pencil, UserMinus, UserPlus, Users } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const emptyForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  role: AdminRole.standard,
  password: "",
};

export function UsersTab() {
  const { data: users = [], isLoading } = useGetAllUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deactivateUser = useDeactivateUser();

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [photoBlob, setPhotoBlob] = useState<ExternalBlob | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const updateField = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const openCreate = () => {
    setEditingUser(null);
    setForm({ ...emptyForm });
    setPhotoBlob(null);
    setOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setForm({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: "",
    });
    setPhotoBlob(null);
    setOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadProgress(0);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
      setUploadProgress(p),
    );
    setPhotoBlob(blob);
    setUploadProgress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser.mutateAsync({
          id: editingUser.id,
          ...form,
          profilePhotoBlob: photoBlob ?? undefined,
        });
        toast.success("User updated!");
      } else {
        await createUser.mutateAsync({
          ...form,
          profilePhotoBlob: photoBlob ?? undefined,
        });
        toast.success("User created!");
      }
      setOpen(false);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      await deactivateUser.mutateAsync(id);
      toast.success("User deactivated");
    } catch {
      toast.error("Failed to deactivate");
    }
  };

  const isPending = createUser.isPending || updateUser.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6" }}
          >
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "#111827" }}>
              User Management
            </h2>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              {users.length} registered users
            </p>
          </div>
        </div>
        <Button
          data-ocid="users.open_modal_button"
          onClick={openCreate}
          style={{ background: "#142D4A", color: "#C7A24A" }}
          className="gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Create User
        </Button>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {isLoading ? (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="users.loading_state"
          >
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: "#C7A24A" }}
            />
          </div>
        ) : users.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="users.empty_state"
          >
            <Users className="h-12 w-12" style={{ color: "#D1D5DB" }} />
            <p style={{ color: "#6B7280" }}>
              No users yet. Create your first user.
            </p>
          </div>
        ) : (
          <Table data-ocid="users.table">
            <TableHeader>
              <TableRow style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={user.id} data-ocid={`users.item.${i + 1}`}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell style={{ color: "#6B7280" }}>
                    {user.username}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        background:
                          user.role === AdminRole.admin
                            ? "rgba(199,162,74,0.15)"
                            : "rgba(59,130,246,0.1)",
                        color:
                          user.role === AdminRole.admin ? "#C7A24A" : "#3B82F6",
                        border: "none",
                      }}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        background: user.isActive
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(239,68,68,0.1)",
                        color: user.isActive ? "#22C55E" : "#EF4444",
                        border: "none",
                      }}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        data-ocid={`users.edit_button.${i + 1}`}
                        onClick={() => openEdit(user)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      {user.isActive && (
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`users.delete_button.${i + 1}`}
                          onClick={() => handleDeactivate(user.id)}
                          style={{ color: "#EF4444" }}
                        >
                          <UserMinus className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-lg"
          data-ocid="users.dialog"
          style={{ background: "#fff" }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: "#142D4A" }}>
              {editingUser ? "Edit User" : "Create New User"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input
                  data-ocid="users.input"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Username</Label>
                <Input
                  data-ocid="users.input"
                  value={form.username}
                  onChange={(e) => updateField("username", e.target.value)}
                  placeholder="username"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  data-ocid="users.input"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  data-ocid="users.input"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Password</Label>
                <Input
                  type="password"
                  data-ocid="users.input"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder={
                    editingUser ? "Leave blank to keep" : "Set password"
                  }
                  required={!editingUser}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => updateField("role", v)}
                >
                  <SelectTrigger data-ocid="users.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AdminRole.standard}>
                      Standard User
                    </SelectItem>
                    <SelectItem value={AdminRole.admin}>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Profile Photo - use Label + button pattern for a11y */}
            <div className="space-y-1.5">
              <Label htmlFor="photo-upload">Profile Photo</Label>
              <label
                htmlFor="photo-upload"
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors block"
                style={{ borderColor: "rgba(199,162,74,0.4)" }}
              >
                <input
                  id="photo-upload"
                  type="file"
                  ref={photoRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                  data-ocid="users.upload_button"
                />
                {photoBlob ? (
                  <p className="text-sm text-green-600">Photo selected ✓</p>
                ) : (
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    Click to upload profile photo
                  </p>
                )}
              </label>
              {uploadProgress !== null && (
                <Progress value={uploadProgress} className="h-1" />
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                data-ocid="users.cancel_button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="users.submit_button"
                disabled={isPending}
                style={{ background: "#142D4A", color: "#C7A24A" }}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingUser ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
