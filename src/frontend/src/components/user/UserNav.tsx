import type { User } from "@/backend";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Briefcase,
  Building2,
  ChevronRight,
  CreditCard,
  FileCheck,
  FileText,
  GitBranch,
  Home,
  IdCard,
  Info,
  KeyRound,
  LayoutGrid,
  LogOut,
  Medal,
  Package,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Star,
  TrendingUp,
  Truck,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";

export type UserSection =
  | "home"
  | "loan"
  | "franchise"
  | "about"
  | "services"
  | "income"
  | "wallet"
  | "withdrawal"
  | "kyc"
  | "idcard"
  | "certificate"
  | "official-letter"
  | "official-order"
  | "official-access"
  | "work"
  | "notifications"
  | "shopping"
  | "utilities"
  | "b2b"
  | "income-plan"
  | "team-tree"
  | "machine"
  | "raw-material"
  | "sales"
  | "marketing";

const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      {
        key: "home" as UserSection,
        label: "Home",
        icon: <Home className="h-4 w-4" />,
        emoji: "🏠",
      },
      {
        key: "notifications" as UserSection,
        label: "Notifications",
        icon: <Bell className="h-4 w-4" />,
        emoji: "🔔",
      },
      {
        key: "wallet" as UserSection,
        label: "Wallet",
        icon: <Wallet className="h-4 w-4" />,
        emoji: "💰",
      },
    ],
  },
  {
    label: "Applications",
    items: [
      {
        key: "loan" as UserSection,
        label: "Loan Apply",
        icon: <CreditCard className="h-4 w-4" />,
        emoji: "💳",
      },
      {
        key: "franchise" as UserSection,
        label: "Franchise Apply",
        icon: <Building2 className="h-4 w-4" />,
        emoji: "🏪",
      },
      {
        key: "kyc" as UserSection,
        label: "KYC",
        icon: <ShieldCheck className="h-4 w-4" />,
        emoji: "🛡️",
      },
      {
        key: "withdrawal" as UserSection,
        label: "Withdrawal",
        icon: <TrendingUp className="h-4 w-4" />,
        emoji: "💸",
      },
    ],
  },
  {
    label: "Documents",
    items: [
      {
        key: "idcard" as UserSection,
        label: "ID Card",
        icon: <IdCard className="h-4 w-4" />,
        emoji: "📳",
      },
      {
        key: "certificate" as UserSection,
        label: "Certificate",
        icon: <Medal className="h-4 w-4" />,
        emoji: "🏅",
      },
      {
        key: "official-letter" as UserSection,
        label: "Official Letter",
        icon: <FileText className="h-4 w-4" />,
        emoji: "✉️",
      },
      {
        key: "official-order" as UserSection,
        label: "Official Order",
        icon: <ScrollText className="h-4 w-4" />,
        emoji: "📝",
      },
      {
        key: "official-access" as UserSection,
        label: "Official Access",
        icon: <KeyRound className="h-4 w-4" />,
        emoji: "🔑",
      },
    ],
  },
  {
    label: "Business",
    items: [
      {
        key: "work" as UserSection,
        label: "Work",
        icon: <Briefcase className="h-4 w-4" />,
        emoji: "💼",
      },
      {
        key: "shopping" as UserSection,
        label: "Shopping",
        icon: <ShoppingBag className="h-4 w-4" />,
        emoji: "🛍️",
      },
      {
        key: "utilities" as UserSection,
        label: "Utilities",
        icon: <Zap className="h-4 w-4" />,
        emoji: "⚡",
      },
      {
        key: "b2b" as UserSection,
        label: "B2B Marketing",
        icon: <Star className="h-4 w-4" />,
        emoji: "⭐",
      },
      {
        key: "income-plan" as UserSection,
        label: "Income Plan",
        icon: <LayoutGrid className="h-4 w-4" />,
        emoji: "📊",
      },
      {
        key: "team-tree" as UserSection,
        label: "Branch/Team Tree",
        icon: <GitBranch className="h-4 w-4" />,
        emoji: "🌳",
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        key: "machine" as UserSection,
        label: "Machine",
        icon: <Wrench className="h-4 w-4" />,
        emoji: "⚙️",
      },
      {
        key: "raw-material" as UserSection,
        label: "Raw Material",
        icon: <Package className="h-4 w-4" />,
        emoji: "📦",
      },
      {
        key: "sales" as UserSection,
        label: "Sales",
        icon: <FileCheck className="h-4 w-4" />,
        emoji: "📈",
      },
      {
        key: "marketing" as UserSection,
        label: "Marketing",
        icon: <Truck className="h-4 w-4" />,
        emoji: "📣",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        key: "about" as UserSection,
        label: "About Us",
        icon: <Info className="h-4 w-4" />,
        emoji: "ℹ️",
      },
      {
        key: "services" as UserSection,
        label: "Services",
        icon: <Star className="h-4 w-4" />,
        emoji: "🌟",
      },
      {
        key: "income" as UserSection,
        label: "Multiple Income",
        icon: <TrendingUp className="h-4 w-4" />,
        emoji: "📅",
      },
    ],
  },
];

