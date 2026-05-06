import {
  Activity,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  Layout,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import StatsView from "./StatsView";
const IKUView = lazy(() => import("./IKUView"));
import { nodes } from "./dashboard-data";

function CDCLiveIndicator({ color }: { color: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0 flex items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          className="stroke-slate-200 dark:stroke-[#2e303a]"
          strokeWidth="3"
        />
        <motion.circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            strokeDasharray: ["1, 100", "150, 100", "1, 100"],
            strokeDashoffset: [0, -100, -200],
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
          }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="size-1.5 rounded-full mb-0.5"
          style={{ backgroundColor: color }}
        />
        <span
          className="text-[8px] font-black uppercase tracking-tighter"
          style={{ color }}
        >
          CDC
        </span>
      </div>
    </div>
  );
}

export default function EISMobileDashboard() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"dashboard" | "stats" | "iku">(
    "dashboard",
  );

  const sectors = nodes.filter((n) => n.kind === "sector");
  const hub = nodes.find((n) => n.kind === "hub");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] p-4 pb-32 font-sans transition-colors duration-500">
      <AnimatePresence mode="wait">
        {activeView === "dashboard" ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header Hub Section */}
            <div className="mb-8 pt-4 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative mb-4"
              >
                <div className="absolute -inset-4 rounded-full blur-2xl animate-pulse bg-[#ff8c42]/20 dark:bg-[#ff8c42]/40" />
                <div className="relative size-16 rounded-full flex items-center justify-center shadow-xl shadow-[#ff8c42]/30 dark:shadow-[#ff8c42]/50 border border-white/10 dark:border-white/20 bg-[#e66c1f] dark:bg-[#ff8c42]">
                  <Activity className="size-8 text-white dark:text-[#0a0a0c]" />
                </div>
              </motion.div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">
                {hub?.label || "EIS Dashboard"}
              </h1>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 opacity-60">
                Executive Information System
              </p>
            </div>

            {/* Grid of Cards */}
            <div className="grid gap-4">
              {/* SPECIAL GOLD IKU CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${
                  expandedId === "iku-card"
                    ? "bg-amber-500/5 dark:bg-amber-500/5 border-amber-500/30 shadow-xl shadow-amber-500/5"
                    : "bg-white/80 dark:bg-[#14151a]/80 border-slate-200 dark:border-[#2e303a] shadow-sm backdrop-blur-md"
                }`}
              >
                {/* Header Container */}
                <div
                  onClick={() =>
                    setExpandedId(expandedId === "iku-card" ? null : "iku-card")
                  }
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative size-12 rounded-full flex items-center justify-center text-white bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20 shrink-0">
                      <div className="absolute inset-0 rounded-full bg-amber-500 blur-md opacity-30 animate-pulse" />
                      <Sparkles size={18} className="relative z-10" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                        IKU Dashboard
                        <span className="px-1.5 py-0.5 rounded-md text-[8px] font-black bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          HOT
                        </span>
                      </h3>
                      <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest truncate">
                        Strategic Performance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: expandedId === "iku-card" ? 180 : 0 }}
                      className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
                    >
                      <ChevronDown size={16} className="text-slate-500" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === "iku-card" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="p-6 space-y-6">
                        <div className="p-5 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                                IKU Core Hub Monitor
                              </span>
                              <div className="flex items-center gap-2 mt-1">
                                <motion.div
                                  animate={{ opacity: [1, 0.4, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="size-2 rounded-full bg-amber-500"
                                />
                                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                                  9 Indicators Synced
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 pl-1">
                            Sistem pemantauan target capaian Indikator Kinerja
                            Utama Perguruan Tinggi yang diintegrasikan langsung
                            dari seluruh sektor.
                          </p>
                        </div>

                        {/* Action Navigation Button */}
                        <button
                          onClick={() => setActiveView("iku")}
                          className="w-full flex items-center justify-center gap-3 p-4 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                        >
                          <span>Buka IKU Dashboard</span>
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {sectors.map((node, index) => {
                const isExpanded = expandedId === node.id;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${
                      isExpanded
                        ? "bg-white dark:bg-[#14151a] border-primary/20 shadow-2xl"
                        : "bg-white/80 dark:bg-[#14151a]/80 border-slate-200 dark:border-[#2e303a] shadow-sm backdrop-blur-md"
                    }`}
                  >
                    {/* Header Container */}
                    <div
                      onClick={() => setExpandedId(isExpanded ? null : node.id)}
                      className="p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className="size-12 rounded-full flex items-center justify-center text-white shadow-lg"
                          style={{ backgroundColor: node.color }}
                        >
                          {node.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-black text-slate-900 dark:text-white truncate">
                            {node.title}
                          </h3>
                          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate">
                            {node.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isExpanded && <CDCLiveIndicator color={node.color} />}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
                        >
                          <ChevronDown size={16} className="text-slate-500" />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-100 dark:border-slate-800"
                        >
                          <div className="p-6 space-y-6">
                            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    CDC Activity Monitor
                                  </span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <motion.div
                                      animate={{ opacity: [1, 0.4, 1] }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                      }}
                                      className="size-2 rounded-full bg-emerald-500"
                                    />
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                                      Real-time Streaming
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-[8px] font-black text-slate-400 uppercase">
                                    Latency
                                  </span>
                                  <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                                    12ms
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 h-8 px-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900 overflow-hidden">
                                {[...Array(12)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    animate={{
                                      height: [
                                        "20%",
                                        `${20 + Math.random() * 60}%`,
                                        `${10 + Math.random() * 40}%`,
                                        "20%",
                                      ],
                                    }}
                                    transition={{
                                      duration: 0.5 + Math.random() * 0.5,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                    className="w-full min-w-[3px] rounded-full"
                                    style={{
                                      backgroundColor: node.color,
                                      opacity: 0.3 + (i / 12) * 0.7,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">
                                Diagnostic Log
                              </h4>
                              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 pl-1">
                                {node.details}
                              </p>
                            </div>
                            {node.menuItems && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 pl-1 mb-2">
                                  <Layout size={14} className="text-primary" />
                                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                    Quick Navigation
                                  </h4>
                                </div>
                                <div className="grid gap-2">
                                  {node.menuItems.map((item, idx) => (
                                    <button
                                      key={idx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (item.path !== "#")
                                          navigate(item.path);
                                      }}
                                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                                        item.path === "#"
                                          ? "opacity-40 grayscale pointer-events-none bg-slate-50 dark:bg-slate-900/40 border-transparent"
                                          : "bg-white dark:bg-[#1c1d22] border-slate-200 dark:border-slate-800 shadow-sm active:scale-95"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-primary/5 text-primary">
                                          <Sparkles size={14} />
                                        </div>
                                        <span className="font-bold text-xs text-slate-700 dark:text-slate-200">
                                          {item.label}
                                        </span>
                                      </div>
                                      {item.path !== "#" ? (
                                        <ArrowUpRight
                                          size={16}
                                          className="text-primary"
                                        />
                                      ) : (
                                        <span className="text-[8px] font-black uppercase text-slate-400">
                                          Soon
                                        </span>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : activeView === "stats" ? (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="pt-4"
          >
            <StatsView />
          </motion.div>
        ) : (
          <motion.div
            key="iku"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="pt-4"
          >
            <Suspense
              fallback={
                <div className="flex h-[50vh] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
                </div>
              }
            >
              <IKUView />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-6 left-4 right-4 z-100 flex justify-center">
        <div className="flex items-center gap-1 p-1.5 rounded-[2rem] bg-white/80 dark:bg-[#14151a]/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "stats", label: "Statistik", icon: BarChart3 },
            { id: "iku", label: "IKU", icon: Sparkles },
          ].map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`relative flex items-center gap-2 ${tab.id === "stats" ? "px-4" : "px-6"} py-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white dark:text-slate-950"
                    : "text-slate-500 active:scale-90"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 bg-primary dark:bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon size={18} className="relative z-10" />
                {tab.id !== "stats" && (
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
                    {tab.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
