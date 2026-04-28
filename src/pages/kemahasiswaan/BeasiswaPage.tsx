import { usePeriod } from "@/contexts/PeriodContext";
import { useBeasiswa } from "@/hooks/kemahasiswaan/use-beasiswa";
import { useDebounce } from "@/hooks/use-debounce";
import { Award, GraduationCap, TrendingUp, RefreshCw, Search, Filter } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { columns } from "./Beasiswa/columns";
import { BeasiswaTable } from "./Beasiswa/beasiswa-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function BeasiswaPage() {
  const { tahun, semester } = usePeriod();
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
  } = useBeasiswa(debouncedSearch);

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

      {/* Modern Filter Toolbar */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <h2 className="text-xl font-bold tracking-tight text-foreground/80">
              Daftar Penerima
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
