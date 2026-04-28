import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useRealisasiUnit } from "@/hooks/keuangan/use-realisasi-unit";
import {
  AlertCircle,
  Filter,
  RefreshCw,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { columns } from "./RealisasiUnit/columns";
import { RealisasiUnitTable } from "./RealisasiUnit/realisasi-unit-table";

export default function RealisasiUnitPage() {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const {
    data,
    isLoading,
    isError,
    error,
    page,
    setPage,
    limit,
    setLimit,
    refetch,
    isFetching,
  } = useRealisasiUnit();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-10 space-y-8 max-w-[1440px] mx-auto"
    >
      {/* Professional Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-[0.2em]">
            <Wallet className="size-4" />
            <span>Manajemen Keuangan</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">
            Realisasi Unit
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Monitor realisasi anggaran berdasarkan unit kerja untuk memastikan
            penyerapan dana yang optimal.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 shadow-sm backdrop-blur-md">
              <TrendingUp className="size-4 text-primary" />
              <span className="text-sm font-black text-primary">
                TA {tahun}
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-foreground text-background shadow-2xl">
              <Search className="size-4" />
              <span className="text-sm font-black uppercase tracking-tighter">
                Smtr. {semester === "2" ? "Ganjil" : "Genap"}
              </span>
            </div>
            {(kodeFakultas || kodeJurusan || kodeProdi) && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-sm">
                <Filter className="size-3 text-amber-600" />
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-tighter">
                  Unit Filter Active
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isError && (
        <Alert
          variant="destructive"
          className="rounded-[2rem] border-destructive/20 shadow-2xl bg-destructive/5"
        >
          <AlertTitle className="font-bold flex items-center gap-2">
            <AlertCircle className="size-4" /> Gagal Menarik Data Realisasi
          </AlertTitle>
          <AlertDescription>
            {(error as Error).message ||
              "Pastikan koneksi jaringan stabil atau hubungi administrator sistem."}
          </AlertDescription>
        </Alert>
      )}

      {/* Filter Toolbar Section */}
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground/80">
          Penyerapan Anggaran Unit
        </h2>
        <button
          onClick={() => refetch()}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${isFetching ? "bg-primary/20 text-primary animate-pulse border border-primary/20" : "bg-muted border border-transparent hover:border-primary/20 text-muted-foreground hover:bg-muted/80 hover:text-foreground"}`}
        >
          <RefreshCw className={`size-3 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Syncing..." : "Refresh Data"}
        </button>
      </div>

      {/* Main Table Area */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[500px] w-full rounded-[3rem] border border-primary/5 shadow-xl" />
          </div>
        ) : (
          <RealisasiUnitTable
            columns={columns}
            data={data?.datas || []}
            pageCount={data?.pagination?.pages || 0}
            pageIndex={page}
            pageSize={limit}
            setPageIndex={setPage}
            setPageSize={setLimit}
          />
        )}
      </div>

      {/* Professional Footer Indicator */}
      <div className="flex justify-center pb-8 pt-4">
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border bg-card/60 backdrop-blur-2xl text-[10px] font-black text-muted-foreground shadow-2xl uppercase tracking-widest border-primary/10 group">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
          SIAKU Data Hub:{" "}
          <span className="text-emerald-600 font-black tracking-widest uppercase">
            Realisasi Anggaran Sync
          </span>
          <span className="mx-4 w-px h-4 bg-muted-foreground/20" />
          Last Check:{" "}
          <span className="text-foreground italic">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
