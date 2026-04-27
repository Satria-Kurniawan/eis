import { Skeleton } from "@/components/ui/skeleton";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useMhsDrilldown } from "@/hooks/dashboard/use-mhs-drilldown";
import { useMhsOverview } from "@/hooks/dashboard/use-mhs-overview";
import { fetchMhsStatus } from "@/services/dashboard/mahasiswa";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CheckCircle2,
  GraduationCap,
  Users,
  Users2,
} from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { StatCard } from "./StatCard";
import { DrilldownChart } from "./DrilldownChart";

export function MhsStatsTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mhsStatus = searchParams.get("mhsStatus") || "1";

  const { data: statusList } = useQuery({
    queryKey: ["mhs-status-list"],
    queryFn: fetchMhsStatus,
  });

  const { data: mhsData, isLoading: isMhsLoading } = useMhsOverview();
  const {
    data: drilldownData,
    isLoading: isDrilldownLoading,
    currentLevel,
  } = useMhsDrilldown();

  const {
    setKodeFakultas,
    setKodeJurusan,
    setKodeProdi,
    kodeFakultas,
    kodeJurusan,
  } = useUnitFilter();

  const setMhsStatus = (statusId: string) => {
    setSearchParams((prev) => {
      prev.set("mhsStatus", statusId);
      return prev;
    });
  };

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
    if (currentLevel === "prodi") {
      setKodeProdi("");
      setKodeJurusan("");
    } else if (currentLevel === "jurusan") {
      setKodeJurusan("");
      setKodeFakultas("");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Status Filter Bar */}
      <div className="p-1.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-sm">
        <div className="px-4 py-2 flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 mr-1 shrink-0">
          <CheckCircle2 size={16} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Filter Status
          </span>
        </div>
        {statusList?.datas.map((status) => {
          const isActive = mhsStatus === String(status.id_status);
          return (
            <button
              key={status.id_status}
              onClick={() => setMhsStatus(String(status.id_status))}
              className={`relative px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-500 shrink-0 ${
                isActive
                  ? "text-white dark:text-slate-900 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mhsStatusTab"
                  className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
                {status.status}
              </span>
            </button>
          );
        })}
      </div>

      {isMhsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
          {mhsData?.datas.map((stat, idx) => (
            <div
              key={idx}
              className="min-w-[280px] flex-1 lg:flex-none lg:w-[calc(25%-12px)]"
            >
              <StatCard
                title={`Mahasiswa ${stat.title}`}
                value={new Intl.NumberFormat("id-ID").format(stat.value)}
                change={stat.title === "Aktif" ? "+1.2%" : "Stable"}
                icon={
                  stat.title === "Aktif"
                    ? Users
                    : stat.title === "Lulus"
                      ? GraduationCap
                      : stat.title === "Cuti"
                        ? Activity
                        : Users2
                }
                color={
                  stat.title === "Aktif"
                    ? "#3b82f6"
                    : stat.title === "Lulus"
                      ? "#a855f7"
                      : stat.title === "Cuti"
                        ? "#f59e0b"
                        : "#ef4444"
                }
              />
            </div>
          ))}
        </div>
      )}

      <DrilldownChart
        title={`Sebaran Mahasiswa per ${currentLevel === "fakultas" ? "Fakultas" : currentLevel === "jurusan" ? "Jurusan" : "Prodi"}`}
        subtitle="Institutional Capacity Analytics"
        level={currentLevel}
        data={drilldownData?.datas || []}
        total={drilldownData?.total || 0}
        isLoading={isDrilldownLoading}
        onDrilldown={handleDrilldownClick}
        onGoBack={handleGoBack}
        showGoBack={!!(kodeFakultas || kodeJurusan)}
      />
    </div>
  );
}
