import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  PieChart as PieChartIcon,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PmbDashboardProps {
  data: {
    totals: {
      peminat: number;
      lulus: number;
      daftar: number;
    };
    distribution: any[];
    topProdis: any[];
  };
}

export function PmbDashboard({ data }: PmbDashboardProps) {
  const { totals, distribution, topProdis } = data;

  const cards = [
    {
      title: "Total Peminat",
      value: totals.peminat.toLocaleString(),
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      desc: "Total pendaftar masuk",
    },
    {
      title: "Lulus Seleksi",
      value: totals.lulus.toLocaleString(),
      icon: UserCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      desc: `${((totals.lulus / totals.peminat) * 100).toFixed(1)}% dari peminat`,
    },
    {
      title: "Daftar Ulang",
      value: totals.daftar.toLocaleString(),
      icon: UserPlus,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      desc: `${((totals.daftar / totals.lulus) * 100).toFixed(1)}% dari yang lulus`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-background/40 backdrop-blur-xl border border-primary/5 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
          >
            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-4">
                <div
                  className={cn("p-3 rounded-2xl w-fit shadow-inner", card.bg)}
                >
                  <card.icon className={cn("size-6", card.color)} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                    {card.title}
                  </p>
                  <h3 className="text-4xl font-black tracking-tighter">
                    {card.value}
                  </h3>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 flex items-center gap-1">
                      <TrendingUp className="size-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary italic">
                        Live Data
                      </span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {card.desc}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 size-32 opacity-[0.03] grayscale transition-all duration-700 group-hover:opacity-[0.08] group-hover:scale-110 group-hover:rotate-12">
                <card.icon className="size-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entry Path Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-[2.5rem] bg-background/40 backdrop-blur-xl border border-primary/5 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-1">
                <Target className="size-3" />
                <span>Entry Path Distribution</span>
              </div>
              <h3 className="text-xl font-black tracking-tight">
                Sebaran Jalur Masuk
              </h3>
            </div>
            <div className="p-2 rounded-xl bg-primary/5 text-primary">
              <PieChartIcon className="size-5" />
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distribution}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(var(--primary-rgb), 0.05)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fontWeight: 700,
                    fill: "currentColor",
                    opacity: 0.6,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fontWeight: 700,
                    fill: "currentColor",
                    opacity: 0.6,
                  }}
                />
                <Tooltip
                  cursor={{
                    fill: "rgba(var(--primary-rgb), 0.05)",
                    radius: 10,
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(var(--background-rgb), 0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "1rem",
                    border: "1px solid rgba(var(--primary-rgb), 0.1)",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                />
                <Bar
                  dataKey="peminat"
                  fill="url(#barGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Competitive Programs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-[2.5rem] bg-background/40 backdrop-blur-xl border border-primary/5 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-1">
                <ArrowUpRight className="size-3" />
                <span>Market Demand</span>
              </div>
              <h3 className="text-xl font-black tracking-tight">
                Prodi Paling Diminati
              </h3>
            </div>
            <div className="p-2 rounded-xl bg-primary/5 text-primary">
              <Users className="size-5" />
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                layout="vertical"
                data={topProdis}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                </defs>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={150}
                  tick={{
                    fontSize: 9,
                    fontWeight: 800,
                    fill: "currentColor",
                    opacity: 0.8,
                  }}
                />
                <Tooltip
                  cursor={{
                    stroke: "rgba(var(--primary-rgb), 0.1)",
                    strokeWidth: 2,
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(var(--background-rgb), 0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "1rem",
                    border: "1px solid rgba(var(--primary-rgb), 0.1)",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="peminat"
                  stroke="var(--primary)"
                  fill="url(#areaGradient)"
                  strokeWidth={3}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
