import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Antigravity from "@/components/Antigravity";
import { Home, LogIn, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnauthorizedPageProps {
  title?: string;
  message?: string;
  showSsoButton?: boolean;
}

export default function UnauthorizedPage({
  title = "Akses Terbatas",
  message = "Anda belum masuk atau sesi Anda telah berakhir. Silakan login terlebih dahulu menggunakan Single Sign-On (SSO) Undiksha untuk mengakses halaman ini.",
  showSsoButton = true,
}: UnauthorizedPageProps) {
  const navigate = useNavigate();

  const handleSsoLogin = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
    window.location.href = `${apiBaseUrl}/api/v1/auth/login`;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#050505] flex items-center justify-center font-sans transition-colors duration-700">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Antigravity
          count={150}
          particleSize={0.6}
          magnetRadius={20}
          autoAnimate={true}
        />
      </div>

      <div className="relative z-10 text-center space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter text-slate-900 dark:text-white opacity-[0.03] dark:opacity-[0.05] select-none pointer-events-none">
            401
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 backdrop-blur-sm mb-4">
                <ShieldAlert className="size-3.5 text-rose-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
                  Akses Ditolak: Unauthorized
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title.split(" ")[0]} <span className="text-rose-500">{title.split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-md mx-auto font-medium leading-relaxed">
                {message}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/")}
            className="rounded-full px-8 h-14 font-bold border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all gap-2 group pointer-events-auto cursor-pointer"
          >
            <Home
              size={18}
              className="group-hover:scale-110 transition-transform text-slate-500 dark:text-slate-400"
            />
            Ke Beranda
          </Button>
          
          {showSsoButton && (
            <Button
              size="lg"
              onClick={handleSsoLogin}
              className="rounded-full px-8 h-14 font-bold bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-xl gap-2 pointer-events-auto cursor-pointer transition-all hover:scale-105"
            >
              <LogIn size={18} />
              Login SSO
            </Button>
          )}
        </motion.div>
      </div>

      {/* Decorative Gradient Blurs */}
      <div className="absolute top-[-10%] left-[-10%] size-[40%] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] size-[40%] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
    </div>
  );
}