// Bottom nav shows only main items
const BOTTOM_NAV_ITEMS = [
  {
    key: "home" as UserSection,
    label: "Home",
    icon: <Home className="h-5 w-5" />,
    emoji: "🏠",
  },
  {
    key: "wallet" as UserSection,
    label: "Wallet",
    icon: <Wallet className="h-5 w-5" />,
    emoji: "💰",
  },
  {
    key: "shopping" as UserSection,
    label: "Shop",
    icon: <ShoppingBag className="h-5 w-5" />,
    emoji: "🛍️",
  },
  {
    key: "notifications" as UserSection,
    label: "Alerts",
    icon: <Bell className="h-5 w-5" />,
    emoji: "🔔",
  },
  {
    key: "idcard" as UserSection,
    label: "ID Card",
    icon: <IdCard className="h-5 w-5" />,
    emoji: "📳",
  },
];

interface UserNavProps {
  activeSection: UserSection;
  onSectionChange: (section: UserSection) => void;
  user: User;
  onLogout: () => void;
  variant: "sidebar" | "bottom";
}

export function UserNav({
  activeSection,
  onSectionChange,
  user,
  onLogout,
  variant,
}: UserNavProps) {
  if (variant === "bottom") {
    return (
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 h-16"
        style={{
          background: "linear-gradient(180deg, #0B1C30, #142D4A)",
          borderTop: "1px solid rgba(199,162,74,0.15)",
        }}
      >
        {BOTTOM_NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            data-ocid={`usernav.${item.key}.tab`}
            onClick={() => onSectionChange(item.key)}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors"
            style={{
              color:
                activeSection === item.key
                  ? "#C7A24A"
                  : "rgba(255,255,255,0.45)",
            }}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  // Sidebar
  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 w-64"
      style={{
        background: "linear-gradient(180deg, #0B1C30 0%, #142D4A 100%)",
        borderRight: "1px solid rgba(199,162,74,0.12)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: "rgba(199,162,74,0.12)" }}
      >
        <img
          src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
          alt="AUG"
          className="w-10 h-10 rounded-full flex-shrink-0"
          style={{ border: "2px solid rgba(199,162,74,0.4)" }}
        />
        <div>
          <p
            className="text-xs font-bold tracking-wider"
            style={{ color: "#C7A24A" }}
          >
            ANSHIKA UDHYOG
          </p>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            GROUP™
          </p>
        </div>
      </div>

      {/* User profile */}
      <div
        className="flex items-center gap-3 px-4 py-3 mx-3 my-3 rounded-xl"
        style={{
          background: "rgba(199,162,74,0.08)",
          border: "1px solid rgba(199,162,74,0.15)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: "#C7A24A", color: "#0B1C30" }}
        >
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate text-white">
            {user.fullName}
          </p>
          <p
            className="text-[10px] truncate"
            style={{ color: "rgba(199,162,74,0.7)" }}
          >
            @{user.username}
          </p>
        </div>
      </div>

      {/* Nav groups */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 pb-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest px-2 mb-1"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeSection === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      data-ocid={`usernav.${item.key}.tab`}
                      onClick={() => onSectionChange(item.key)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
                      style={{
                        background: isActive
                          ? "rgba(199,162,74,0.15)"
                          : "transparent",
                        color: isActive ? "#C7A24A" : "rgba(255,255,255,0.6)",
                        borderLeft: isActive
                          ? "3px solid #C7A24A"
                          : "3px solid transparent",
                      }}
                    >
                      <span className="flex-shrink-0">{item.emoji}</span>
                      <span>{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Logout */}
      <div
        className="p-3 border-t"
        style={{ borderColor: "rgba(199,162,74,0.12)" }}
      >
        <button
          type="button"
          data-ocid="usernav.logout.button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{ color: "rgba(239,68,68,0.8)" }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
