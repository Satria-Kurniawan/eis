import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useRekapPmb } from "@/hooks/akademik/use-rekap-pmb";
import { BarChart3, GraduationCap, Info, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { columns as columnDefs } from "./RekapPmb/columns";
import { PmbTable } from "./RekapPmb/pmb-table";

export default function RekapPmbPage() {
  const { data, isLoading, isError, error, page, setPage, limit, setLimit } =
    useRekapPmb();
  const { tahun, semester } = usePeriod();

  // Memoize columns and source data for RevoGrid performance
  const columns = useMemo(() => columnDefs, []);
  const source = useMemo(() => data?.datas || [], [data?.datas]);

  // Calculate totals from the current view for stats overview
  // const totalPeminat = useMemo(
  //   () =>
  //     source.reduce(
  //       (acc, curr) => acc + (parseInt(curr.jumlah.peminat) || 0),
  //       0,
  //     ),
  //   [source],
  // );
  // const totalLulus = useMemo(
  //   () =>
  //     source.reduce((acc, curr) => acc + (parseInt(curr.jumlah.lulus) || 0), 0),
  //   [source],
  // );
  // const totalDaftar = useMemo(
  //   () =>
  //     source.reduce(
  //       (acc, curr) => acc + (parseInt(curr.jumlah.daftar) || 0),
  //       0,
  //     ),
  //   [source],
  // );

  // Flatten nested data for RevoGrid compatibility
  const flattenedSource = useMemo(() => {
    return source.map((item) => {
      const flattened: any = { ...item };
      const categories = [
        "snbp",
        "snbt",
        "smbjm_cbt",
        "smbjm_raport",
        "smbjm_talent",
        "smbjm_utbk",
        "profesi",
        "internasional",
        "pasca",
        "adikpapua",
        "jumlah",
      ];
      categories.forEach((cat) => {
        const stats = item[cat as keyof typeof item] as any;
        if (stats) {
          flattened[`${cat}_peminat`] = stats.peminat;
          flattened[`${cat}_lulus`] = stats.lulus;
          flattened[`${cat}_daftar`] = stats.daftar;
        }
      });
      return flattened;
    });
  }, [source]);

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
            <BarChart3 className="size-4" />
            <span>Penerimaan</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">
            Rekap PMB
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Statistik dan rekapitulasi Penerimaan Mahasiswa Baru dengan performa
            tinggi.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 shadow-sm backdrop-blur-md">
              <TrendingUp className="size-4 text-primary" />
              <span className="text-sm font-black">TA {tahun}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-foreground text-background shadow-2xl">
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
          className="rounded-[2.5rem] border-destructive/20 shadow-2xl shadow-destructive/5 animate-in zoom-in-95 duration-300 p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-destructive/10 rounded-2xl">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <AlertTitle className="font-black uppercase tracking-widest text-xs mb-1">
                Koneksi Error
              </AlertTitle>
              <AlertDescription className="text-sm font-medium opacity-80">
                {(error as Error).message ||
                  "Gagal menyambungkan ke server data PMB."}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {/* Main Content Area */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-12 w-[250px] rounded-[1.5rem]" />
              <Skeleton className="h-12 w-[350px] rounded-[1.5rem]" />
            </div>
            <Skeleton className="h-[600px] w-full rounded-[3.5rem] border shadow-xl" />
          </div>
        ) : (
          <PmbTable
            columns={columns}
            data={flattenedSource}
            pageCount={data?.pagination.pages || 0}
            pageIndex={page}
            pageSize={limit}
            setPageIndex={setPage}
            setPageSize={setLimit}
          />
        )}
      </div>

      {/* Modern Footer Status Pillar */}
      <div className="flex justify-center pb-8">
        <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full border bg-card/50 backdrop-blur-xl text-[10px] font-black text-muted-foreground shadow-2xl uppercase tracking-widest transition-all hover:border-primary/20 hover:scale-105 active:scale-95 cursor-default">
          <span className="size-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
          RevoGrid Engine:{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Optimized
          </span>
          <span className="mx-4 w-px h-4 bg-muted-foreground/20" />
          Sync Status: <span className="text-foreground">Healthy</span>
        </div>
      </div>
    </motion.div>
  );
}
