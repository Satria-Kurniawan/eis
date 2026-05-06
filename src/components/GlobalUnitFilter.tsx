import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useUnitKerja } from "@/hooks/use-unit-kerja";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Check,
  ChevronsUpDown,
  Eraser,
  Filter,
  Loader2,
  School,
  Subtitles,
} from "lucide-react";
import { useMemo, useState } from "react";

export function GlobalUnitFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const { getFakultas, getJurusan, getProdi, isLoading } = useUnitKerja(isOpen);
  const {
    kodeFakultas,
    setKodeFakultas,
    kodeJurusan,
    setKodeJurusan,
    kodeProdi,
    setKodeProdi,
    resetFilter,
  } = useUnitFilter();

  const fakultasOptions = useMemo(
    () => getFakultas(),
    [getFakultas, isLoading],
  );
  const jurusanOptions = useMemo(
    () => getJurusan(kodeFakultas),
    [kodeFakultas, getJurusan, isLoading],
  );
  const prodiOptions = useMemo(
    () => getProdi(kodeFakultas, kodeJurusan),
    [kodeFakultas, kodeJurusan, getProdi, isLoading],
  );

  const handleFakultasChange = (val: string) => {
    setKodeFakultas(val);
    setKodeJurusan("");
    setKodeProdi("");
  };

  const handleJurusanChange = (val: string) => {
    setKodeJurusan(val);
    setKodeProdi("");
  };

  const hasActiveFilters = kodeFakultas || kodeJurusan || kodeProdi;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex items-center justify-center h-10 w-10 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md shadow-sm hover:border-primary/40 hover:bg-primary/5 transition-all group shrink-0"
          title="Filter Unit"
        >
          <Filter className="size-4 text-primary group-hover:scale-110 transition-transform" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full size-3 bg-primary"></span>
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="z-999 w-[400px] sm:w-[540px] rounded-l-[2.5rem] border-l border-primary/20 bg-background/95 backdrop-blur-3xl shadow-2xl p-8 flex flex-col">
        <SheetHeader className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Filter className="size-6" />
            </div>
            <SheetTitle className="text-2xl font-black tracking-tighter">
              Filter Akademik
            </SheetTitle>
          </div>
          <SheetDescription className="text-muted-foreground font-medium text-sm">
            Tentukan unit akademik spesifik untuk memfilter data pada dashboard
            dan tabel. Filter ini berlaku secara global.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-3xl">
              <Loader2 className="size-8 text-primary animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary animate-pulse">
                Memuat Unit Kerja...
              </p>
            </div>
          )}

          <div
            className={cn(
              "space-y-6 transition-all duration-300",
              isLoading
                ? "blur-[2px] opacity-50 pointer-events-none"
                : "opacity-100",
            )}
          >
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                Fakultas
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full h-12 justify-between border-primary/10 rounded-2xl bg-muted/30 hover:bg-muted/50 font-bold transition-all"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <School className="size-4 text-primary/60" />
                      {kodeFakultas
                        ? fakultasOptions.find(
                            (f) => f.uk_kode === kodeFakultas,
                          )?.uk_nama
                        : "Pilih Fakultas"}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[360px] p-0 rounded-2xl border-primary/10 backdrop-blur-2xl z-1001">
                  <Command className="rounded-2xl">
                    <CommandInput
                      placeholder="Cari Fakultas..."
                      className="h-12 font-bold"
                    />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {fakultasOptions.map((f) => (
                          <CommandItem
                            key={f.uk_id}
                            value={f.uk_nama}
                            onSelect={() => handleFakultasChange(f.uk_kode)}
                            className="rounded-xl font-bold py-3 my-1 cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-3 h-4 w-4 text-primary",
                                kodeFakultas === f.uk_kode
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

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                Jurusan
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    disabled={!kodeFakultas}
                    className="w-full h-12 justify-between border-primary/10 rounded-2xl bg-muted/30 hover:bg-muted/50 font-bold transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Subtitles className="size-4 text-primary/60" />
                      {kodeJurusan
                        ? jurusanOptions.find((j) => j.uk_kode === kodeJurusan)
                            ?.uk_nama
                        : kodeFakultas
                          ? "Pilih Jurusan"
                          : "Pilih Fakultas Dahulu"}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[360px] p-0 rounded-2xl border-primary/10 backdrop-blur-2xl z-1001">
                  <Command className="rounded-2xl">
                    <CommandInput
                      placeholder="Cari Jurusan..."
                      className="h-12 font-bold"
                    />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {jurusanOptions.map((j) => (
                          <CommandItem
                            key={j.uk_id}
                            value={j.uk_nama}
                            onSelect={() => handleJurusanChange(j.uk_kode)}
                            className="rounded-xl font-bold py-3 my-1 cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-3 h-4 w-4 text-primary",
                                kodeJurusan === j.uk_kode
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

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">
                Program Studi
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    disabled={!kodeJurusan}
                    className="w-full h-12 justify-between border-primary/10 rounded-2xl bg-muted/30 hover:bg-muted/50 font-bold transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Briefcase className="size-4 text-primary/60" />
                      {kodeProdi
                        ? prodiOptions.find((p) => p.uk_kode === kodeProdi)
                            ?.uk_nama
                        : kodeJurusan
                          ? "Pilih Prodi"
                          : "Pilih Jurusan Dahulu"}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[360px] p-0 rounded-2xl border-primary/10 backdrop-blur-2xl z-1001">
                  <Command className="rounded-2xl">
                    <CommandInput
                      placeholder="Cari Prodi..."
                      className="h-12 font-bold"
                    />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {prodiOptions.map((p) => (
                          <CommandItem
                            key={p.uk_id}
                            value={p.uk_nama}
                            onSelect={() => setKodeProdi(p.uk_kode)}
                            className="rounded-xl font-bold py-3 my-1 cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-3 h-4 w-4 text-primary",
                                kodeProdi === p.uk_kode
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
        </div>

        <div className="pt-8 border-t border-primary/10 mt-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={resetFilter}
            disabled={!hasActiveFilters}
            className="rounded-xl font-bold text-destructive hover:bg-destructive/10 hover:text-destructive px-6"
          >
            <Eraser className="size-4 mr-2" />
            Reset Filter
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg shadow-primary/20"
          >
            Terapkan
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
