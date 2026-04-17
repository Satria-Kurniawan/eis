import { usePeriod } from "@/contexts/PeriodContext";
import { 
  Handshake, 
  GraduationCap, 
  TrendingUp,
  Layout
} from "lucide-react";
import { motion } from "motion/react";

export default function KerjasamaPage() {
  const { tahun, semester } = usePeriod();

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
            <Handshake className="size-4" />
            <span>Konektivitas Institusi</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">
            Kerjasama
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Daftar kemitraan strategis dan program kerjasama yang sedang berjalan.
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

      <div className="grid gap-6">
        <div className="p-12 rounded-[2rem] border bg-card/40 backdrop-blur-sm shadow-sm border-primary/5 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-3xl bg-primary/5 text-primary">
              <Layout className="size-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Modul Dalam Pengembangan</h2>
              <p className="text-muted-foreground">Portfolio kerjasama institusi sedang dalam tahap pendataan sistem baru.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
