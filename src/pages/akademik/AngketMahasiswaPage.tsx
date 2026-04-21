import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useAngketMahasiswa } from "@/hooks/akademik/use-angket-mahasiswa";
import { ClipboardCheck, GraduationCap, Info, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { AngketTable } from "./AngketMahasiswa/angket-table";
import { columns } from "./AngketMahasiswa/columns";
import { useMemo } from "react";

export default function AngketMahasiswaPage() {
  const { data, isLoading, isError, error, page, setPage, limit, setLimit } =
    useAngketMahasiswa();
  const { tahun, semester } = usePeriod();

  // Calculate stats for overview
  const totalData = data?.pagination.total || 0;
  const uniqueProdis = useMemo(() => {
    if (!data?.datas) return 0;
    return new Set(data.datas.map((d) => d.unit.prd_kode)).size;
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
            <ClipboardCheck className="size-4" />
            <span>Kualitas Pelayanan</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">
            Angket Mahasiswa
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Pantau hasil penilaian mahasiswa terhadap kualitas pelayanan dan
            sarana prasarana.
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
            label: "Total Data Angket",
            value: totalData.toLocaleString(),
            icon: ClipboardCheck,
            color: "text-blue-500",
            bg: "bg-blue-500/5",
            border: "border-blue-500/10",
            desc: "Total partisipasi mahasiswa",
          },
          {
            label: "Sebaran Prodi",
            value: uniqueProdis,
            icon: GraduationCap,
            color: "text-emerald-500",
            bg: "bg-emerald-500/5",
            border: "border-emerald-500/10",
            desc: "Program studi yang terlibat",
          },
          {
            label: "Monitoring Status",
            value: "Active",
            icon: TrendingUp,
            color: "text-amber-500",
            bg: "bg-amber-500/5",
            border: "border-amber-500/10",
            desc: "Sistem berjalan normal",
          },
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
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black tracking-tighter text-foreground">
                      {stat.value}
                    </h3>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-2 flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-primary/30" />
                    {stat.desc}
                  </p>
                </div>
              </div>

              {/* Decorative accent */}
              <div
                className={`absolute -right-4 -top-4 size-32 opacity-[0.03] grayscale transition-all duration-700 group-hover:opacity-[0.08] group-hover:scale-110 group-hover:rotate-12`}
              >
                <stat.icon className="size-full" />
              </div>
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
            Sync Failure
          </AlertTitle>
          <AlertDescription className="font-medium opacity-90">
            {(error as Error).message ||
              "Gagal menyelaraskan data angket mahasiswa."}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Table Area */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <Skeleton className="h-10 w-[250px] rounded-xl" />
              <Skeleton className="h-10 w-[350px] rounded-xl" />
            </div>
            <Skeleton className="h-[500px] w-full rounded-[2.5rem] border" />
          </div>
        ) : (
          <AngketTable
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

      {/* Footer Status */}
      <div className="flex justify-center pt-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border bg-card/60 backdrop-blur-md text-[11px] font-black text-muted-foreground/70 shadow-lg uppercase tracking-[0.2em] hover:border-primary/20 transition-all cursor-default group">
          <div className="size-2 rounded-full bg-blue-500 animate-ping" />
          Monitoring Active:{" "}
          <span className="text-foreground group-hover:text-primary transition-colors">
            {new Date().toLocaleTimeString("id-ID")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
