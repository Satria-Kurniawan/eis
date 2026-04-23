import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  Filter,
  Globe,
  GraduationCap,
  TrendingUp,
  Users,
  Users2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

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

function FilterDropdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
        {label}
      </label>
      <div className="group relative">
        <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 transition-all hover:border-primary/50">
          <span className="truncate">{value}</span>
          <ChevronDown
            size={14}
            className="text-slate-400 group-hover:text-primary transition-colors"
          />
        </button>
      </div>
    </div>
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

  const renderMhsContent = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Filters Bar */}
      <div className="p-6 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
            <Filter size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
            Filter Data Akademik
          </h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <FilterDropdown label="Fakultas" value="Semua Fakultas" />
          <FilterDropdown label="Jurusan" value="Semua Jurusan" />
          <FilterDropdown label="Program Studi" value="Semua Prodi" />
          <div className="flex items-end">
            <button className="px-8 py-3 bg-primary dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all">
              Terapkan
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Mahasiswa Aktif"
          value="24.892"
          change="+12%"
          icon={Users}
          color="#3b82f6"
        />
        <StatCard
          title="Mahasiswa Baru"
          value="4.102"
          change="+8.2%"
          icon={TrendingUp}
          color="#10b981"
        />
        <StatCard
          title="Lulusan 2026"
          value="3.840"
          change="+5.1%"
          icon={GraduationCap}
          color="#a855f7"
        />
        <StatCard
          title="Rerata IPK"
          value="3.42"
          change="+0.12"
          icon={Activity}
          color="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Pertumbuhan Mahasiswa
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Last 12 Months
            </span>
          </div>
          <MockChart color="#3b82f6" />
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl">
          <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase mb-8">
            Sebaran Fakultas
          </h3>
          <div className="space-y-4">
            {[
              { label: "FTK", value: 35, color: "#3b82f6" },
              { label: "FIP", value: 25, color: "#10b981" },
              { label: "FE", value: 20, color: "#a855f7" },
              { label: "Lainnya", value: 20, color: "#eab308" },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="text-slate-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 dark:bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
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
