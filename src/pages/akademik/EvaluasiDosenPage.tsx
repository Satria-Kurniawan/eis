import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useEvaluasiDosen } from "@/hooks/akademik/use-evaluasi-dosen";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { type EvaluasiDosen } from "@/services/akademik/evaluasiDosen";
import { GraduationCap, Info, PieChart, Search, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { createColumns } from "./EvaluasiDosen/columns";
import { EvaluasiDetailDialog } from "./EvaluasiDosen/evaluasi-detail-dialog";
import { EvaluasiTable } from "./EvaluasiDosen/evaluasi-table";

export default function EvaluasiDosenPage() {
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
  } = useEvaluasiDosen(debouncedSearch);

  const [selectedData, setSelectedData] = useState<EvaluasiDosen | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, setPage]);

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

      {isError && (
        <Alert
          variant="destructive"
          className="rounded-3xl border-destructive/20 shadow-2xl animate-in zoom-in-95 duration-500"
        >
          <div className="flex items-start gap-4">
            <Info className="h-5 w-5 mt-0.5" />
            <div>
              <AlertTitle className="font-black uppercase tracking-widest text-xs mb-1">
                System Error
              </AlertTitle>
              <AlertDescription className="font-medium opacity-90">
                {(error as Error).message ||
                  "Gagal mengsinkronisasi data evaluasi dosen."}
              </AlertDescription>
            </div>
          </div>
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
