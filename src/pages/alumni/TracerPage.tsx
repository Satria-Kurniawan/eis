import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useTracer } from "@/hooks/alumni/use-tracer";
import { GraduationCap, Info, TrendingUp, Users, CheckCircle2, PieChart } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { columns } from "./Tracer/columns";
import { TracerTable } from "./Tracer/tracer-table";

export default function TracerPage() {
  const { data, isLoading, isError, error, page, setPage, limit, setLimit } =
    useTracer();
  const { tahun, semester } = usePeriod();

  // Calculate statistics for the dashboard
  const stats = useMemo(() => {
    if (!data?.datas) return { total: 0, completed: 0, avgProgress: 0 };

    const total = data.pagination.total;
    const completed = data.datas.filter(d => d.status_pengisian === "1" || d.persentase_pengisian === 100).length;
    const avgProgress = data.datas.reduce((acc, curr) => acc + curr.persentase_pengisian, 0) / (data.datas.length || 1);

    return { total, completed, avgProgress: Math.round(avgProgress) };
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-10 space-y-8 max-w-[1400px] mx-auto"
    >
      {/* Professional Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
            <Users className="size-4" />
            <span>Alumni Tracking</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">
            Data Tracer Alumni
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg text-pretty">
            Monitoring data penelusuran alumni untuk evaluasi relevansi kurikulum dan kesiapan kerja.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 shadow-sm backdrop-blur-md">
              <TrendingUp className="size-4 text-primary" />
              <span className="text-sm font-black">TA {tahun}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background shadow-xl">
              <GraduationCap className="size-4" />
              <span className="text-sm font-black uppercase">
                Smtr. {semester === "2" ? "Ganjil" : "Genap"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Alumni",
            value: stats.total.toLocaleString(),
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/5",
            border: "border-blue-500/10",
            desc: "Total lulusan di periode ini"
          },
          {
            label: "Respon Selesai",
            value: `${stats.completed}`,
            icon: CheckCircle2,
            color: "text-emerald-500",
            bg: "bg-emerald-500/5",
            border: "border-emerald-500/10",
            desc: "Alumni yang sudah mengisi lengkap"
          },
          {
            label: "Rata-rata Progress",
            value: `${stats.avgProgress}%`,
            icon: PieChart,
            color: "text-amber-500",
            bg: "bg-amber-500/5",
            border: "border-amber-500/10",
            desc: "Persentase pengisian keseluruhan"
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className={`group relative overflow-hidden rounded-[2.5rem] border ${stat.border} ${stat.bg} p-8 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-background/50 border border-primary/5 w-fit shadow-inner">
                  <stat.icon className={`size-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-4xl font-black tracking-tighter text-foreground">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground mt-2 flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-primary/30" />
                    {stat.desc}
                  </p>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 size-32 opacity-[0.03] grayscale transition-all duration-700 group-hover:opacity-[0.08] group-hover:scale-110 group-hover:rotate-12">
                <stat.icon className="size-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Alert
            variant="destructive"
            className="rounded-3xl border-destructive/20 shadow-2xl animate-in zoom-in-95 duration-500 backdrop-blur-xl bg-destructive/5"
          >
            <Info className="h-5 w-5" />
            <AlertTitle className="font-black uppercase tracking-widest text-xs mb-1">
              Data Synchronization Failure
            </AlertTitle>
            <AlertDescription className="font-medium opacity-90">
              {(error as Error).message || "Gagal menyelaraskan data tracer alumni."}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Main Table Area */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <Skeleton className="h-10 w-[250px] rounded-xl" />
              <Skeleton className="h-10 w-[350px] rounded-xl" />
            </div>
            <Skeleton className="h-[500px] w-full rounded-[2.5rem] border shadow-lg" />
          </div>
        ) : (
          <TracerTable
            columns={columns}
            data={data?.datas || []}
            pageCount={data?.pagination.pages || 0}
            pageIndex={page}
            pageSize={limit}
            setPageIndex={setPage}
            setPageSize={setLimit}
          />
        )}
      </div>

      {/* Professional Footer Status */}
      <div className="flex justify-center pt-4 pb-8">
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border bg-card/60 backdrop-blur-xl text-[10px] font-black text-muted-foreground/70 shadow-2xl uppercase tracking-[0.2em] hover:border-primary/20 transition-all cursor-default group">
          <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          Data Integrity Monitoring:{" "}
          <span className="text-foreground group-hover:text-primary transition-colors">
             Live {new Date().toLocaleTimeString("id-ID")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
