import logoUndiksha from "@/assets/logo-undiksha.png";
import Antigravity from "@/components/Antigravity";
import {
  ArrowRight,
  BookOpen,
  Building,
  GraduationCap,
  LineChart,
  LogIn,
  Moon,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize global theme
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

  const toggleTheme = () => {
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
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-white dark:bg-[#050505] font-sans text-slate-800 dark:text-slate-100 transition-colors duration-700 overflow-hidden"
    >
      {/* THE 3D FIBER ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Antigravity
          count={450}
          magnetRadius={15}
          ringRadius={12}
          particleVariance={1.2}
          particleSize={isMobile ? 0.3 : 0.7}
          autoAnimate={true}
        />
      </div>

      {/* FIXED TOP NAVIGATION - Minimalist */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center px-8 lg:px-16 backdrop-blur-md bg-white/20 dark:bg-[#050505]/40 border-b border-slate-200/50 dark:border-white/5 transition-colors">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center p-1.5 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shadow-sm">
            <img
              src={logoUndiksha}
              alt="Logo Undiksha"
              className="h-9 w-9 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-[0.2em] text-xs uppercase text-slate-900 dark:text-white leading-none mb-0.5">
              UNDIKSHA
            </span>
            <span className="text-[10px] font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase leading-none opacity-80">
              Cyber EIS
            </span>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shadow-sm"
        >
          {isDark ? (
            <Sun className="size-4 text-slate-300" />
          ) : (
            <Moon className="size-4 text-slate-600" />
          )}
        </button>
      </div>

      {/* NORMAL FLOW LAYOUT (z-10 ensures UI clicks don't fall through) */}
      <div className="relative z-10 flex flex-col w-full px-6 lg:px-16 pt-[25vh] pb-32 pointer-events-none">
        {/* HERO SECTION */}
        <motion.div className="flex flex-col items-center justify-center text-center min-h-[50vh] max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 flex items-center justify-center gap-3 px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
          >
            <div className="size-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
              Platform Analitik Terpadu
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] text-slate-900 dark:text-white mb-6"
          >
            Executive Information System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl text-lg sm:text-2xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed tracking-tight"
          >
            Infrastruktur pemantauan real-time generasi masa depan. Mengolah
            big-data kampus menjadi inteligensi strategis yang presisi.
          </motion.p>

          {/* ELEGANT ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex flex-col sm:flex-row items-center gap-6"
          >
            {/* CTA: Akses Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="group pointer-events-auto relative flex items-center gap-4 px-10 py-5 rounded-full bg-slate-950 dark:bg-white overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-[0_12px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_24px_rgba(255,255,255,0.1)] border border-transparent dark:border-white/10"
            >
              <div className="absolute inset-0 bg-sky-600 dark:bg-slate-200 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]" />

              <span className="relative z-10 text-white dark:text-slate-900 group-hover:text-white dark:group-hover:text-slate-900 font-bold tracking-widest uppercase text-xs transition-colors duration-300">
                Akses Dashboard
              </span>
              <div className="relative z-10 flex items-center justify-center p-2 rounded-full bg-white/10 dark:bg-black/5 group-hover:bg-white/20 dark:group-hover:bg-slate-300 transition-colors duration-300">
                <ArrowRight className="size-4 text-white dark:text-slate-900 transition-all duration-300 group-hover:-rotate-45 group-hover:translate-x-1" />
              </div>
            </button>

            {/* CTA: Login SSO */}
            <button
              onClick={() => alert("Ke Halaman SSO...")}
              className="group pointer-events-auto relative flex items-center gap-4 px-10 py-5 rounded-full bg-white/80 dark:bg-[#0a0a0a] backdrop-blur-md border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-slate-50 dark:hover:bg-black shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
            >
              <span className="relative z-10 text-slate-800 dark:text-slate-300 font-bold tracking-widest uppercase text-xs transition-colors duration-300">
                Login SSO
              </span>
              <div className="relative z-10 flex items-center justify-center p-2 rounded-full bg-slate-100 dark:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600">
                <LogIn className="size-4 text-slate-800 dark:text-slate-300 transition-all duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </motion.div>
        </motion.div>

        {/* FEATURES SECTION */}
        <motion.div className="mt-24 flex flex-col items-center w-full">
          {/* Subtle line separator */}
          <div className="w-px h-24 bg-linear-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-16 opacity-50 pointer-events-none" />

          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Akademik Hub",
                desc: "Pemantauan real-time untuk jadwal, KHS, dan evaluasi pengajaran kampus.",
                icon: BookOpen,
              },
              {
                title: "Kemahasiswaan",
                desc: "Analisis komprehensif log data beasiswa dan portofolio prestasi mahasiswa.",
                icon: GraduationCap,
              },
              {
                title: "Rekam Jejak Kinerja",
                desc: "Pelacakan indikator vital, dari publikasi saintifik hingga paten HKI.",
                icon: LineChart,
              },
              {
                title: "Keuangan Dashboard",
                desc: "Visualisasi tata kelola anggaran dan aset secara matematis dan presisi.",
                icon: Building,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="pointer-events-auto group relative flex flex-col p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.02)] hover:border-slate-300 dark:hover:border-white/10"
              >
                <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <card.icon
                    className="size-6 text-slate-800 dark:text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-slate-500 dark:text-slate-400">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="pointer-events-auto flex items-center gap-6 p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-transparent group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors duration-500">
              <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-sky-400">
                <Zap className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">
                  Logika Kafka Events Minimalis
                </h4>
                <p className="text-xs font-light text-slate-500 dark:text-slate-500">
                  Arsitektur replikasi tinggi dan minim latensi interkoneksi.
                </p>
              </div>
            </div>
            <div className="pointer-events-auto flex items-center gap-6 p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-transparent group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors duration-500">
              <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-300 text-slate-800 dark:text-amber-400">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">
                  Sentralisasi Kriptografis
                </h4>
                <p className="text-xs font-light text-slate-500 dark:text-slate-500">
                  Konsolidasi tanpa mengorbankan integritas sumber sistem.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
