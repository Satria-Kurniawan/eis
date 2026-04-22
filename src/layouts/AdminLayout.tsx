import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePeriod } from "@/contexts/PeriodContext";
import {
  Activity,
  BookOpen,
  Building,
  Calendar,
  ChevronDown,
  GraduationCap,
  LineChart,
  Moon,
  Sparkles,
  Sun,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { GlobalUnitFilter } from "@/components/GlobalUnitFilter";

export default function AdminLayout() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const period = usePeriod();

  useEffect(() => {
    const isDarkGlobal = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkGlobal);
    if (isDarkGlobal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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

  const toggleSidebarTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader className="h-16 flex items-center px-4 gap-3">
          <div className="size-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
            <Activity className="size-5" />
          </div>
          <span className="font-bold text-lg select-none truncate">EIS Admin</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
            <SidebarMenu>
              {/* <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/dashboard"}
                >
                  <Link to="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
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
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === "/kemahasiswaan/dashboard"
                          }
                        >
                          <Link to="/kemahasiswaan/dashboard">
                            <span>Dashboard Mahasiswa</span>
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Wallet />
                    <span>Keuangan</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2 sm:gap-4">
              <h1 className="font-semibold text-xs sm:text-sm mr-2 hidden md:block">
                EIS Dashboard
              </h1>

              <GlobalUnitFilter />

              <div className="relative group shrink-0">
                <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-purple-600 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <Select
                  value={currentPeriod.label}
                  onValueChange={handlePeriodChange}
                >
                  <SelectTrigger className="relative w-[130px] sm:w-[220px] h-10 rounded-full border-primary/20 bg-background/50 backdrop-blur-md shadow-sm hover:border-primary/40 transition-all font-bold text-[10px] sm:text-xs uppercase tracking-wider pl-3 sm:pl-4">
                    <div className="flex items-center gap-2 truncate">
                      <Calendar className="size-4 text-primary animate-pulse" />
                      <SelectValue placeholder="Pilih Periode" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-primary/10 shadow-2xl backdrop-blur-xl">
                    {academicPeriods.map((p) => (
                      <SelectItem
                        key={p.label}
                        value={p.label}
                        className="rounded-xl focus:bg-primary/10 focus:text-primary transition-colors py-2.5 my-1"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="size-3 text-amber-500" />
                          <span className="font-bold">{p.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <button
            onClick={toggleSidebarTheme}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
        </header>
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />

          {/* Premium Floating Dashboard Button */}
          <AnimatePresence>
            {location.pathname !== "/dashboard" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ y: -4 }}
                className="fixed bottom-8 right-8 z-50"
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
