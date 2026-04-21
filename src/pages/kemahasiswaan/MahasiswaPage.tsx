import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { usePeriod } from "@/contexts/PeriodContext";
import { useMahasiswa } from "@/hooks/kemahasiswaan/use-mahasiswa";
import { useUnitKerja } from "@/hooks/use-unit-kerja";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Check,
  ChevronsUpDown,
  Eraser,
  Filter,
  GraduationCap,
  RefreshCw,
  School,
  Subtitles,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { columns } from "./Mahasiswa/columns";
import { MahasiswaTable } from "./Mahasiswa/mahasiswa-table";

export default function MahasiswaPage() {
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
    filters,
    refetch,
    isFetching,
  } = useMahasiswa();

  const [showFilters, setShowFilters] = useState(true);
  const { getFakultas, getJurusan, getProdi } = useUnitKerja();

  const fakultasOptions = useMemo(() => getFakultas(), [getFakultas]);
  const jurusanOptions = useMemo(
    () => getJurusan(filters.kodeFakultas),
    [filters.kodeFakultas, getJurusan],
  );
  const prodiOptions = useMemo(
    () => getProdi(filters.kodeFakultas, filters.kodeJurusan),
    [filters.kodeFakultas, filters.kodeJurusan, getProdi],
  );

  const handleResetFilters = () => {
    filters.setAngkatan("");
    filters.setKodeFakultas("");
    filters.setKodeJurusan("");
    filters.setKodeProdi("");
    setPage(1);
  };

  const handleFakultasChange = (val: string) => {
    filters.setKodeFakultas(val);
    filters.setKodeJurusan(""); // Reset child
    filters.setKodeProdi(""); // Reset grandchild
    setPage(1);
  };

  const handleJurusanChange = (val: string) => {
    filters.setKodeJurusan(val);
    filters.setKodeProdi(""); // Reset child
    setPage(1);
  };

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
            <Users className="size-4" />
            <span>Manajemen Kemahasiswaan</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">
            Data Mahasiswa
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Pantau profil, status akademik, dan log riwayat mahasiswa secara
            komprehensif.
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
            <RefreshCw className="size-4" /> Gangguan Koneksi
          </AlertTitle>
          <AlertDescription>
            {(error as Error).message ||
              "Gagal menyelaraskan data mahasiswa dengan pangkalan data pusat."}
          </AlertDescription>
        </Alert>
      )}

      {/* Filter Toolbar */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <Filter className="size-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Opsi Pencarian</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-xl bg-muted/50 hover:bg-muted text-xs font-bold transition-all border border-primary/5"
            >
              {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
            </button>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-bold transition-all border border-red-500/10"
            >
              <Eraser className="size-3" />
              Reset
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6 rounded-[2.5rem] border bg-card/40 backdrop-blur-md shadow-xl border-primary/5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                    Angkatan
                  </label>
                  <div className="relative group">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Contoh: 2022"
                      className="pl-10 h-11 border-primary/10 rounded-2xl bg-background/50 focus-visible:ring-primary/20"
                      value={filters.angkatan}
                      onChange={(e) => {
                        filters.setAngkatan(e.target.value);
                        setPage(1);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                    Fakultas
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full h-11 justify-between border-primary/10 rounded-2xl bg-background/50 hover:bg-background/80 font-bold italic transition-all group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <School className="size-4 text-primary/60 group-hover:text-primary transition-colors" />
                          {filters.kodeFakultas
                            ? fakultasOptions.find(
                                (f) => f.uk_kode === filters.kodeFakultas,
                              )?.uk_nama
                            : "Pilih Fakultas"}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 rounded-2xl border-primary/10 backdrop-blur-2xl">
                      <Command className="rounded-2xl">
                        <CommandInput
                          placeholder="Cari Fakultas..."
                          className="h-11 font-bold"
                        />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            Fakultas tidak ditemukan.
                          </CommandEmpty>
                          <CommandGroup>
                            {fakultasOptions.map((f) => (
                              <CommandItem
                                key={f.uk_id}
                                value={f.uk_nama}
                                onSelect={() => handleFakultasChange(f.uk_kode)}
                                className="rounded-xl font-bold italic py-2.5 my-1"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary",
                                    filters.kodeFakultas === f.uk_kode
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {f.uk_nama}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                    Jurusan
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={!filters.kodeFakultas}
                        className="w-full h-11 justify-between border-primary/10 rounded-2xl bg-background/50 hover:bg-background/80 font-bold italic transition-all group disabled:opacity-30 disabled:grayscale"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Subtitles className="size-4 text-primary/60 group-hover:text-primary transition-colors" />
                          {filters.kodeJurusan
                            ? jurusanOptions.find(
                                (j) => j.uk_kode === filters.kodeJurusan,
                              )?.uk_nama
                            : filters.kodeFakultas
                              ? "Pilih Jurusan"
                              : "Pilih Fakultas Dulu"}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 rounded-2xl border-primary/10 backdrop-blur-2xl">
                      <Command className="rounded-2xl">
                        <CommandInput
                          placeholder="Cari Jurusan..."
                          className="h-11 font-bold"
                        />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            Jurusan tidak ditemukan.
                          </CommandEmpty>
                          <CommandGroup>
                            {jurusanOptions.map((j) => (
                              <CommandItem
                                key={j.uk_id}
                                value={j.uk_nama}
                                onSelect={() => handleJurusanChange(j.uk_kode)}
                                className="rounded-xl font-bold italic py-2.5 my-1"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary",
                                    filters.kodeJurusan === j.uk_kode
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {j.uk_nama}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                    Program Studi
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={!filters.kodeJurusan}
                        className="w-full h-11 justify-between border-primary/10 rounded-2xl bg-background/50 hover:bg-background/80 font-bold italic transition-all group disabled:opacity-30 disabled:grayscale"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Briefcase className="size-4 text-primary/60 group-hover:text-primary transition-colors" />
                          {filters.kodeProdi
                            ? prodiOptions.find(
                                (p) => p.uk_kode === filters.kodeProdi,
                              )?.uk_nama
                            : filters.kodeJurusan
                              ? "Pilih Prodi"
                              : "Pilih Jurusan Dulu"}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0 rounded-2xl border-primary/10 backdrop-blur-2xl">
                      <Command className="rounded-2xl">
                        <CommandInput
                          placeholder="Cari Prodi..."
                          className="h-11 font-bold"
                        />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            Prodi tidak ditemukan.
                          </CommandEmpty>
                          <CommandGroup>
                            {prodiOptions.map((p) => (
                              <CommandItem
                                key={p.uk_id}
                                value={p.uk_nama}
                                onSelect={() => {
                                  filters.setKodeProdi(p.uk_kode);
                                  setPage(1);
                                }}
                                className="rounded-xl font-bold italic py-2.5 my-1"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary",
                                    filters.kodeProdi === p.uk_kode
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {p.uk_nama}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
          <MahasiswaTable
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
          <span className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
          Channel Data:{" "}
          <span className="text-primary font-black tracking-widest uppercase">
            Mhs-Feed
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
