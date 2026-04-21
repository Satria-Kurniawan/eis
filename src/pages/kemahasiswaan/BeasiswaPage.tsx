import { usePeriod } from "@/contexts/PeriodContext";
import { useBeasiswa } from "@/hooks/kemahasiswaan/use-beasiswa";
import { Award, GraduationCap, TrendingUp, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { columns } from "./Beasiswa/columns";
import { BeasiswaTable } from "./Beasiswa/beasiswa-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function BeasiswaPage() {
  const { tahun, semester } = usePeriod();
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
  } = useBeasiswa();

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
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-[0.2em]">
            <Award className="size-4" />
            <span>Kesejahteraan Mahasiswa</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">
            Data Beasiswa
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Pantau sebaran beasiswa, profil penerima, dan realisasi pembagian
            bantuan akademik.
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
              <GraduationCap className="size-4" />
              <span className="text-sm font-black uppercase tracking-tighter">
                Smtr. {semester === "2" ? "Ganjil" : "Genap"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isError && (
        <Alert
          variant="destructive"
          className="rounded-[2rem] border-destructive/20 shadow-2xl bg-destructive/5"
        >
          <AlertTitle className="font-bold flex items-center gap-2">
            <RefreshCw className="size-4" /> Sinkronisasi Gagal
          </AlertTitle>
          <AlertDescription>
            {(error as Error).message ||
              "Gagal menyelaraskan daftar penerima beasiswa dengan database kesejahteraan."}
          </AlertDescription>
        </Alert>
      )}

      {/* Filter Toolbar Section */}
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground/80">
          Data List
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
          <BeasiswaTable
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

      {/* Professional Footer Indicator */}
      <div className="flex justify-center pb-8 pt-4">
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border bg-card/60 backdrop-blur-2xl text-[10px] font-black text-muted-foreground shadow-2xl uppercase tracking-widest border-primary/10 group">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          Channel Data:{" "}
          <span className="text-amber-600 font-black tracking-widest uppercase">
            Beasiswa-Feed
          </span>
          <span className="mx-4 w-px h-4 bg-muted-foreground/20" />
          Last Index:{" "}
          <span className="text-foreground italic">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
