import { Skeleton } from "@/components/ui/skeleton";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { usePegawaiDrilldown } from "@/hooks/dashboard/use-pegawai-drilldown";
import { usePegawaiOverview } from "@/hooks/dashboard/use-pegawai-overview";
import {
  fetchStatusKeaktifan,
  fetchStatusPegawai,
} from "@/services/dashboard/dosen";
import { useQuery } from "@tanstack/react-query";
import { Activity, Globe, Users2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { DrilldownChart } from "./DrilldownChart";
import { StatCard } from "./StatCard";

export function PegawaiStatsTab() {
  const { data: pegawaiData, isLoading } = usePegawaiOverview();
  const {
    data: pegawaiDrilldownData,
    isLoading: isDrilldownLoading,
    currentLevel: pegawaiLevel,
  } = usePegawaiDrilldown();

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
    if (pegawaiLevel === "prodi") {
      setKodeProdi("");
      setKodeJurusan("");
    } else if (pegawaiLevel === "jurusan") {
      setKodeJurusan("");
      setKodeFakultas("");
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: statusPegawaiList } = useQuery({
    queryKey: ["status-pegawai-list"],
    queryFn: fetchStatusPegawai,
  });

  const { data: statusKeaktifanList } = useQuery({
    queryKey: ["status-keaktifan-list"],
    queryFn: fetchStatusKeaktifan,
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Pegawai Filter Bar - Combined status filter */}
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
                ? "text-slate-900 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            }`}
          >
            {!searchParams.get("statusPegawai") && (
              <motion.div
                layoutId="pegawaiStatusPegawaiTab"
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
                    ? "text-slate-900 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="pegawaiStatusPegawaiTab"
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
                ? "text-slate-900 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            }`}
          >
            {!searchParams.get("statusKeaktifan") && (
              <motion.div
                layoutId="pegawaiStatusKeaktifanTab"
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
                    ? "text-slate-900 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="pegawaiStatusKeaktifanTab"
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

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
          {pegawaiData?.datas.map((stat, idx) => (
            <div
              key={idx}
              className="min-w-[280px] flex-1 lg:flex-none lg:w-[calc(25%-12px)]"
            >
              <StatCard
                title={stat.title}
                value={new Intl.NumberFormat("id-ID").format(stat.value)}
                change={stat.value > 50 ? "+4.2%" : "Stable"}
                icon={
                  stat.title.includes("PNS")
                    ? Zap
                    : stat.title.includes("Kontrak")
                      ? Activity
                      : stat.title.includes("Student")
                        ? Globe
                        : Users2
                }
                color={
                  stat.title.includes("PNS")
                    ? "#3b82f6"
                    : stat.title.includes("Kontrak")
                      ? "#10b981"
                      : stat.title.includes("PPPK")
                        ? "#a855f7"
                        : "#f59e0b"
                }
              />
            </div>
          ))}
        </div>
      )}

      <DrilldownChart
        title={`Sebaran Pegawai per ${pegawaiLevel === "fakultas" ? "Fakultas" : pegawaiLevel === "jurusan" ? "Jurusan" : "Prodi"}`}
        subtitle="Institutional Staff Analytics"
        level={pegawaiLevel}
        data={pegawaiDrilldownData?.datas || []}
        total={pegawaiDrilldownData?.total || 0}
        isLoading={isDrilldownLoading}
        onDrilldown={handleDrilldownClick}
        onGoBack={handleGoBack}
        showGoBack={!!(kodeFakultas || kodeJurusan)}
      />
    </div>
  );
}
