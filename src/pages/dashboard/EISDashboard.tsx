import bg1 from "@/assets/bg1.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Activity,
  BookOpen,
  Building,
  GraduationCap,
  LineChart,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import "./Dashboard.css";

const IsoCube = ({
  w = 40,
  h = 20,
  z = 20,
  color,
  leftColor,
  rightColor,
  className = "",
}: any) => (
  <svg
    width={w}
    height={h + z}
    viewBox={`0 0 ${w} ${h + z}`}
    className={`overflow-visible drop-shadow-2xl ${className}`}
  >
    {/* Top face */}
    <polygon
      points={`0,${h / 2} ${w / 2},0 ${w},${h / 2} ${w / 2},${h}`}
      fill={color}
    />
    {/* Left face */}
    <polygon
      points={`0,${h / 2} ${w / 2},${h} ${w / 2},${h + z} 0,${h / 2 + z}`}
      fill={leftColor}
    />
    {/* Right face */}
    <polygon
      points={`${w / 2},${h} ${w},${h / 2} ${w},${h / 2 + z} ${w / 2},${h + z}`}
      fill={rightColor}
    />
  </svg>
);

const nodes = [
  {
    id: "hub",
    x: 600,
    y: 450,
    type: "hub",
    color: "#ff8c42",
    leftColor: "#e66c1f",
    rightColor: "#cc5300",
    label: "EIS Core Hub",
  },
  {
    id: "akademik",
    x: 300,
    y: 250,
    type: "sector",
    title: "Akademik",
    subtitle: "Data Sistem Akademik",
    color: "#3b82f6",
    leftColor: "#2563eb",
    rightColor: "#1d4ed8",
    icon: <BookOpen size={20} />,
    progress: 92,
    details:
      "Sistem Informasi Akademik beroperasi dalam kapasitas optimal. Beban server SIAKAD stabil di rentang 20-35%. Proses sinkronisasi nilai mahasiswa mencapai 92% keberhasilan real-time. Terdapat 12.500 data mahasiswa aktif semester ini yang telah tervalidasi dengan PDDIKTI tanpa anomali data.",
  },
  {
    id: "kemahasiswaan",
    x: 200,
    y: 550,
    type: "sector",
    title: "Kemahasiswaan",
    subtitle: "Kegiatan & Prestasi",
    color: "#f97316",
    leftColor: "#ea580c",
    rightColor: "#c2410c",
    icon: <Users size={20} />,
    progress: 85,
    details:
      "Data UKM dan SKPI mahasiswa telah disinkronisasikan 85%. Pendaftaran beasiswa sedang berlangsung dengan throughput rata-rata 50 proposal per hari. Indikator Sistem Kemahasiswaan mendeteksi 3 kegiatan tingkat nasional yang sedang diunggah ke database prestasi.",
  },
  {
    id: "alumni",
    x: 450,
    y: 750,
    type: "sector",
    title: "Alumni",
    subtitle: "Tracer Study 2026",
    color: "#10b981",
    leftColor: "#059669",
    rightColor: "#047857",
    icon: <GraduationCap size={20} />,
    progress: 78,
    details:
      "Aktivitas Tracer Study menunjukkan progress keterisian survei sebesar 78%. Analisis dashboard menunjukkan serapan lulusan kurang dari 6 bulan pasca lulus mendominasi di angka 60%. Semua data telah ter-enkripsi dan masuk ke cloud EIS.",
  },
  {
    id: "umum",
    x: 750,
    y: 750,
    type: "sector",
    title: "Umum & Kepegawaian",
    subtitle: "SDM & Aset",
    color: "#64748b",
    leftColor: "#475569",
    rightColor: "#334155",
    icon: <Building size={20} />,
    progress: 98,
    details:
      "Tingkat ketersediaan server umum dan portal kepegawaian 98%. Data absensi face-recognition real-time termonitor normal. Log inventaris barang & fasilitas gedung utama kampus A telah dilaporkan lengkap.",
  },
  {
    id: "kinerja",
    x: 1000,
    y: 550,
    type: "sector",
    title: "Kinerja",
    subtitle: "IKU & Evaluasi",
    color: "#a855f7",
    leftColor: "#9333ea",
    rightColor: "#7e22ce",
    icon: <LineChart size={20} />,
    progress: 88,
    details:
      "Indikator Kinerja Utama (IKU) tercatat di angka rata-rata 88% dari target kuartal kedua. Beban Penugasan Dosen (BKD) telah ditarik otomatis dari sistem SISTER untuk proses evaluasi.",
  },
  {
    id: "keuangan",
    x: 900,
    y: 250,
    type: "sector",
    title: "Keuangan",
    subtitle: "Anggaran & Realisasi",
    color: "#eab308",
    leftColor: "#ca8a04",
    rightColor: "#a16207",
    icon: <Wallet size={20} />,
    progress: 65,
    details:
      "Realisasi anggaran semester ini mencapai 65%. Trafik API Gateway dengan perbankan nasional untuk UKT menunjukkan latensi rendah (<15ms). Semua integrasi dengan aplikasi keuangan Kemenkeu hijau.",
  },
];

