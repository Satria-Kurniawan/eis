import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useAgendaMengajar } from "@/hooks/akademik/use-agenda-mengajar";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Info,
  Users2,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { AgendaTable } from "./AgendaMengajar/agenda-table";
import { columns } from "./AgendaMengajar/columns";

export default function AgendaMengajarPage() {
  const { data, isLoading, isError, error, page, setPage, limit, setLimit } =
    useAgendaMengajar();
  const { tahun, semester } = usePeriod();

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
            <BookOpen className="size-4" />
            <span>Manajemen Akademik</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">
            Agenda Mengajar
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Sistem rekapitulasi agenda mengajar dosen untuk memantau aktivitas
            perkuliahan secara real-time.
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Agenda",
            value: data?.pagination.total || 0,
            icon: BookOpen,
            color: "blue",
          },
          {
            label: "Kelas Aktif",
            value: data?.datas.length || 0,
            icon: Users2,
            color: "emerald",
          },
          {
            label: "Periode Perkuliahan",
            value: `${tahun}/${parseInt(tahun) + 1}`,
            icon: Clock,
            color: "orange",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-5 rounded-[2rem] border bg-card/50 shadow-sm hover:shadow-md transition-all border-primary/5 group"
          >
            <div
              className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="size-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-foreground">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {isError && (
        <Alert
          variant="destructive"
          className="rounded-3xl border-destructive/20 shadow-lg shadow-destructive/5 animate-in zoom-in-95 duration-300"
        >
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold uppercase tracking-tight">
            Koneksi Error
          </AlertTitle>
          <AlertDescription>
            {(error as Error).message ||
              "Gagal menyambungkan ke server akademik."}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content Area */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-[200px] rounded-xl" />
              <Skeleton className="h-10 w-[300px] rounded-xl" />
            </div>
            <Skeleton className="h-[500px] w-full rounded-[2.5rem] border" />
          </div>
        ) : (
          <div className="rounded-3xl border bg-card/50 backdrop-blur-md shadow-xl border-primary/5 p-1">
            <AgendaTable
              columns={columns}
              data={data?.datas || []}
              pageCount={data?.pagination.pages || 0}
              pageIndex={page}
              pageSize={limit}
              setPageIndex={setPage}
              setPageSize={setLimit}
            />
          </div>
        )}
      </div>

      {/* Modern Footer Status Pillar */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-muted/50 backdrop-blur-sm text-[11px] font-bold text-muted-foreground shadow-sm uppercase tracking-tighter transition-all hover:border-primary/20">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          Server Status:{" "}
          <span className="text-emerald-600 dark:text-emerald-400">Online</span>
          <span className="mx-2 w-px h-3 bg-muted-foreground/30" />
          Data Updated:{" "}
          <span className="text-foreground">
            {new Date().toLocaleDateString("id-ID")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
