import logoUndiksha from "@/assets/logo-undiksha.png";
import eGanesha from "@/assets/e-ganesha.png";
import { FloatingSidebar } from "@/components/dashboard/FloatingSidebar";
import { GlobalHubPortal } from "@/components/dashboard/GlobalHubPortal";
import { HubFloatingButton } from "@/components/dashboard/HubFloatingButton";
import { GlobalUnitFilter } from "@/components/GlobalUnitFilter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { usePeriod } from "@/contexts/PeriodContext";
import { cn } from "@/lib/utils";
import {
  Activity,
  BookOpen,
  Building,
  Calendar,
  ChevronDown,
  Gauge,
  GraduationCap,
  Home,
  LayoutDashboard,
  LineChart,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLowSpec } from "@/contexts/LowSpecContext";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const location = useLocation();
  const period = usePeriod();
  const { isLowSpec, setIsLowSpec } = useLowSpec();

  useEffect(() => {
    const isDarkGlobal = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkGlobal);
    if (isDarkGlobal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const academicPeriods = [
    { label: "2023/2024 Ganjil", tahun: "2023", semester: "2" },
    { label: "2023/2024 Genap", tahun: "2023", semester: "1" },
    { label: "2024/2025 Ganjil", tahun: "2024", semester: "2" },
    { label: "2024/2025 Genap", tahun: "2024", semester: "1" },
    { label: "2025/2026 Ganjil", tahun: "2025", semester: "2" },
    { label: "2025/2026 Genap", tahun: "2025", semester: "1" },
  ];

  const currentPeriod =
    academicPeriods.find(
      (p) => p.tahun === period.tahun && p.semester === period.semester,
    ) || academicPeriods[4]; // Default to 2025/2026 Ganjil

  const handlePeriodChange = (value: string) => {
    const selected = academicPeriods.find((p) => p.label === value);
    if (selected) {
      period.setTahun(selected.tahun);
      period.setSemester(selected.semester);
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader className="h-16 flex items-center px-4 gap-3">
          <div className="size-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
            <Activity className="size-5" />
          </div>
          <span className="font-bold text-lg select-none truncate">
            EIS Admin
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/dashboard"}
                >
                  <Link to="/dashboard">
                    <Activity />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Modul Sistem</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Akademik">
                      <BookOpen />
                      <span>Akademik</span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname ===
                            "/akademik/perangkat-pembelajaran"
                          }
                        >
                          <Link to="/akademik/perangkat-pembelajaran">
                            <span>Perangkat Pembelajaran</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/akademik/evaluasi-dosen"
                          }
                        >
                          <Link to="/akademik/evaluasi-dosen">
                            <span>Evaluasi Dosen</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/akademik/angket-mahasiswa"
                          }
                        >
                          <Link to="/akademik/angket-mahasiswa">
                            <span>Angket Mahasiswa</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/akademik/kritik-saran"
                          }
                        >
                          <Link to="/akademik/kritik-saran">
                            <span>Kritik Saran</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/akademik/agenda-mengajar"
                          }
                        >
                          <Link to="/akademik/agenda-mengajar">
                            <span>Agenda Mengajar</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/akademik/mahasiswa-wisuda"
                          }
                        >
                          <Link to="/akademik/mahasiswa-wisuda">
                            <span>Mahasiswa Wisuda</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/akademik/rekap-pmb"}
                        >
                          <Link to="/akademik/rekap-pmb">
                            <span>Rekap Pmb</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname ===
                            "/akademik/khs-dilihat-orang-tua"
                          }
                        >
                          <Link to="/akademik/khs-dilihat-orang-tua">
                            <span>Khs Dilihat Orang Tua</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/akademik/penawaran"}
                        >
                          <Link to="/akademik/penawaran">
                            <span>Penawaran</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/akademik/jadwal-kuliah"
                          }
                        >
                          <Link to="/akademik/jadwal-kuliah">
                            <span>Jadwal Kuliah</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/akademik/karya-akhir"
                          }
                        >
                          <Link to="/akademik/karya-akhir">
                            <span>Karya Akhir</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/akademik/kerjasama"}
                        >
                          <Link to="/akademik/kerjasama">
                            <span>Kerjasama</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Kemahasiswaan">
                      <Users />
                      <span>Kemahasiswaan</span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/kemahasiswaan/mahasiswa"
                          }
                        >
                          <Link to="/kemahasiswaan/mahasiswa">
                            <span>Mahasiswa</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/kemahasiswaan/beasiswa"
                          }
                        >
                          <Link to="/kemahasiswaan/beasiswa">
                            <span>Beasiswa</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Alumni">
                      <GraduationCap />
                      <span>Alumni</span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/alumni/data-tracer"}
                        >
                          <Link to="/alumni/data-tracer">
                            <span>Data Tracer</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Umum & Kepegawaian">
                      <Building />
                      <span>Umum & Kepegawaian</span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/kepegawaian/dosen"}
                        >
                          <Link to="/kepegawaian/dosen">
                            <span>Data Dosen</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/kepegawaian/pegawai"
                          }
                        >
                          <Link to="/kepegawaian/pegawai">
                            <span>Data Pegawai</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Kinerja">
                      <LineChart />
                      <span>Kinerja</span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/kinerja/buku"}
                        >
                          <Link to="/kinerja/buku">
                            <span>Buku</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/kinerja/pengabdian"}
                        >
                          <Link to="/kinerja/pengabdian">
                            <span>Pengabdian</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/kinerja/jurnal"}
                        >
                          <Link to="/kinerja/jurnal">
                            <span>Jurnal</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/kinerja/hki"}
                        >
                          <Link to="/kinerja/hki">
                            <span>HKI</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/kinerja/prosiding"}
                        >
                          <Link to="/kinerja/prosiding">
                            <span>Prosiding</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === "/kinerja/penelitian"}
                        >
                          <Link to="/kinerja/penelitian">
                            <span>Penelitian</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Keuangan">
                      <Wallet />
                      <span>Keuangan</span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/keuangan/realisasi-unit"
                          }
                        >
                          <Link to="/keuangan/realisasi-unit">
                            <span>Realisasi Unit</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/keuangan/realisasi-bulan"
                          }
                        >
                          <Link to="/keuangan/realisasi-bulan">
                            <span>Realisasi Bulan</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-md px-4 justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* <SidebarTrigger /> */}
            <Link
              to="/"
              className="p-2 rounded-xl hover:bg-muted transition-all text-slate-500 hover:text-primary group active:scale-90 shrink-0"
              title="Kembali ke Beranda"
            >
              <Home className="size-5 group-hover:scale-110 transition-transform" />
            </Link>

            {location.pathname !== "/dashboard" && (
              <Link
                to="/dashboard"
                className="p-2 rounded-xl hover:bg-muted transition-all text-slate-500 hover:text-primary group active:scale-90 shrink-0"
                title="Ke Dashboard"
              >
                <LayoutDashboard className="size-5 group-hover:scale-110 transition-transform" />
              </Link>
            )}

            <div className="h-6 w-px bg-border hidden md:block mx-1" />

            <div className="flex items-center gap-3 shrink-0">
              <img
                src={logoUndiksha}
                alt="Logo Undiksha"
                className="h-7 w-7 object-contain hidden sm:block drop-shadow-sm"
              />
              <img
                src={eGanesha}
                alt="Logo E-Ganesha"
                className="h-7 object-contain hidden sm:block drop-shadow-sm"
              />
              <h1 className="font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white hidden lg:block">
                EIS <span className="text-primary">Undiksha</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <GlobalUnitFilter />

            <div className="relative group shrink-0">
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-purple-600 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <Popover open={isPeriodOpen} onOpenChange={setIsPeriodOpen}>
                <PopoverTrigger asChild>
                  <button className="relative flex items-center justify-center h-10 px-3 sm:px-4 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md shadow-sm hover:border-primary/40 hover:bg-primary/5 transition-all text-[10px] sm:text-xs font-bold uppercase tracking-wider group shrink-0">
                    <Calendar className="size-4 text-primary sm:mr-2 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">
                      {currentPeriod.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className="ml-2 text-slate-400 group-hover:text-primary transition-colors"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0 rounded-2xl border-primary/10 backdrop-blur-2xl">
                  <Command className="rounded-2xl">
                    <CommandInput
                      placeholder="Cari Periode..."
                      className="h-11 font-bold"
                    />
                    <CommandList>
                      <CommandEmpty className="py-6 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {academicPeriods.map((p) => (
                          <CommandItem
                            key={p.label}
                            value={p.label}
                            onSelect={() => {
                              handlePeriodChange(p.label);
                              setIsPeriodOpen(false);
                            }}
                            className="rounded-xl font-bold py-3 my-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Sparkles
                                className={cn(
                                  "size-3 text-amber-500",
                                  currentPeriod.label === p.label
                                    ? "opacity-100"
                                    : "opacity-30",
                                )}
                              />
                              {p.label}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <button
              onClick={() => setIsLowSpec(!isLowSpec)}
              className={`p-2 rounded-xl hover:bg-muted transition-all active:scale-90 shrink-0 ${isLowSpec ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20" : "text-slate-500 hover:text-primary"}`}
              title={
                isLowSpec ? "Mode Performa Aktif (Low Spec)" : "Mode Standar"
              }
            >
              <Gauge className="size-5" />
            </button>

            <AnimatedThemeToggler
              variant="circle"
              duration={600}
              className="p-2 rounded-xl hover:bg-muted transition-all text-slate-500 hover:text-primary active:scale-90 shrink-0 [&_svg]:size-5"
              title={isDark ? "Mode Terang" : "Mode Gelap"}
            />
          </div>
        </header>
        <FloatingSidebar />
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="container mx-auto md:pl-28 transition-all duration-500 min-h-full">
            <Outlet />
          </div>

          <GlobalHubPortal />
          <HubFloatingButton />

          {/* Premium Floating Dashboard Button */}
          <AnimatePresence>
            {location.pathname !== "/dashboard" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ y: -4 }}
                className="fixed bottom-24 right-8 z-45"
              >
                <div className="relative group">
                  {/* Outer Glow */}
                  <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="relative flex items-center gap-3 px-6 py-4 rounded-full bg-background/60 backdrop-blur-xl border border-primary/20 shadow-2xl hover:border-primary/40 hover:bg-background/80 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/20">
                      <Activity className="size-5" />
                    </div>
                    <div className="flex flex-col items-start pr-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary transition-colors">
                        Navigation
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        Back to Hub
                      </span>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
