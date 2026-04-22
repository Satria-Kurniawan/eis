import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { usePenawaran } from "@/hooks/akademik/use-penawaran";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  BookOpen,
  GraduationCap,
  RefreshCw,
  Search,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { columns } from "./Penawaran/columns";
import { PenawaranTable } from "./Penawaran/penawaran-table";

export default function PenawaranPage() {
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
  } = usePenawaran(debouncedSearch);

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
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
            <BookOpen className="size-4" />
            <span>Manajemen Kurikulum</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">
            Penawaran MK
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Daftar seluruh mata kuliah yang ditawarkan untuk program studi pada
            periode berjalan.
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
          <AlertCircle className="size-4" />
          <AlertTitle className="font-bold">Gagal Memuat Data</AlertTitle>
          <AlertDescription>
            {(error as Error).message ||
              "Terjadi kesalahan saat mengambil data penawaran mata kuliah."}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Table Area */}
      <div className="space-y-4">
        {/* Modern Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 backdrop-blur-md p-4 rounded-3xl border border-primary/5 shadow-sm">
          <div className="relative w-full sm:w-96 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="size-4" />
            </div>
            <Input
              placeholder="Cari Mata Kuliah atau Dosen..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-11 h-12 rounded-2xl border-primary/10 bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${isFetching ? "bg-primary/20 text-primary animate-pulse" : "bg-muted border border-transparent hover:border-primary/20 text-muted-foreground hover:bg-muted/80 hover:text-foreground"}`}
            >
              <RefreshCw
                className={`size-3 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[500px] w-full rounded-[3rem] border border-primary/5 shadow-xl" />
          </div>
        ) : (
          <PenawaranTable
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
          <span className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
          Status Penawaran:{" "}
          <span className="text-blue-600 dark:text-blue-400 font-black tracking-widest">
            PUBLISHED
          </span>
          <span className="mx-4 w-px h-4 bg-muted-foreground/20" />
          Verified by: <span className="text-foreground">Sistem Akademik</span>
        </div>
      </div>
    </motion.div>
  );
}
