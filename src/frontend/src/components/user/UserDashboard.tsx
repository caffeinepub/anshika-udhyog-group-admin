import type { User } from "@/backend";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { UserNav, type UserSection } from "./UserNav";
import { AboutSection } from "./sections/AboutSection";
import { B2BMarketingSection } from "./sections/B2BMarketingSection";
import { CertificateSection } from "./sections/CertificateSection";
import { FranchiseSection } from "./sections/FranchiseSection";
import { HomeSection } from "./sections/HomeSection";
import { IDCardSection } from "./sections/IDCardSection";
import { IncomePlanSection } from "./sections/IncomePlanSection";
import { KYCSection } from "./sections/KYCSection";
import { LoanSection } from "./sections/LoanSection";
import { MachineSection } from "./sections/MachineSection";
import { MarketingSection } from "./sections/MarketingSection";
import { MultipleIncomeSection } from "./sections/MultipleIncomeSection";
import { NotificationsSection } from "./sections/NotificationsSection";
import { OfficialAccessSection } from "./sections/OfficialAccessSection";
import { OfficialLetterSection } from "./sections/OfficialLetterSection";
import { OfficialOrderSection } from "./sections/OfficialOrderSection";
import { RawMaterialSection } from "./sections/RawMaterialSection";
import { SalesSection } from "./sections/SalesSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ShoppingSection } from "./sections/ShoppingSection";
import { TeamTreeSection } from "./sections/TeamTreeSection";
import { UtilitiesSection } from "./sections/UtilitiesSection";
import { WalletSection } from "./sections/WalletSection";
import { WithdrawalSection } from "./sections/WithdrawalSection";
import { WorkSection } from "./sections/WorkSection";

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

export function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [section, setSection] = useState<UserSection>("home");

  const renderSection = () => {
    switch (section) {
      case "home":
        return <HomeSection user={user} onNavigate={setSection} />;
      case "loan":
        return <LoanSection user={user} />;
      case "franchise":
        return <FranchiseSection user={user} />;
      case "about":
        return <AboutSection />;
      case "services":
        return <ServicesSection />;
      case "income":
        return <MultipleIncomeSection />;
      case "wallet":
        return <WalletSection user={user} />;
      case "withdrawal":
        return <WithdrawalSection />;
      case "kyc":
        return <KYCSection user={user} />;
      case "idcard":
        return <IDCardSection user={user} />;
      case "certificate":
        return <CertificateSection />;
      case "official-letter":
        return <OfficialLetterSection />;
      case "official-order":
        return <OfficialOrderSection />;
      case "official-access":
        return <OfficialAccessSection user={user} />;
      case "work":
        return <WorkSection />;
      case "notifications":
        return <NotificationsSection />;
      case "shopping":
        return <ShoppingSection />;
      case "utilities":
        return <UtilitiesSection />;
      case "b2b":
        return <B2BMarketingSection />;
      case "income-plan":
        return <IncomePlanSection />;
      case "team-tree":
        return <TeamTreeSection />;
      case "machine":
        return <MachineSection />;
      case "raw-material":
        return <RawMaterialSection />;
      case "sales":
        return <SalesSection />;
      case "marketing":
        return <MarketingSection />;
      default:
        return <HomeSection user={user} onNavigate={setSection} />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F0F4F8" }}>
      {/* Sidebar (desktop) */}
      <UserNav
        activeSection={section}
        onSectionChange={setSection}
        user={user}
        onLogout={onLogout}
        variant="sidebar"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Top bar (mobile) */}
        <header
          className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14"
          style={{
            background: "linear-gradient(90deg, #0B1C30, #142D4A)",
            borderBottom: "1px solid rgba(199,162,74,0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
              alt="AUG"
              className="w-8 h-8 rounded-full"
              style={{ border: "1px solid rgba(199,162,74,0.4)" }}
            />
            <span className="text-sm font-bold" style={{ color: "#C7A24A" }}>
              AUG™
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "#C7A24A", color: "#0B1C30" }}
            >
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-24 lg:pb-8 px-4 py-4 lg:px-8 lg:py-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer
          className="hidden lg:block py-3 text-center text-xs"
          style={{
            background: "#0B1C30",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          © {new Date().getFullYear()} Anshika Udhyog Group™. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "rgba(199,162,74,0.6)" }}
          >
            caffeine.ai
          </a>
        </footer>
      </div>

      {/* Bottom Nav (mobile) */}
      <UserNav
        activeSection={section}
        onSectionChange={setSection}
        user={user}
        onLogout={onLogout}
        variant="bottom"
      />

      <Toaster />
    </div>
  );
}
