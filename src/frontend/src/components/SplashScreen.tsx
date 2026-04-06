import { motion } from "motion/react";
import { useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background:
          "linear-gradient(135deg, #0B1C30 0%, #142D4A 50%, #0D2239 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C7A24A 0, #C7A24A 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="flex flex-col items-center gap-8"
      >
        {/* Spinning logo container */}
        <div className="relative">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(199,162,74,0.15) 0%, transparent 70%)",
              transform: "scale(1.5)",
            }}
          />
          {/* Spinning ring */}
          <div
            className="absolute inset-[-8px] rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "#C7A24A",
              borderRightColor: "rgba(199,162,74,0.3)",
              animation: "logo-spin 1.5s linear infinite",
            }}
          />
          {/* Second counter-spin ring */}
          <div
            className="absolute inset-[-16px] rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "#C7A24A",
              borderLeftColor: "rgba(199,162,74,0.2)",
              animation: "logo-spin 3s linear infinite reverse",
            }}
          />

          {/* Logo image */}
          <img
            src="/assets/generated/anshika-udhyog-logo-transparent.dim_400x400.png"
            alt="Anshika Udhyog Group Logo"
            className="relative z-10 rounded-full"
            style={{ width: 160, height: 160 }}
          />
        </div>

        {/* Company name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <h1
            className="text-3xl font-bold tracking-widest uppercase mb-2"
            style={{ color: "#C7A24A", letterSpacing: "0.2em" }}
          >
            ANSHIKA UDHYOG GROUP
          </h1>
          <p
            className="text-sm tracking-[0.3em] uppercase"
            style={{ color: "rgba(199,162,74,0.6)" }}
          >
            ™ Official Administration Portal
          </p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-48 h-0.5 rounded-full overflow-hidden"
          style={{ background: "rgba(199,162,74,0.2)" }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.6, ease: "linear" }}
            className="h-full rounded-full"
            style={{ background: "#C7A24A" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
