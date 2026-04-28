import { Skeleton } from "@/components/ui/skeleton";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useDosenDrilldown } from "@/hooks/dashboard/use-dosen-drilldown";
import { useDosenOverview } from "@/hooks/dashboard/use-dosen-overview";
import {
  fetchStatusKeaktifan,
  fetchStatusPegawai,
} from "@/services/dashboard/dosen";
import { useQuery } from "@tanstack/react-query";
import { Activity, Users2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { DrilldownChart } from "./DrilldownChart";
import { StatCard } from "./StatCard";

export function DosenStatsTab() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isStatsView = searchParams.get("view") === "stats";
  const isDosenTab = searchParams.get("tab") === "dosen";
  const isEnabled = isStatsView && isDosenTab;

  const { data: statusPegawaiList } = useQuery({
    queryKey: ["status-pegawai-list"],
    queryFn: fetchStatusPegawai,
    enabled: isEnabled,
  });

  const { data: statusKeaktifanList } = useQuery({
    queryKey: ["status-keaktifan-list"],
    queryFn: fetchStatusKeaktifan,
    enabled: isEnabled,
  });

  const { data: dosenData, isLoading: isDosenLoading } = useDosenOverview(isEnabled);
  const {
    data: dosenDrilldownData,
    isLoading: isDosenDrilldownLoading,
    currentLevel: dosenLevel,
  } = useDosenDrilldown(isEnabled);

  const {
    setKodeFakultas,
    setKodeJurusan,
    setKodeProdi,
    kodeFakultas,
    kodeJurusan,
  } = useUnitFilter();

  const handleDrilldownClick = (
    item: any,
    level: "fakultas" | "jurusan" | "prodi" | string,
  ) => {
    if (level === "fakultas") {
      setKodeFakultas(item.id);
    } else if (level === "jurusan") {
      setKodeJurusan(item.id);
    } else {
      setKodeProdi(item.id);
    }
  };

  const handleGoBack = () => {
    if (dosenLevel === "prodi") {
      setKodeProdi("");
      setKodeJurusan("");
    } else if (dosenLevel === "jurusan") {
      setKodeJurusan("");
      setKodeFakultas("");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dosen Filter Bar - Combined status filter */}
      <div className="space-y-4">
        {/* Status Pegawai */}
        <div className="p-1.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-sm">
          <div className="px-4 py-2 flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 mr-1 shrink-0">
            <Users2 size={16} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Status Pegawai
            </span>
          </div>
          <button
            onClick={() => {
              setSearchParams((prev) => {
                prev.delete("statusPegawai");
                return prev;
              });
            }}
            className={`relative px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shrink-0 ${
              !searchParams.get("statusPegawai")
                ? "text-white dark:text-slate-900 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            }`}
          >
            {!searchParams.get("statusPegawai") && (
              <motion.div
                layoutId="dosenStatusPegawaiTab"
                className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/20"
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
              Semua
            </span>
          </button>
          {statusPegawaiList?.datas.map((status) => {
            const isActive =
              searchParams.get("statusPegawai") === String(status.id_status);
            return (
              <button
                key={status.id_status}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("statusPegawai", String(status.id_status));
                    return prev;
                  });
                }}
                className={`relative px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shrink-0 ${
                  isActive
                    ? "text-white dark:text-slate-900 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dosenStatusPegawaiTab"
                    className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/20"
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.6,
                    }}
                  />
                )}
                <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
                  {status.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status Keaktifan */}
        <div className="p-1.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-sm">
          <div className="px-4 py-2 flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 mr-1 shrink-0">
            <Activity size={16} className="text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Status Keaktifan
            </span>
          </div>
          <button
            onClick={() => {
              setSearchParams((prev) => {
                prev.delete("statusKeaktifan");
                return prev;
              });
            }}
            className={`relative px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shrink-0 ${
              !searchParams.get("statusKeaktifan")
                ? "text-white dark:text-slate-900 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            }`}
          >
            {!searchParams.get("statusKeaktifan") && (
              <motion.div
                layoutId="dosenStatusKeaktifanTab"
                className="absolute inset-0 bg-purple-500 rounded-2xl shadow-lg shadow-purple-500/20"
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
              Semua
            </span>
          </button>
          {statusKeaktifanList?.datas.map((status) => {
            const isActive =
              searchParams.get("statusKeaktifan") === String(status.id_status);
            return (
              <button
                key={status.id_status}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("statusKeaktifan", String(status.id_status));
                    return prev;
                  });
                }}
                className={`relative px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shrink-0 ${
                  isActive
                    ? "text-white dark:text-slate-900 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dosenStatusKeaktifanTab"
                    className="absolute inset-0 bg-purple-500 rounded-2xl shadow-lg shadow-purple-500/20"
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.6,
                    }}
                  />
                )}
                <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
                  {status.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isDosenLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
          {dosenData?.datas.map((stat, idx) => (
            <div
              key={idx}
              className="min-w-[280px] flex-1 lg:flex-none lg:w-[calc(25%-12px)]"
            >
              <StatCard
                title={stat.title}
                value={new Intl.NumberFormat("id-ID").format(stat.value)}
                change={stat.value > 100 ? "+2.4%" : "Stable"}
                icon={
                  stat.title.includes("PNS")
                    ? Users2
                    : stat.title.includes("Aktif")
                      ? Zap
                      : Activity
                }
                color={
                  stat.title.includes("Aktif")
                    ? "#3b82f6"
                    : stat.title.includes("Belajar")
                      ? "#a855f7"
                      : stat.title.includes("Non Aktif")
                        ? "#ef4444"
                        : "#64748b"
                }
              />
            </div>
          ))}
        </div>
      )}

      <DrilldownChart
        title={`Sebaran Dosen per ${dosenLevel === "fakultas" ? "Fakultas" : dosenLevel === "jurusan" ? "Jurusan" : "Prodi"}`}
        subtitle="Academic Workforce Analytics"
        level={dosenLevel}
        data={dosenDrilldownData?.datas || []}
        total={dosenDrilldownData?.total || 0}
        isLoading={isDosenDrilldownLoading}
        onDrilldown={handleDrilldownClick}
        onGoBack={handleGoBack}
        showGoBack={!!(kodeFakultas || kodeJurusan)}
      />
    </div>
  );
}
