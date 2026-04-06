import {
  CreditCard,
  FileText,
  FolderOpen,
  Image,
  LayoutDashboard,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";

export type TabKey =
  | "dashboard"
  | "letters"
  | "gallery"
  | "documents"
  | "users"
  | "loans"
  | "franchise"
  | "kyc";

interface DashboardNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    key: "users",
    label: "Users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: "loans",
    label: "Loans",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    key: "franchise",
    label: "Franchise",
    icon: <Store className="h-4 w-4" />,
  },
  {
    key: "kyc",
    label: "KYC",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    key: "letters",
    label: "Letters",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    key: "gallery",
    label: "Gallery",
    icon: <Image className="h-4 w-4" />,
  },
  {
    key: "documents",
    label: "Documents",
    icon: <FolderOpen className="h-4 w-4" />,
  },
];

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  return (
    <nav
      className="no-print fixed top-16 left-0 right-0 z-30 flex items-center px-6 h-12 overflow-x-auto gap-1"
      style={{
        background: "#142D4A",
        borderBottom: "1px solid rgba(199,162,74,0.12)",
        scrollbarWidth: "none",
      }}
    >
      {TABS.map((tab) => (
        <button
          type="button"
          key={tab.key}
          data-ocid={`nav.${tab.key}.tab`}
          onClick={() => onTabChange(tab.key)}
          className="flex items-center gap-2 px-4 h-full text-sm font-medium whitespace-nowrap transition-colors relative"
          style={{
            color: activeTab === tab.key ? "#C7A24A" : "rgba(255,255,255,0.55)",
          }}
        >
          {tab.icon}
          {tab.label}
          {activeTab === tab.key && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: "#C7A24A" }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
