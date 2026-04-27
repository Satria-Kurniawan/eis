import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { GraduationCap, Users, Users2 } from "lucide-react";
import { MhsStatsTab } from "./components/stats/MhsStatsTab";
import { DosenStatsTab } from "./components/stats/DosenStatsTab";
import { PegawaiStatsTab } from "./components/stats/PegawaiStatsTab";

export default function StatsView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const subTab =
    (searchParams.get("tab") as "mhs" | "dosen" | "pegawai") || "mhs";

  const setSubTab = (tab: "mhs" | "dosen" | "pegawai") => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 py-6 transition-all duration-500">
      {/* Premium Tab Switcher */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Intelligence <span className="text-primary">Center</span>
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
            Data Insights & Analytics Engine
          </p>
        </div>

        <div className="p-1.5 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1 shadow-inner dark:shadow-black/40 transition-colors duration-500">
          {[
            { id: "mhs", label: "Mahasiswa", icon: Users },
            { id: "dosen", label: "Dosen", icon: GraduationCap },
            { id: "pegawai", label: "Pegawai", icon: Users2 },
          ].map((tab) => {
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`relative px-6 sm:px-8 py-3 rounded-2xl flex items-center justify-center gap-0 sm:gap-3 transition-all duration-500 ${
                  isActive
                    ? "text-white dark:text-slate-900"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="statsSubTab"
                    className="absolute inset-0 bg-primary dark:bg-white rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <tab.icon
                  size={18}
                  className={`relative z-10 ${isActive ? "text-white dark:text-slate-900" : ""}`}
                />
                <span className="relative z-10 text-xs font-black uppercase tracking-widest hidden sm:block">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-2">
        <AnimatePresence mode="wait">
          {subTab === "mhs" && (
            <motion.div key="mhs">
              <MhsStatsTab />
            </motion.div>
          )}
          {subTab === "dosen" && (
            <motion.div key="dosen">
              <DosenStatsTab />
            </motion.div>
          )}
          {subTab === "pegawai" && (
            <motion.div key="pegawai">
              <PegawaiStatsTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
