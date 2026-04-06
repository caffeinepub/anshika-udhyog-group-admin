import { useGetStats } from "@/hooks/useQueries";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileText,
  FolderOpen,
  Image,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import type { TabKey } from "./DashboardNav";

interface OverviewTabProps {
  onTabChange: (tab: TabKey) => void;
}

export function OverviewTab({ onTabChange }: OverviewTabProps) {
  const { data: stats, isLoading } = useGetStats();

  const val = (v: bigint | undefined) => (isLoading ? "..." : String(v ?? 0n));

  const kpis = [
    {
      label: "Total Users",
      value: val(stats?.totalUsers),
      icon: <Users className="h-6 w-6" />,
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.1)",
      tab: "users" as TabKey,
    },
    {
      label: "Loan Applications",
      value: val(stats?.totalLoans),
      icon: <CreditCard className="h-6 w-6" />,
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.1)",
      tab: "loans" as TabKey,
    },
    {
      label: "Franchise Applications",
      value: val(stats?.totalFranchises),
      icon: <Store className="h-6 w-6" />,
      color: "#8B5CF6",
      bg: "rgba(139,92,246,0.1)",
      tab: "franchise" as TabKey,
    },
    {
      label: "Letters Generated",
      value: val(stats?.totalLetters),
      icon: <FileText className="h-6 w-6" />,
      color: "#EC4899",
      bg: "rgba(236,72,153,0.1)",
      tab: "letters" as TabKey,
    },
    {
      label: "Gallery Items",
      value: val(stats?.totalGalleryItems),
      icon: <Image className="h-6 w-6" />,
      color: "#14B8A6",
      bg: "rgba(20,184,166,0.1)",
      tab: "gallery" as TabKey,
    },
    {
      label: "Documents",
      value: val(stats?.totalDocuments),
      icon: <FolderOpen className="h-6 w-6" />,
      color: "#C7A24A",
      bg: "rgba(199,162,74,0.1)",
      tab: "documents" as TabKey,
    },
    {
      label: "KYC Records",
      value: val(stats?.totalKYC),
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "#22C55E",
      bg: "rgba(34,197,94,0.1)",
      tab: "kyc" as TabKey,
    },
    {
      label: "System Status",
      value: "Operational",
      icon: <CheckCircle2 className="h-6 w-6" />,
      color: "#22C55E",
      bg: "rgba(34,197,94,0.1)",
      tab: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>
          Welcome back, <span style={{ color: "#142D4A" }}>Admin</span>!
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            data-ocid={`overview.card.${i + 1}`}
            className="rounded-xl p-5 cursor-pointer hover:shadow-lg transition-shadow"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onClick={() => kpi.tab && onTabChange(kpi.tab)}
          >
            <div className="flex items-start justify-between">
              <div
                className="p-2.5 rounded-lg"
                style={{ background: kpi.bg, color: kpi.color }}
              >
                {kpi.icon}
              </div>
              {kpi.tab && (
                <ArrowRight
                  className="h-4 w-4 mt-1"
                  style={{ color: "#D1D5DB" }}
                />
              )}
            </div>
            <p
              className="text-3xl font-bold mt-3 leading-none"
              style={{ color: "#111827" }}
            >
              {kpi.value}
            </p>
            <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
              {kpi.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl p-6"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <h2
          className="text-base font-semibold mb-4"
          style={{ color: "#111827" }}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Create User",
              tab: "users",
              icon: "👤",
              color: "#3B82F6",
            },
            { label: "View Loans", tab: "loans", icon: "💰", color: "#F59E0B" },
            {
              label: "Write Letter",
              tab: "letters",
              icon: "✉️",
              color: "#EC4899",
            },
            {
              label: "Upload Gallery",
              tab: "gallery",
              icon: "🖼️",
              color: "#14B8A6",
            },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              data-ocid={`overview.${action.tab}.button`}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-transparent hover:border-current transition-all text-sm font-medium"
              style={{
                background: `${action.color}10`,
                color: action.color,
              }}
              onClick={() => onTabChange(action.tab as TabKey)}
            >
              <span className="text-2xl">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
