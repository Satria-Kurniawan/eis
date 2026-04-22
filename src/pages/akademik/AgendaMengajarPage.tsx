import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useAgendaMengajar } from "@/hooks/akademik/use-agenda-mengajar";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { BookOpen, GraduationCap, Info, Search, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { AgendaTable } from "./AgendaMengajar/agenda-table";
import { columns } from "./AgendaMengajar/columns";

export default function AgendaMengajarPage() {
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
  } = useAgendaMengajar(debouncedSearch);

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

      {/* Modern Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 backdrop-blur-md p-4 rounded-3xl border border-primary/5 shadow-sm">
        <div className="relative w-full sm:w-96 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="size-4" />
          </div>
          <Input
            placeholder="Cari Dosen atau Mata Kuliah..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-11 h-12 rounded-2xl border-primary/10 bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-transparent hover:border-primary/10 transition-all">
            Search Active: {debouncedSearch || "None"}
          </div>
        </div>
      </div>

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
