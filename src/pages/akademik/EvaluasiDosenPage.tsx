import { useEvaluasiDosen } from "@/hooks/akademik/use-evaluasi-dosen";
import { createColumns } from "./EvaluasiDosen/columns";
import { EvaluasiTable } from "./EvaluasiDosen/evaluasi-table";
import { EvaluasiDetailDialog } from "./EvaluasiDosen/evaluasi-detail-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { motion } from "motion/react";
import {
  Users,
  GraduationCap,
  Info,
  PieChart,
  TrendingUp,
  Target,
  FileText,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState, useMemo } from "react";
import { type EvaluasiDosen } from "@/services/akademik/evaluasiDosen";

export default function EvaluasiDosenPage() {
  const { data, isLoading, isError, error, page, setPage, limit, setLimit } =
    useEvaluasiDosen();
  const { tahun, semester } = usePeriod();

  const [selectedData, setSelectedData] = useState<EvaluasiDosen | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDetail = (item: EvaluasiDosen) => {
    setSelectedData(item);
    setIsDialogOpen(true);
  };

  const columns = useMemo(() => createColumns(handleOpenDetail), []);

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
            <PieChart className="size-4" />
            <span>Kualitas Pendidikan</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">
            Evaluasi Dosen
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Rekap rangkuman penilaian kinerja dosen berdasarkan persepsi
            mahasiswa pada setiap mata kuliah.
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
            label: "Total Evaluasi",
            value: data?.pagination.total || 0,
            icon: FileText,
            color: "blue",
            sub: "Responden Terdata",
          },
          {
            label: "Rata-rata Indeks",
            value: "84.2%",
            icon: Target,
            color: "emerald",
            sub: "Kualitas Mengajar",
          },
          {
            label: "Dosen Teruji",
            value: data?.datas.length || 0,
            icon: Users,
            color: "amber",
            sub: "Semester Aktif",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start justify-between p-7 rounded-[2rem] border bg-card/40 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all border-primary/5 group"
          >
            <div>
              <p className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-black text-foreground mb-1 tracking-tighter">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-muted-foreground/60">
                {stat.sub}
              </p>
            </div>
            <div
              className={`p-4 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:rotate-12 transition-transform`}
            >
              <stat.icon className="size-7" />
            </div>
          </motion.div>
        ))}
      </div>

      {isError && (
        <Alert
          variant="destructive"
          className="rounded-3xl border-destructive/20 shadow-2xl animate-in zoom-in-95 duration-500"
        >
          <Info className="h-5 w-5" />
          <AlertTitle className="font-black uppercase tracking-widest text-xs mb-1">
            System Error
          </AlertTitle>
          <AlertDescription className="font-medium opacity-90">
            {(error as Error).message ||
              "Gagal mengsinkronisasi data evaluasi dosen."}
          </AlertDescription>
        </Alert>
      )}

      {/* Table Container */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <Skeleton className="h-10 w-[250px] rounded-xl" />
              <Skeleton className="h-10 w-[350px] rounded-xl" />
            </div>
            <Skeleton className="h-[600px] w-full rounded-[2.5rem] border" />
          </div>
        ) : (
          <EvaluasiTable
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

      <EvaluasiDetailDialog
        data={selectedData}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      {/* Modern Status Pillar */}
      <div className="flex justify-center pt-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border bg-card/60 backdrop-blur-md text-[11px] font-black text-muted-foreground/70 shadow-lg uppercase tracking-[0.2em] hover:border-primary/20 transition-all cursor-default group">
          <div className="size-2 rounded-full bg-blue-500 animate-ping" />
          Data Synchronized:{" "}
          <span className="text-foreground group-hover:text-primary transition-colors">
            {new Date().toLocaleTimeString("id-ID")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
