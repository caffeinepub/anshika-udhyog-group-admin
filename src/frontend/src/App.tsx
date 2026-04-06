import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { User } from "./backend";
import { LoginPage } from "./components/LoginPage";
import { SplashScreen } from "./components/SplashScreen";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { UserDashboard } from "./components/user/UserDashboard";

export type AppView = "splash" | "login" | "admin-dashboard" | "user-dashboard";

export default function App() {
  const [view, setView] = useState<AppView>("splash");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const handleLogin = (user: User | null, role: "admin" | "user") => {
    setLoggedInUser(user);
    if (role === "admin") {
      setView("admin-dashboard");
    } else {
      setView("user-dashboard");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setView("login");
  };

  return (
    <AnimatePresence mode="wait">
      {view === "splash" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SplashScreen onComplete={() => setView("login")} />
        </motion.div>
      )}

      {view === "login" && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoginPage onLogin={handleLogin} />
        </motion.div>
      )}

      {view === "admin-dashboard" && (
        <motion.div
          key="admin-dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardLayout onLogout={handleLogout} />
        </motion.div>
      )}

      {view === "user-dashboard" && loggedInUser && (
        <motion.div
          key="user-dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <UserDashboard user={loggedInUser} onLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
