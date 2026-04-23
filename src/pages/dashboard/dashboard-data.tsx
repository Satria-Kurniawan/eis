import {
  BookOpen,
  Building,
  GraduationCap,
  LineChart,
  Users,
  Wallet,
} from "lucide-react";

export const SCENE_W = 1200;
export const SCENE_H = 800;

export const paths = [
  {
    d: "M 300 250 L 610 405 Q 650 425 610 445 L 600 450",
    stroke: "url(#iot-grad-sky)",
  },
  {
    d: "M 200 550 L 260 580 Q 300 600 340 580 L 600 450",
    stroke: "url(#iot-grad-pink)",
  },
  {
    d: "M 450 750 L 785 582.5 Q 825 562.5 785 542.5 L 600 450",
    stroke: "url(#iot-grad-lime)",
  },
  {
    d: "M 750 750 L 415 582.5 Q 375 562.5 415 542.5 L 600 450",
    stroke: "url(#iot-grad-rose)",
  },
  {
    d: "M 1000 550 L 940 580 Q 900 600 860 580 L 600 450",
    stroke: "url(#iot-grad-purple)",
  },
  {
    d: "M 900 250 L 590 405 Q 550 425 590 445 L 600 450",
    stroke: "url(#iot-grad-teal)",
  },
];

export const nodes = [
  {
    id: "hub",
    x: 600,
    y: 450,
    kind: "hub" as const,
    color: "#ff8c42",
    left: "#e66c1f",
    right: "#cc5300",
    label: "EIS Core Hub",
  },
  {
    id: "akademik",
    x: 300,
    y: 250,
    kind: "sector" as const,
    title: "Akademik",
    subtitle: "Data Sistem Akademik",
    color: "#0ea5e9", // Sky 500
    left: "#0284c7",
    right: "#0369a1",
    icon: <BookOpen size={20} />,
    progress: 100, // Used for CDC Active visual
    details:
      "CDC Replication Active via Debezium Connector. Status: Streaming with Kafka. Transaction logs sedang dibaca secara real-time dari database akademik. Latensi sinkronisasi terjaga di bawah 15ms. Seluruh perubahan schema dan data terekam secara atomic pada Kafka cluster.",
    menuItems: [
      {
        label: "Perangkat Pembelajaran",
        path: "/akademik/perangkat-pembelajaran",
      },
      { label: "Evaluasi Dosen", path: "/akademik/evaluasi-dosen" },
      { label: "Angket Mahasiswa", path: "/akademik/angket-mahasiswa" },
      { label: "Kritik Saran", path: "/akademik/kritik-saran" },
      { label: "Agenda Mengajar", path: "/akademik/agenda-mengajar" },
      { label: "Mahasiswa Wisuda", path: "/akademik/mahasiswa-wisuda" },
      { label: "Rekap Pmb", path: "/akademik/rekap-pmb" },
      {
        label: "Khs Dilihat Orang Tua",
        path: "/akademik/khs-dilihat-orang-tua",
      },
      { label: "Penawaran", path: "/akademik/penawaran" },
      { label: "Jadwal Kuliah", path: "/akademik/jadwal-kuliah" },
      { label: "Karya Akhir", path: "/akademik/karya-akhir" },
      { label: "Kerjasama", path: "/akademik/kerjasama" },
    ],
  },
  {
    id: "kemahasiswaan",
    x: 200,
    y: 550,
    kind: "sector" as const,
    title: "Kemahasiswaan",
    subtitle: "Kegiatan & Prestasi",
    color: "#f472b6", // Pink 400
    left: "#db2777",
    right: "#be185d",
    icon: <Users size={20} />,
    progress: 100,
    details:
      "Kafka-based CDC Engine active for student activity logs. Mechanism: Debezium Event Streaming. Tidak terdeteksi adanya lag pada pipeline pendaftaran beasiswa dan UKM. Metadata prestasi nasional sedang direplikasi ke EIS Data Warehouse melalui Kafka topics.",
    menuItems: [
      { label: "Mahasiswa", path: "/kemahasiswaan/mahasiswa" },
      { label: "Beasiswa", path: "/kemahasiswaan/beasiswa" },
      { label: "Dashboard Mahasiswa", path: "/kemahasiswaan/dashboard" },
    ],
  },
  {
    id: "alumni",
    x: 450,
    y: 750,
    kind: "sector" as const,
    title: "Alumni",
    subtitle: "Tracer Study 2026",
    color: "#a3e635", // Lime 400
    left: "#65a30d",
    right: "#4d7c0f",
    icon: <GraduationCap size={20} />,
    progress: 100,
    details:
      "Real-time Change Data Capture via Debezium aktif pada tabel Tracer Study. Setiap feedback dari alumni langsung memicu pembaruan dashboard di EIS melalui Kafka Stream processing. Status replikasi: Healthy. Latensi: 8ms.",
    menuItems: [{ label: "Data Tracer", path: "/alumni/data-tracer" }],
  },
  {
    id: "umum",
    x: 750,
    y: 750,
    kind: "sector" as const,
    title: "Umum & Kepegawaian",
    subtitle: "SDM & Aset",
    color: "#fb7185", // Rose 400
    left: "#e11d48",
    right: "#be123c",
    icon: <Building size={20} />,
    progress: 100,
    details:
      "Monitoring CDC Debezium pada log absensi dan inventaris aset. Kafka data stream mengalir stabil tanpa interupsi. Sinkronisasi data kepegawaian melalui Kafka cluster terakhir dilakukan 0.2 detik yang lalu (Real-time).",
    menuItems: [
      { label: "Data Dosen", path: "/kepegawaian/dosen" },
      { label: "Data Pegawai", path: "/kepegawaian/pegawai" },
    ],
  },
  {
    id: "kinerja",
    x: 1000,
    y: 550,
    kind: "sector" as const,
    title: "Kinerja",
    subtitle: "IKU & Evaluasi",
    color: "#c084fc", // Purple 400
    left: "#9333ea",
    right: "#7e22ce",
    icon: <LineChart size={20} />,
    progress: 100,
    details:
      "Pipeline CDC Debezium untuk data IKU dan BKD SISTER sedang memproses Kafka topics terbaru. Sinkronisasi metadata kinerja dosen berjalan di background dengan throughput 200 msg/sec. Status: Kafka cluster all streams healthy.",
    menuItems: [
      { label: "Buku", path: "/kinerja/buku" },
      { label: "Pengabdian", path: "/kinerja/pengabdian" },
      { label: "Jurnal", path: "/kinerja/jurnal" },
      { label: "HKI", path: "/kinerja/hki" },
      { label: "Prosiding", path: "/kinerja/prosiding" },
      { label: "Penelitian", path: "/kinerja/penelitian" },
    ],
  },
  {
    id: "keuangan",
    x: 900,
    y: 250,
    kind: "sector" as const,
    title: "Keuangan",
    subtitle: "Anggaran & Realisasi",
    color: "#2dd4bf", // Teal 400
    left: "#0d9488",
    right: "#0f766e",
    icon: <Wallet size={20} />,
    progress: 100,
    details:
      "Trafik transaksi UKT dimonitor via CDC Debezium stream. Konektivitas Kafka sink dengan aplikasi keuangan nasional dipastikan aman dan tereplikasi secara instan ke Kafka clusters untuk pelaporan pimpinan.",
    menuItems: [
      { label: "Dashboard Keuangan", path: "#" },
      { label: "Realisasi Anggaran", path: "#" },
      { label: "PNBP & UKT", path: "#" },
    ],
  },
];
