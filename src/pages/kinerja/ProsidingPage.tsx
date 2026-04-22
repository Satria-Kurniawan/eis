import { motion } from "motion/react";
import { Presentation } from "lucide-react";

export default function ProsidingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-10 space-y-8 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-[0.2em]">
            <Presentation className="size-4" />
            <span>Kinerja Dosen</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground">
            Data Prosiding
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-lg">
            Monitor publikasi pada prosiding konferensi ilmiah.
          </p>
        </div>
      </div>
      
      <div className="bg-card/50 backdrop-blur-xl border border-primary/10 rounded-[2rem] p-12 flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="p-6 rounded-full bg-primary/10 text-primary">
          <Presentation className="size-12" />
        </div>
        <h2 className="text-2xl font-bold italic">Modul Prosiding Sedang Dalam Pengembangan</h2>
        <p className="text-muted-foreground max-w-md">
          Halaman ini akan segera tersedia dengan integrasi basis data konferensi internasional.
        </p>
      </div>
    </motion.div>
  );
}
