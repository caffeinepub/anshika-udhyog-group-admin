import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, ShieldCheck, User as UserIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { User } from "../backend";
import { useActor } from "../hooks/useActor";

interface LoginPageProps {
  onLogin: (user: User | null, role: "admin" | "user") => void;
}

const ADMIN_ID = "admin";
const ADMIN_PASS = "504560@AUC";

export function LoginPage({ onLogin }: LoginPageProps) {
  const { actor } = useActor();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Admin hardcoded check
      if (userId === ADMIN_ID && password === ADMIN_PASS) {
        onLogin(null, "admin");
        return;
      }

      // Try backend user login
      if (!actor) {
        setError("System not ready. Please try again.");
        setIsLoading(false);
        return;
      }

      const passwordBytes = new TextEncoder().encode(password);
      const result = await actor.loginUser({
        id: userId,
        credentials: { username: userId, password: passwordBytes },
      });

      if (result.user) {
        onLogin(result.user, "user");
      } else {
        setError(
          result.error ?? "Invalid User ID or Password. Please try again.",
        );
        setIsLoading(false);
      }
    } catch {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #0B1C30 0%, #142D4A 60%, #0D2239 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C7A24A 0, #C7A24A 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute top-0 left-0 w-64 h-64 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 0 0, #C7A24A, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 100% 100%, #C7A24A, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(199,162,74,0.2)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header */}
          <div
            className="p-8 pb-6 text-center border-b"
            style={{ borderColor: "rgba(199,162,74,0.15)" }}
          >
            <div className="flex justify-center mb-5">
              <div
                className="rounded-full p-1"
                style={{
                  background: "rgba(199,162,74,0.1)",
                  border: "2px solid rgba(199,162,74,0.3)",
                }}
              >
                <img
                  src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
                  alt="Logo"
                  className="rounded-full"
                  style={{ width: 88, height: 88 }}
                />
              </div>
            </div>
            <h1
              className="text-xl font-bold tracking-widest uppercase"
              style={{ color: "#C7A24A" }}
            >
              ANSHIKA UDHYOG GROUP™
            </h1>
            <p
              className="text-xs mt-1 tracking-wider"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Secure Login Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="userId"
                className="text-xs tracking-wider uppercase font-semibold"
                style={{ color: "rgba(199,162,74,0.8)" }}
              >
                User ID
              </Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "rgba(199,162,74,0.5)" }}
                />
                <Input
                  id="userId"
                  data-ocid="login.input"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                  className="pl-10 border-0 text-white placeholder:text-white/30"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(199,162,74,0.3)",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs tracking-wider uppercase font-semibold"
                style={{ color: "rgba(199,162,74,0.8)" }}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "rgba(199,162,74,0.5)" }}
                />
                <Input
                  id="password"
                  data-ocid="login.password_input"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="pl-10 pr-10 border-0 text-white placeholder:text-white/30"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(199,162,74,0.3)",
                    borderRadius: "8px",
                  }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(199,162,74,0.5)" }}
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="login.error_state"
                className="text-sm px-3 py-2 rounded-lg flex items-center gap-2"
                style={{
                  background: "rgba(239,68,68,0.15)",
                  color: "#fca5a5",
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
              >
                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              data-ocid="login.submit_button"
              disabled={isLoading}
              className="w-full font-semibold tracking-wider text-sm h-11"
              style={{
                background: isLoading ? "rgba(199,162,74,0.6)" : "#C7A24A",
                color: "#0B1C30",
                border: "none",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Sign In to Portal"
              )}
            </Button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-4"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          © {new Date().getFullYear()} Anshika Udhyog Group™. All rights
          reserved.
        </p>
      </motion.div>
    </div>
  );
}
