import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNav, type TabKey } from "./DashboardNav";
import { DocumentTab } from "./DocumentTab";
import { FranchiseTab } from "./FranchiseTab";
import { GalleryTab } from "./GalleryTab";
import { KYCTab } from "./KYCTab";
import { LetterTab } from "./LetterTab";
import { LoansTab } from "./LoansTab";
import { OverviewTab } from "./OverviewTab";
import { UsersTab } from "./UsersTab";

interface DashboardLayoutProps {
  onLogout: () => void;
}

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

  return (
    <div className="min-h-screen" style={{ background: "#EEF2F6" }}>
      <DashboardHeader onLogout={onLogout} />
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content — offset for fixed header + nav */}
      <main className="pt-28 px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === "dashboard" && (
            <OverviewTab onTabChange={setActiveTab} />
          )}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "loans" && <LoansTab />}
          {activeTab === "franchise" && <FranchiseTab />}
          {activeTab === "kyc" && <KYCTab />}
          {activeTab === "letters" && <LetterTab />}
          {activeTab === "gallery" && <GalleryTab />}
          {activeTab === "documents" && <DocumentTab />}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="no-print py-4 text-center text-xs"
        style={{
          background: "#0B1C30",
          color: "rgba(255,255,255,0.35)",
          borderTop: "1px solid rgba(199,162,74,0.1)",
        }}
      >
        © {new Date().getFullYear()} Anshika Udhyog Group™. Built with{" "}
        <span style={{ color: "#C7A24A" }}>♥</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors"
          style={{ color: "rgba(199,162,74,0.6)" }}
        >
          caffeine.ai
        </a>
      </footer>

      <Toaster />
    </div>
  );
}
