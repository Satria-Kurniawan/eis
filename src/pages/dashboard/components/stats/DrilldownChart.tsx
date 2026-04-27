import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DrilldownChartProps {
  title: string;
  subtitle: string;
  level: "fakultas" | "jurusan" | "prodi" | string;
  data: any[];
  total: number;
  isLoading: boolean;
  onDrilldown: (item: any, currentLevel: string) => void;
  onGoBack: () => void;
  showGoBack: boolean;
}

export function DrilldownChart({
  title,
  subtitle,
  level,
  data,
  total,
  isLoading,
  onDrilldown,
  onGoBack,
  showGoBack,
}: DrilldownChartProps) {
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
      "Biro Keuangan dan Umum": "BKU",
      "Unit Penunjang Akademik Perpustakaan": "UPA PERPUS",
      "Biro Akademik dan Kemahasiswaan": "BAK",
      "Biro Perencanaan dan Kerja Sama": "BPK",
      "Lembaga Penjaminan Mutu dan Pengembangan Pembelajaran": "LPMPP",
      "Unit Sumber Daya dan Pembelajaran (SDP) Kampus Denpasar": "SDP DENPASAR",
      "Lembaga Penelitian dan Pengabdian Kepada Masyarakat": "LPPM",
      "Unit Penunjang Akademik Teknologi Informasi dan Komunikasi": "UPA TIK",
    };
    return map[name] || name.replace("Fakultas ", "").replace("Jurusan ", "");
  };

  const getLevelColor = (l: string) => {
    if (l === "fakultas") return "#3b82f6";
    if (l === "jurusan") return "#a855f7";
    return "#10b981";
  };

  const levelColor = getLevelColor(level);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section */}
      <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
              {title}
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {showGoBack && (
              <button
                onClick={onGoBack}
                className="p-2 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all group"
              >
                <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800/50">
              Level: {level}
            </span>
          </div>
        </div>

        <div className="h-80 w-full mt-4">
          {isLoading ? (
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
                data={data.filter((f) => f.name) || []}
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
                      const tooltipData = payload[0].payload;
                      return (
                        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-2xl shadow-xl border border-white/10 dark:border-slate-200">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">
                            {level}
                          </p>
                          <p className="text-xs font-bold mb-2">
                            {tooltipData.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <div
                              className="size-2 rounded-full"
                              style={{ backgroundColor: levelColor }}
                            />
                            <p className="text-sm font-black tabular-nums">
                              {new Intl.NumberFormat("id-ID").format(
                                tooltipData.value,
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
                  onClick={(barData) => onDrilldown(barData, level)}
                >
                  {data.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={levelColor}
                      fillOpacity={0.8}
                      className="cursor-pointer hover:fill-opacity-100 transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 4px 6px ${levelColor}33)`, // 33 is approx 20% opacity in hex
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Distribution List Section */}
      <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#14151a] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
              Sebaran{" "}
              {level === "fakultas"
                ? "Fakultas"
                : level === "jurusan"
                  ? "Jurusan"
                  : "Prodi"}
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Intelligence Distribution
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-5">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data
                .filter((item) => item.name)
                .map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onDrilldown(item, level)}
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
                          width: `${total ? (item.value / total) * 100 : 0}%`,
                        }}
                        className="h-full rounded-full relative"
                        style={{
                          backgroundColor: levelColor,
                          boxShadow: `0 0 10px ${levelColor}4D`, // 4D is approx 30% opacity
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
              {new Intl.NumberFormat("id-ID").format(total || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