const paths = [
  // Akademik -> Hub
  {
    d: "M 300 250 L 610 405 Q 650 425 610 445 L 600 450",
    stroke: "url(#grad-blue)",
  },
  // Kemahasiswaan -> Hub
  {
    d: "M 200 550 L 260 580 Q 300 600 340 580 L 600 450",
    stroke: "url(#grad-orange)",
  },
  // Alumni -> Hub
  {
    d: "M 450 750 L 785 582.5 Q 825 562.5 785 542.5 L 600 450",
    stroke: "url(#grad-green)",
  },
  // Umum -> Hub
  {
    d: "M 750 750 L 415 582.5 Q 375 562.5 415 542.5 L 600 450",
    stroke: "url(#grad-gray)",
  },
  // Kinerja -> Hub
  {
    d: "M 1000 550 L 940 580 Q 900 600 860 580 L 600 450",
    stroke: "url(#grad-purple)",
  },
  // Keuangan -> Hub
  {
    d: "M 900 250 L 590 405 Q 550 425 590 445 L 600 450",
    stroke: "url(#grad-yellow)",
  },
];

export default function EISDashboard() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [selectedNode, setSelectedNode] = useState<(typeof nodes)[0] | null>(
    null,
  );

  useEffect(() => {
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

  // Dynamic Theme Classes
  const bgClass = isDark ? "bg-[#0a0a0c]" : "bg-slate-100";
  const panelBg = isDark
    ? "bg-[#1c1d22]/80 border-[#2e303a]"
    : "bg-white/90 border-slate-200";
  const titleClass = isDark ? "text-[#f3f4f6]" : "text-slate-800";
  const subtitleClass = isDark ? "text-[#9ca3af]" : "text-slate-500";
  const progressTrack = isDark ? "#2e303a" : "#e2e8f0";
  const mapStyle = isDark
    ? "opacity-[0.15] grayscale"
    : "opacity-20 grayscale contrast-125 invert";

  return (
    <div
      className={`relative w-full h-full min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center font-sans transition-colors duration-500 ${bgClass}`}
    >
      {/* Background Map Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${mapStyle}`}
      >
        <img
          src={bg1}
          alt="Background Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Container 1200x800 coordinate system */}
      <div className="relative w-[1200px] h-[800px] max-w-full max-h-full scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 shrink-0">
        {/* SVG Plane for Lines */}
        <svg
          viewBox="0 0 1200 800"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          <defs>
            <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
            <linearGradient
              id="grad-orange"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
            <linearGradient id="grad-green" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
            <linearGradient id="grad-gray" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={isDark ? "#9ca3af" : "#64748b"} />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
            <linearGradient
              id="grad-purple"
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
            <linearGradient
              id="grad-yellow"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
          </defs>

          {paths.map((p, i) => (
            <motion.path
              key={i}
              d={p.d}
              fill="none"
              stroke={p.stroke}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isDark ? 0.8 : 0.6 }}
              transition={{ duration: 2, delay: i * 0.2, ease: "easeOut" }}
              className="drop-shadow-lg transition-opacity duration-500"
            />
          ))}
          {/* Animated data packets traveling along lines */}
          {paths.map((p, i) => (
            <motion.circle
              key={`packet-${i}`}
              r={3}
              fill={isDark ? "#fff" : "#334155"}
              className={
                isDark
                  ? "drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                  : "drop-shadow-none"
              }
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
              style={{
                offsetPath: `path('${p.d}')`,
              }}
            />
          ))}
        </svg>

        {/* Nodes Layer */}
        {nodes.map((node) => {
          const isHub = node.type === "hub";
          const nodeColor =
            !isDark && node.color === "#9ca3af" ? "#64748b" : node.color;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(node.x / 1200) * 100}%`,
                top: `${(node.y / 800) * 100}%`,
              }}
            >
              {/* Glowing ring under node */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm pointer-events-none transition-opacity duration-500 ${isDark ? "opacity-40" : "opacity-20"}`}
                style={{
                  width: isHub ? "120px" : "60px",
                  height: isHub ? "60px" : "30px",
                  backgroundColor: nodeColor,
                  transform: "translate(-50%, -50%) rotateX(60deg)",
                }}
              />

              {isHub && (
                <div className="relative pointer-events-none drop-shadow-[0_15px_15px_rgba(255,140,66,0.3)]">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 mb-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(255,140,66,0.6)] ${isDark ? "bg-[#ff8c42]" : "bg-[#e66c1f]"}`}
                    >
                      <Activity size={28} className="text-white fill-white" />
                      <div
                        className={`absolute inset-0 rounded-full border-2 animate-ping opacity-60 ${isDark ? "border-[#ff8c42]" : "border-[#e66c1f]"}`}
                      ></div>
                    </div>
                  </div>
                  <IsoCube
                    w={80}
                    h={40}
                    z={60}
                    color={nodeColor}
                    leftColor={node.leftColor}
                    rightColor={node.rightColor}
                  />
                  <div className="absolute bottom-0 right-[-10px]">
                    <IsoCube
                      w={40}
                      h={20}
                      z={30}
                      color={nodeColor}
                      leftColor={node.leftColor}
                      rightColor={node.rightColor}
                    />
                  </div>
                </div>
              )}

              {node.type === "sector" && (
                <div
                  className="relative group cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Info Panel Hovering */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`absolute -top-14 left-1/2 -translate-x-1/2 w-max min-w-[220px] flex items-center gap-3 p-3 rounded-2xl backdrop-blur-md border shadow-xl z-20 transition-colors duration-500 ${panelBg} pointer-events-none`}
                  >
                    {/* Progress Circle Graphic */}
                    {node.progress && (
                      <div className="relative w-10 h-10 flex items-center justify-center shrink-0 bg-background rounded-full border shadow-sm">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke={progressTrack}
                            strokeWidth="2.5"
                            className="transition-colors duration-500"
                          />
                          <motion.circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke={nodeColor}
                            strokeWidth="2.5"
                            strokeDasharray="100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{
                              strokeDashoffset:
                                100 - (100 * node.progress) / 100,
                            }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span
                          className={`absolute text-[8px] font-bold ${titleClass}`}
                        >
                          {node.progress}%
                        </span>
                      </div>
                    )}

                    <div>
                      <h3
                        className={`text-sm font-bold transition-colors duration-500 ${titleClass}`}
                      >
                        {node.title}
                      </h3>
                      <p
                        className={`text-xs mt-0.5 transition-colors duration-500 ${subtitleClass}`}
                      >
                        {node.subtitle}
                      </p>
                    </div>
                  </motion.div>

                  {/* Cube Node */}
                  <IsoCube
                    w={45}
                    h={22}
                    z={25}
                    color={nodeColor}
                    leftColor={node.leftColor}
                    rightColor={node.rightColor}
                  />
                </div>
              )}

              {isHub && (
                <div
                  className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 backdrop-blur-md px-4 py-1.5 rounded-full border text-sm font-bold tracking-tight z-10 w-max shadow-xl transition-colors duration-500 ${panelBg} ${titleClass}`}
                >
                  {node.label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Side Panel showing Node Details */}
      <Sheet
        open={!!selectedNode}
        onOpenChange={(open) => !open && setSelectedNode(null)}
      >
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader className="mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: selectedNode?.color }}
              >
                {selectedNode?.icon}
              </div>
              <div>
                <SheetTitle className="text-2xl">
                  {selectedNode?.title}
                </SheetTitle>
                <SheetDescription>{selectedNode?.subtitle}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {selectedNode && (
            <div className="space-y-6">
              <div className="p-5 border rounded-2xl bg-muted/30">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-semibold">
                    System Synchronization Status
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: selectedNode.color }}
                  >
                    {selectedNode.progress}%
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${selectedNode.progress}%`,
                      backgroundColor: selectedNode.color,
                    }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 border-b pb-2">
                  Diagnostic Data Log
                </h4>
                <div className="text-sm leading-relaxed text-muted-foreground bg-muted/10 p-4 border rounded-xl">
                  {selectedNode.details}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
