import { useHubPortal } from "@/contexts/HubPortalContext";
import { Activity, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { nodes } from "../../pages/dashboard/dashboard-data";

export function GlobalHubPortal() {
  const { isOpen, setIsOpen } = useHubPortal();
  const navigate = useNavigate();

  const sectors = nodes.filter((n) => n.kind === "sector");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-7xl max-h-[90vh] bg-white dark:bg-[#14151a] rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Portal Header */}
            <div className="p-8 sm:p-12 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-primary">
                  <Activity size={24} className="animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">
                    Central Intelligence Portal
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                  EIS Core <span className="text-primary">Hub</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                  Pusat komando seluruh modul eksekutif. Akses cepat ke setiap
                  departemen dan analitik strategis dalam satu antarmuka.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
              >
                Tutup Portal
              </button>
            </div>

            {/* Portal Content - Grid of Modules */}
            <div
              className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar"
              style={{
                willChange: "scroll-position",
                transform: "translateZ(0)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {sectors.map((sector, idx) => (
                  <motion.div
                    key={sector.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 hover:border-primary/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
                    style={{
                      contentVisibility: "auto",
                      containIntrinsicSize: "0 300px",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="size-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{ backgroundColor: sector.color }}
                      >
                        {sector.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                          {sector.title}
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {sector.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {sector.menuItems?.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (item.path !== "#") {
                              navigate(item.path);
                              setIsOpen(false);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                            item.path === "#"
                              ? "opacity-30 cursor-not-allowed"
                              : "hover:bg-primary/5 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                          }`}
                        >
                          <span className="text-xs font-bold truncate">
                            {item.label}
                          </span>
                          {item.path !== "#" && (
                            <ArrowUpRight
                              size={12}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
