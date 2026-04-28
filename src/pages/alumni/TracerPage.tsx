import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useTracer } from "@/hooks/alumni/use-tracer";
import { useDebounce } from "@/hooks/use-debounce";
import {
  GraduationCap,
  Info,
  TrendingUp,
  Users,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { columns } from "./Tracer/columns";
import { TracerTable } from "./Tracer/tracer-table";
import { Input } from "@/components/ui/input";

export default function TracerPage() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

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
  } = useTracer(debouncedSearch);

  const { tahun, semester } = usePeriod();
  const [showFilters, setShowFilters] = useState(true);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, setPage]);

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
            Monitoring data penelusuran alumni untuk evaluasi relevansi
            kurikulum dan kesiapan kerja.
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
              {(error as Error).message ||
                "Gagal menyelaraskan data tracer alumni."}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Modern Filter Toolbar */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground/80">
              Daftar Alumni
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-xl bg-muted/50 hover:bg-muted text-xs font-bold transition-all border border-primary/5"
            >
              {showFilters ? "Sembunyikan Pencarian" : "Tampilkan Pencarian"}
            </button>
            <button
              onClick={() => refetch()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-primary/10 shadow-sm ${isFetching ? "bg-primary/20 text-primary animate-pulse" : "bg-card hover:bg-muted text-muted-foreground"}`}
            >
              <RefreshCw
                className={`size-3 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Syncing..." : "Refresh"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 backdrop-blur-md p-4 rounded-3xl border border-primary/5 shadow-sm mb-4">
                <div className="relative w-full sm:w-96 group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Search className="size-4" />
                  </div>
                  <Input
                    placeholder="Cari Nama atau NIM..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-11 h-12 rounded-2xl border-primary/10 bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-medium"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-transparent hover:border-primary/10 transition-all flex items-center gap-2">
                    <Filter className="size-3 text-primary" />
                    Global Filter Active: Unit & Period
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
