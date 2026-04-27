import { Skeleton } from "@/components/ui/skeleton";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useMhsDrilldown } from "@/hooks/dashboard/use-mhs-drilldown";
import { useMhsOverview } from "@/hooks/dashboard/use-mhs-overview";
import {
  Activity,
  ArrowUpRight,
  ChevronLeft,
  Globe,
  GraduationCap,
  Users,
  Users2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden p-6 rounded-[2rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-500"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Icon size={80} style={{ color }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="p-3 rounded-2xl"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <Icon size={20} />
          </div>
          <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] bg-emerald-500/10 px-2.5 py-1 rounded-full">
            <ArrowUpRight size={14} />
            {change}
          </div>
        </div>

        <h3 className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
          {title}
        </h3>
        <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

function MockChart({ color }: { color: string }) {
  return (
    <div className="flex items-end gap-1.5 h-48 w-full pt-4">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${20 + Math.random() * 80}%` }}
          transition={{ delay: i * 0.03, duration: 0.8, ease: "easeOut" }}
          className="flex-1 rounded-t-xl"
          style={{ backgroundColor: color, opacity: 0.1 + (i / 16) * 0.9 }}
        />
      ))}
    </div>
  );
}

export default function StatsView() {
  const [subTab, setSubTab] = useState<"mhs" | "dosen" | "pegawai">("mhs");
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

  const handleDrilldownClick = (item: any) => {
    if (currentLevel === "fakultas") {
      setKodeFakultas(item.id);
    } else if (currentLevel === "jurusan") {
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

  const getAbbreviation = (name: string) => {
    if (!name) return "";
    const map: Record<string, string> = {
      "Fakultas Ilmu Pendidikan": "FIP",
      "Fakultas Bahasa dan Seni": "FBS",
      "Fakultas Hukum dan Ilmu Sosial": "FHIS",
      "Fakultas Matematika dan Ilmu Pengetahuan Alam": "FMIPA",
      "Fakultas Teknik dan Kejuruan": "FTK",
      "Fakultas Olahraga dan Kesehatan": "FOK",
      "Fakultas Ekonomi": "FE",
      "Fakultas Kedokteran": "FK",
      "Program Pascasarjana": "PP",
    };
    return map[name] || name.replace("Fakultas ", "").replace("Jurusan ", "");
  };

  const renderMhsContent = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isMhsLoading
          ? [...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-[2rem]" />
            ))
          : mhsData?.datas.map((stat, idx) => (
              <StatCard
                key={idx}
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
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
                Sebaran Mahasiswa per{" "}
                {currentLevel === "fakultas"
                  ? "Fakultas"
                  : currentLevel === "jurusan"
                    ? "Jurusan"
                    : "Prodi"}
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Institutional Capacity Analytics
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(kodeFakultas || kodeJurusan) && (
                <button
                  onClick={handleGoBack}
                  className="p-2 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all group"
                >
                  <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800/50">
                Level: {currentLevel}
              </span>
            </div>
          </div>

          <div className="h-80 w-full mt-4">
            {isDrilldownLoading ? (
              <div className="flex items-end gap-4 h-full w-full">
                {[...Array(8)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="flex-1 rounded-t-2xl"
                    style={{ height: `${20 + Math.random() * 60}%` }}
                  />
                ))}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={drilldownData?.datas?.filter((f) => f.name) || []}
                  margin={{ top: 20, right: 0, left: -20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(203, 213, 225, 0.2)"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      const name = getAbbreviation(payload.value);
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={16}
                            textAnchor="middle"
                            fill="#64748b"
                            fontSize={10}
                            fontWeight={900}
                            className="uppercase tracking-tighter"
                          >
                            {name}
                          </text>
                        </g>
                      );
                    }}
                    interval={0}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-2xl shadow-xl border border-white/10 dark:border-slate-200">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">
                              {currentLevel}
                            </p>
                            <p className="text-xs font-bold mb-2">
                              {data.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <div
                                className="size-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    currentLevel === "fakultas"
                                      ? "#3b82f6"
                                      : currentLevel === "jurusan"
                                        ? "#a855f7"
                                        : "#10b981",
                                }}
                              />
                              <p className="text-sm font-black tabular-nums">
                                {new Intl.NumberFormat("id-ID").format(
                                  data.value,
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    barSize={40}
                    animationDuration={1500}
                    onClick={(data) => handleDrilldownClick(data)}
                  >
                    {drilldownData?.datas?.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          currentLevel === "fakultas"
                            ? "#3b82f6"
                            : currentLevel === "jurusan"
                              ? "#a855f7"
                              : "#10b981"
                        }
                        fillOpacity={0.8}
                        className="cursor-pointer hover:fill-opacity-100 transition-all duration-300"
                        style={{
                          filter: `drop-shadow(0 4px 6px ${currentLevel === "fakultas" ? "rgba(59,130,246,0.2)" : currentLevel === "jurusan" ? "rgba(168,85,247,0.2)" : "rgba(16,185,129,0.2)"})`,
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
                Sebaran{" "}
                {currentLevel === "fakultas"
                  ? "Fakultas"
                  : currentLevel === "jurusan"
                    ? "Jurusan"
                    : "Prodi"}
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Intelligence Distribution
              </p>
            </div>
            {(kodeFakultas || kodeJurusan) && (
              <button
                onClick={handleGoBack}
                className="p-2 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all group"
              >
                <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-5">
            {isDrilldownLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full rounded-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {drilldownData?.datas
                  ?.filter((item) => item.name)
                  .map((item, idx) => (
                    <motion.div
                      key={item.id || idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleDrilldownClick(item)}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-black uppercase tracking-tight text-slate-500 group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs font-black text-slate-900 dark:text-white tabular-nums">
                          {new Intl.NumberFormat("id-ID").format(item.value)}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 dark:bg-slate-900/50 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${drilldownData?.total ? (item.value / drilldownData.total) * 100 : 0}%`,
                          }}
                          className="h-full rounded-full relative"
                          style={{
                            backgroundColor:
                              currentLevel === "fakultas"
                                ? "#3b82f6"
                                : currentLevel === "jurusan"
                                  ? "#a855f7"
                                  : "#10b981",
                            boxShadow: `0 0 10px ${currentLevel === "fakultas" ? "rgba(59,130,246,0.3)" : currentLevel === "jurusan" ? "rgba(168,85,247,0.3)" : "rgba(16,185,129,0.3)"}`,
                          }}
                        >
                          <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
            <div className="flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <span>Total Data</span>
              <span className="text-slate-900 dark:text-white">
                {new Intl.NumberFormat("id-ID").format(
                  drilldownData?.total || 0,
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDosenPegawaiContent = (type: "dosen" | "pegawai") => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={`Total ${type}`}
          value={type === "dosen" ? "1.240" : "856"}
          change="+2.4%"
          icon={Users2}
          color="#3b82f6"
        />
        <StatCard
          title={type === "dosen" ? "Doktor (S3)" : "PNS"}
          value={type === "dosen" ? "412" : "620"}
          change="+12%"
          icon={Zap}
          color="#f59e0b"
        />
        <StatCard
          title={type === "dosen" ? "Sertifikasi" : "Kontrak"}
          value={type === "dosen" ? "982" : "236"}
          change="+4.5%"
          icon={Activity}
          color="#10b981"
        />
        <StatCard
          title="Rerata Usia"
          value="42 Thn"
          change="-1.2"
          icon={Globe}
          color="#64748b"
        />
      </div>

      <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">
            Distribusi Jabatan {type === "dosen" ? "Fungsional" : "Struktural"}
          </h3>
        </div>
        <MockChart color={type === "dosen" ? "#a855f7" : "#64748b"} />
      </div>
    </div>
  );

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
            <motion.div key="mhs">{renderMhsContent()}</motion.div>
          )}
          {subTab === "dosen" && (
            <motion.div key="dosen">
              {renderDosenPegawaiContent("dosen")}
            </motion.div>
          )}
          {subTab === "pegawai" && (
            <motion.div key="pegawai">
              {renderDosenPegawaiContent("pegawai")}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
