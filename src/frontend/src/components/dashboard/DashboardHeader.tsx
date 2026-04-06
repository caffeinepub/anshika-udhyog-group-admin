import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, LogOut, Mail, Search, User } from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  onLogout: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const [search, setSearch] = useState("");

  return (
    <header
      className="no-print fixed top-0 left-0 right-0 z-40 flex items-center gap-4 px-6 h-16"
      style={{
        background: "linear-gradient(90deg, #0B1C30 0%, #142D4A 100%)",
        borderBottom: "1px solid rgba(199,162,74,0.15)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 min-w-fit">
        <div
          className="rounded-full flex-shrink-0 overflow-hidden"
          style={{
            border: "2px solid rgba(199,162,74,0.4)",
            width: 38,
            height: 38,
          }}
        >
          <img
            src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
            alt="AUG"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block">
          <p
            className="text-sm font-bold tracking-wider leading-none"
            style={{ color: "#C7A24A" }}
          >
            ANSHIKA UDHYOG GROUP™
          </p>
          <p
            className="text-[10px] tracking-widest"
            style={{ color: "rgba(199,162,74,0.5)" }}
          >
            ADMIN PORTAL
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "rgba(255,255,255,0.3)" }}
          />
          <input
            data-ocid="dashboard.search_input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search letters, documents, gallery..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg outline-none placeholder:text-white/30 text-white"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button
          type="button"
          data-ocid="dashboard.button"
          className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#C7A24A" }}
          />
        </button>
        <button
          type="button"
          data-ocid="dashboard.button"
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <Mail className="h-5 w-5" />
        </button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-ocid="dashboard.dropdown_menu"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: "#C7A24A", color: "#0B1C30" }}
              >
                A
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold leading-none text-white">
                  admin
                </p>
                <p
                  className="text-[10px] leading-none mt-0.5"
                  style={{ color: "#C7A24A" }}
                >
                  Admin
                </p>
              </div>
              <ChevronDown
                className="h-3.5 w-3.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40"
            style={{
              background: "#142D4A",
              border: "1px solid rgba(199,162,74,0.2)",
            }}
          >
            <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              data-ocid="dashboard.button"
              className="cursor-pointer"
              style={{ color: "#fca5a5" }}
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
