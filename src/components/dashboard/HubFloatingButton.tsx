import { useHubPortal } from "@/contexts/HubPortalContext";
import { LayoutDashboard } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router-dom";

export function HubFloatingButton() {
  const { pathname } = useLocation();
  const { toggleHub } = useHubPortal();

  // Do not show the button on the main dashboard pages
  const isDashboard = pathname === "/" || pathname === "/dashboard";

  return (
    <AnimatePresence>
      {!isDashboard && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleHub}
          className="fixed bottom-6 right-6 z-150 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)] ring-4 ring-white/50 dark:ring-slate-900/50 transition-colors"
          title="Open EIS Core Hub"
        >
          <LayoutDashboard size={24} />
          {/* Subtle pulse ring behind the button */}
          <div className="absolute inset-0 rounded-full border border-slate-900 dark:border-white animate-ping opacity-20" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
