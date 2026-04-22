import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { usePerangkatPembelajaran } from "@/hooks/akademik/use-perangkat-pembelajaran";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { GraduationCap, Info, Layout, Search, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { columns } from "./PerangkatPembelajaran/columns";
import { PerpemTable } from "./PerangkatPembelajaran/perpem-table";

export default function PerangkatPembelajaranPage() {
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
  } = usePerangkatPembelajaran(debouncedSearch);

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
            <Layout className="size-4" />
            <span>Dokumentasi Kurikulum</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">
            Perangkat Pembelajaran
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Pantau ketersediaan RPS, Kontrak Kuliah, dan RTM untuk setiap mata
            kuliah yang ditawarkan.
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
          className="rounded-3xl border-destructive/20 shadow-lg animate-in zoom-in-95"
        >
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold uppercase tracking-tight">
            Data Access Error
          </AlertTitle>
          <AlertDescription>
            {(error as Error).message ||
              "Gagal mengambil data perangkat pembelajaran."}
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
            placeholder="Cari Mata Kuliah atau Dosen..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-11 h-12 rounded-2xl border-primary/10 bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-muted/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-transparent hover:border-primary/10 transition-all">
            Filter Active: {debouncedSearch || "None"}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
          </div>
        ) : (
          <PerpemTable
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

      {/* Modern Status Pillar */}
      <div className="flex justify-center pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/30 backdrop-blur-sm text-[10px] font-bold text-muted-foreground shadow-sm uppercase tracking-widest">
          <div className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
          Total Rekord: {data?.pagination.total || 0} item terdata
        </div>
      </div>
    </motion.div>
  );
}
