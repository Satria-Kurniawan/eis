import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useRekapPmb } from "@/hooks/akademik/use-rekap-pmb";
import { useDebounce } from "@/hooks/use-debounce";
import {
  BarChart3,
  GraduationCap,
  Info,
  Search,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { columns as columnDefs } from "./RekapPmb/columns";
import { PmbTable } from "./RekapPmb/pmb-table";
import { PmbDashboard } from "./RekapPmb/pmb-dashboard";

export default function RekapPmbPage() {
  const { tahun, semester } = usePeriod();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isError, error, page, setPage, limit, setLimit } =
    useRekapPmb(debouncedSearch);

  // Memoize columns and source data for RevoGrid performance
  const columns = useMemo(() => columnDefs, []);
  const source = useMemo(() => data?.datas || [], [data?.datas]);

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

  // Dashboard Data Aggregation
  const dashboardData = useMemo(() => {
    if (!source || source.length === 0) {
      return {
        totals: { peminat: 0, lulus: 0, daftar: 0 },
        distribution: [],
        topProdis: [],
      };
    }

    const categories = [
      { id: "snbp", label: "SNBP" },
      { id: "snbt", label: "SNBT" },
      { id: "smbjm_cbt", label: "CBT" },
      { id: "smbjm_raport", label: "Raport" },
      { id: "smbjm_talent", label: "Talent" },
      { id: "smbjm_utbk", label: "UTBK" },
      { id: "profesi", label: "Profesi" },
      { id: "internasional", label: "Intl" },
      { id: "pasca", label: "Pasca" },
      { id: "adikpapua", label: "ADIK" },
    ];

    const distMap: Record<string, any> = {};
    categories.forEach((cat) => {
      distMap[cat.id] = { name: cat.label, peminat: 0, lulus: 0, daftar: 0 };
    });

    let totalPeminat = 0;
    let totalLulus = 0;
    let totalDaftar = 0;

    source.forEach((item) => {
      const global = item.jumlah;
      totalPeminat += parseInt(global.peminat || "0");
      totalLulus += parseInt(global.lulus || "0");
      totalDaftar += parseInt(global.daftar || "0");

      categories.forEach((cat) => {
        const stats = item[cat.id as keyof typeof item] as any;
        if (stats) {
          distMap[cat.id].peminat += parseInt(stats.peminat || "0");
          distMap[cat.id].lulus += parseInt(stats.lulus || "0");
          distMap[cat.id].daftar += parseInt(stats.daftar || "0");
        }
      });
    });

    const topProdis = [...source]
      .sort(
        (a, b) =>
          parseInt(b.jumlah.peminat || "0") - parseInt(a.jumlah.peminat || "0"),
      )
      .slice(0, 5)
      .map((item) => ({
        name: item.nama_prodi.split("(")[0].trim(),
        peminat: parseInt(item.jumlah.peminat || "0"),
      }));

    return {
      totals: {
        peminat: totalPeminat,
        lulus: totalLulus,
        daftar: totalDaftar,
      },
      distribution: Object.values(distMap),
      topProdis,
    };
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

      {/* Visual Dashboard Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 rounded-[2.5rem]" />
          <Skeleton className="h-40 rounded-[2.5rem]" />
          <Skeleton className="h-40 rounded-[2.5rem]" />
        </div>
      ) : (
        <PmbDashboard data={dashboardData} />
      )}

      {/* Modern Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 backdrop-blur-md p-4 rounded-3xl border border-primary/5 shadow-sm">
        <div className="relative w-full sm:w-96 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="size-4" />
          </div>
          <Input
            placeholder="Cari Program Studi..."
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
