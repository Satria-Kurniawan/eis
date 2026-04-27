import { motion } from "motion/react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: StatCardProps) {
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
