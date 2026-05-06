import {
  ArrowLeft,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Percent,
  School,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

// Types for IKU 1 Drilldown
interface ProdiDetail {
  name: string;
  lulus: number;
  total: number;
}

interface JurusanDetail {
  name: string;
  prodis: ProdiDetail[];
}

interface FakultasDetail {
  name: string;
  jurusans: JurusanDetail[];
}

interface JenjangDetailData {
  ideal: number;
  baseline: string;
  target: string;
  faculties: FakultasDetail[];
}

// Complete Ganesha University of Education (Undiksha) Dummy Drilldown Data
// Fully populated across all 8 faculties for S1 and robustly for D3, D4, S2, S3
const IKU1_DRILLDOWN_DATA: Record<string, JenjangDetailData> = {
  D3: {
    ideal: 33,
    baseline: "70.00",
    target: "75.76",
    faculties: [
      {
        name: "Fakultas Teknik dan Kejuruan (FTK)",
        jurusans: [
          {
            name: "Jurusan Teknik Informatika",
            prodis: [
              { name: "D3 Manajemen Informatika", lulus: 12, total: 50 }, // AEE: 24.00%
            ],
          },
        ],
      },
      {
        name: "Fakultas Ekonomi (FE)",
        jurusans: [
          {
            name: "Jurusan Akuntansi",
            prodis: [
              { name: "D3 Akuntansi", lulus: 13, total: 40 }, // AEE: 32.50%
            ],
          },
        ],
      },
      {
        name: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)",
        jurusans: [
          {
            name: "Jurusan Kimia",
            prodis: [
              { name: "D3 Analis Kimia", lulus: 8, total: 30 }, // AEE: 26.67%
            ],
          },
        ],
      },
      {
        name: "Fakultas Bahasa dan Seni (FBS)",
        jurusans: [
          {
            name: "Jurusan Bahasa Asing",
            prodis: [
              { name: "D3 Bahasa Inggris Komunikasi", lulus: 9, total: 40 }, // AEE: 22.50%
            ],
          },
        ],
      },
    ],
  },
  D4: {
    ideal: 25,
    baseline: "70.00",
    target: "80.00",
    faculties: [
      {
        name: "Fakultas Teknik dan Kejuruan (FTK)",
        jurusans: [
          {
            name: "Jurusan Teknik Informatika",
            prodis: [
              {
                name: "D4 Teknologi Rekayasa Perangkat Lunak",
                lulus: 15,
                total: 75,
              }, // AEE: 20.00%
            ],
          },
        ],
      },
      {
        name: "Fakultas Ekonomi (FE)",
        jurusans: [
          {
            name: "Jurusan Manajemen",
            prodis: [
              { name: "D4 Perhotelan", lulus: 11, total: 50 }, // AEE: 22.00%
            ],
          },
        ],
      },
    ],
  },
  S1: {
    ideal: 25,
    baseline: "70.00",
    target: "80.00",
    faculties: [
      {
        name: "Fakultas Teknik dan Kejuruan (FTK)",
        jurusans: [
          {
            name: "Jurusan Teknik Informatika",
            prodis: [
              {
                name: "S1 Pendidikan Teknik Informatika",
                lulus: 18,
                total: 80,
              }, // AEE: 22.50%
              { name: "S1 Sistem Informasi", lulus: 15, total: 75 }, // AEE: 20.00%
            ],
          },
          {
            name: "Jurusan Teknologi Industri",
            prodis: [
              {
                name: "S1 Pendidikan Kesejahteraan Keluarga",
                lulus: 12,
                total: 60,
              }, // AEE: 20.00%
            ],
          },
        ],
      },
      {
        name: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)",
        jurusans: [
          {
            name: "Jurusan Matematika",
            prodis: [
              { name: "S1 Matematika", lulus: 10, total: 60 }, // AEE: 16.67%
              { name: "S1 Pendidikan Matematika", lulus: 14, total: 70 }, // AEE: 20.00%
            ],
          },
        ],
      },
      {
        name: "Fakultas Ilmu Pendidikan (FIP)",
        jurusans: [
          {
            name: "Jurusan Dasar Pendidikan",
            prodis: [
              {
                name: "S1 Pendidikan Guru Sekolah Dasar (PGSD)",
                lulus: 35,
                total: 175,
              }, // AEE: 20.00%
              {
                name: "S1 Pendidikan Guru PAUD (PGPAUD)",
                lulus: 10,
                total: 60,
              }, // AEE: 16.67%
            ],
          },
        ],
      },
      {
        name: "Fakultas Bahasa dan Seni (FBS)",
        jurusans: [
          {
            name: "Jurusan Bahasa Asing",
            prodis: [
              { name: "S1 Pendidikan Bahasa Inggris", lulus: 16, total: 80 }, // AEE: 20.00%
              { name: "S1 Pendidikan Bahasa Jepang", lulus: 8, total: 50 }, // AEE: 16.00%
            ],
          },
        ],
      },
      {
        name: "Fakultas Hukum dan Ilmu Sosial (FHIS)",
        jurusans: [
          {
            name: "Jurusan Hukum",
            prodis: [
              { name: "S1 Ilmu Hukum", lulus: 15, total: 90 }, // AEE: 16.67%
              {
                name: "S1 Pendidikan Pancasila & Kewarganegaraan",
                lulus: 10,
                total: 50,
              }, // AEE: 20.00%
            ],
          },
        ],
      },
      {
        name: "Fakultas Olahraga dan Kesehatan (FOK)",
        jurusans: [
          {
            name: "Jurusan Olahraga",
            prodis: [
              {
                name: "S1 Pendidikan Jasmani, Kesehatan & Rekreasi",
                lulus: 14,
                total: 80,
              }, // AEE: 17.50%
            ],
          },
        ],
      },
      {
        name: "Fakultas Ekonomi (FE)",
        jurusans: [
          {
            name: "Jurusan Manajemen",
            prodis: [
              { name: "S1 Manajemen", lulus: 22, total: 110 }, // AEE: 20.00%
              { name: "S1 Akuntansi", lulus: 16, total: 80 }, // AEE: 20.00%
            ],
          },
        ],
      },
      {
        name: "Fakultas Kedokteran (FK)",
        jurusans: [
          {
            name: "Jurusan Kedokteran",
            prodis: [
              { name: "S1 Pendidikan Dokter", lulus: 12, total: 50 }, // AEE: 24.00%
            ],
          },
        ],
      },
    ],
  },
  S2: {
    ideal: 50,
    baseline: "45.00",
    target: "54.00",
    faculties: [
      {
        name: "Program Pascasarjana (PP)",
        jurusans: [
          {
            name: "Jurusan Pendidikan Dasar",
            prodis: [
              { name: "S2 Pendidikan Dasar", lulus: 12, total: 48 }, // AEE: 25.00%
              { name: "S2 Administrasi Pendidikan", lulus: 11, total: 44 }, // AEE: 25.00%
            ],
          },
        ],
      },
    ],
  },
  S3: {
    ideal: 33,
    baseline: "30.00",
    target: "45.45",
    faculties: [
      {
        name: "Program Pascasarjana (PP)",
        jurusans: [
          {
            name: "Jurusan Ilmu Pendidikan",
            prodis: [
              { name: "S3 Ilmu Pendidikan", lulus: 4, total: 30 }, // AEE: 13.33%
            ],
          },
        ],
      },
    ],
  },
};

// Helper to calculate AEE stats for a specific jenjang dynamically from IKU1_DRILLDOWN_DATA
const calculateJenjangStats = (jenjang: string) => {
  const jenjangData = IKU1_DRILLDOWN_DATA[jenjang];
  if (!jenjangData) return { aee: 0, achievement: 0 };

  const ideal = jenjangData.ideal;
  let totalLulus = 0;
  let totalMhs = 0;

  jenjangData.faculties.forEach((f) => {
    f.jurusans.forEach((j) => {
      j.prodis.forEach((p) => {
        totalLulus += p.lulus;
        totalMhs += p.total;
      });
    });
  });

  const aee = totalMhs > 0 ? (totalLulus / totalMhs) * 100 : 0;
  const achievement = ideal > 0 ? (aee / ideal) * 100 : 0;

  return { aee, achievement };
};

// Helper to calculate overall AEE PT (average of Tingkat Pencapaian across all 5 active levels)
const getOverallAeePt = () => {
  const activeLevels = ["D3", "D4", "S1", "S2", "S3"];
  let sumAchievement = 0;
  activeLevels.forEach((lvl) => {
    const stats = calculateJenjangStats(lvl);
    sumAchievement += stats.achievement;
  });
  return sumAchievement / activeLevels.length;
};

const d3Stats = calculateJenjangStats("D3");
const d4Stats = calculateJenjangStats("D4");
const s1Stats = calculateJenjangStats("S1");
const s2Stats = calculateJenjangStats("S2");
const s3Stats = calculateJenjangStats("S3");
const overallAeePt = getOverallAeePt();

const ikuData = [
  {
    no: "1",
    sasaran: "Talenta",
    indicators: [
      {
        id: "IKU 1",
        label: "Angka Efisiensi Edukasi Perguruan Tinggi (AEE PT)",
        satuan: "%",
        baseline: "57,00",
        target: "67,04",
        realisasi: `${overallAeePt.toFixed(2)}%`,
        children: [
          {
            label: "a. D1*",
            satuan: "%",
            baseline: "-",
            target: "-",
            realisasi: "-",
          },
          {
            label: "b. D2*",
            satuan: "%",
            baseline: "-",
            target: "-",
            realisasi: "-",
          },
          {
            label: "c. D3*",
            satuan: "%",
            baseline: "70,00",
            target: "75,76",
            realisasi: `${d3Stats.achievement.toFixed(2)}%`,
          },
          {
            label: "d. D4",
            satuan: "%",
            baseline: "70,00",
            target: "80,00",
            realisasi: `${d4Stats.achievement.toFixed(2)}%`,
          },
          {
            label: "e. S1",
            satuan: "%",
            baseline: "70,00",
            target: "80,00",
            realisasi: `${s1Stats.achievement.toFixed(2)}%`,
          },
          {
            label: "f. S2**",
            satuan: "%",
            baseline: "45,00",
            target: "54,00",
            realisasi: `${s2Stats.achievement.toFixed(2)}%`,
          },
          {
            label: "g. S3**",
            satuan: "%",
            baseline: "30,00",
            target: "45,45",
            realisasi: `${s3Stats.achievement.toFixed(2)}%`,
          },
        ],
      },
      {
        label: "Persentase mahasiswa pascasarjana terhadap total mahasiswa",
        satuan: "%",
        baseline: "11,15",
        target: "13,15",
        realisasi: "12,45%",
        children: [
          {
            label: "a. Mahasiswa magister",
            satuan: "%",
            baseline: "8,17",
            target: "8,77",
            realisasi: "8,35%",
          },
          {
            label: "b. Mahasiswa doktor",
            satuan: "%",
            baseline: "2,98",
            target: "4,38",
            realisasi: "4,10%",
          },
        ],
      },
      {
        label: "Persentase mahasiswa internasional",
        satuan: "%",
        baseline: "0,46",
        target: "1,00",
        realisasi: "0,85%",
      },
    ],
  },
  {
    no: "2a",
    sasaran: "Inovasi",
    indicators: [
      {
        id: "IKU 2",
        label:
          "Persentase lulusan pendidikan tinggi akademik dan vokasi yang langsung bekerja/melanjutkan jenjang pendidikan berikutnya/ berwirausaha dalam jangka waktu 1 tahun setelah kelulusan",
        satuan: "%",
        baseline: "46,94",
        target: "60,00",
        realisasi: "58,20%",
      },
      {
        id: "IKU 3",
        label:
          "Persentase mahasiswa S1 dan D4/D3/D2/D1 berkegiatan /meraih prestasi di luar program studi",
        satuan: "%",
        baseline: "22,59",
        target: "30,00",
        realisasi: "28,40%",
      },
      {
        id: "IKU 5",
        label:
          "Persentase luaran hasil kerja sama antara PT dan start-up /industri/Lembaga",
        satuan: "%",
        baseline: "70,00",
        target: "80,00",
        realisasi: "79,50%",
      },
      {
        id: "IKU 6",
        label: "Publikasi bereputasi internasional (Scopus/WoS)",
        satuan: "Artikel",
        baseline: "170",
        target: "221",
        realisasi: "210",
        children: [
          {
            label: "a. Persentase publikasi Top Tier",
            satuan: "%",
            baseline: "5,00",
            target: "21,10",
            realisasi: "19,50%",
          },
          {
            label: "b. Persentase publikasi Q1",
            satuan: "%",
            baseline: "15,00",
            target: "30,70",
            realisasi: "28,90%",
          },
        ],
      },
    ],
  },
];

// Helper to check if a row label corresponds to a clickable jenjang
const getJenjangKey = (label: string): string | null => {
  if (label.includes("D3")) return "D3";
  if (label.includes("D4")) return "D4";
  if (label.includes("S1")) return "S1";
  if (label.includes("S2")) return "S2";
  if (label.includes("S3")) return "S3";
  return null;
};

// Helper to shorten unit names for clean Radar Chart layout
const getRadarLabel = (name: string): string => {
  if (name.includes("Teknik dan Kejuruan")) return "FTK";
  if (name.includes("Matematika dan Ilmu Pengetahuan Alam")) return "FMIPA";
  if (name.includes("Ilmu Pendidikan")) return "FIP";
  if (name.includes("Bahasa dan Seni")) return "FBS";
  if (name.includes("Hukum dan Ilmu Sosial")) return "FHIS";
  if (name.includes("Olahraga dan Kesehatan")) return "FOK";
  if (name.includes("Ekonomi")) return "FE";
  if (name.includes("Kedokteran")) return "FK";
  if (name.includes("Pascasarjana")) return "PP";

  return name
    .replace("Jurusan ", "")
    .replace("Program Studi ", "")
    .replace("Pendidikan ", "Pend. ")
    .replace("S1 ", "")
    .replace("S2 ", "")
    .replace("S3 ", "")
    .replace("D3 ", "")
    .replace("D4 ", "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function IKUView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFormulaBoard, setShowFormulaBoard] = useState(false);

  const selectedJenjang = searchParams.get("jenjang");
  const selectedFaculty = searchParams.get("faculty");
  const selectedJurusan = searchParams.get("jurusan");

  const setSelectedJenjang = (val: string | null) => {
    setSearchParams((prev) => {
      if (val) {
        prev.set("jenjang", val);
      } else {
        prev.delete("jenjang");
      }
      prev.delete("faculty");
      prev.delete("jurusan");
      return prev;
    });
  };

  const setSelectedFaculty = (val: string | null) => {
    setSearchParams((prev) => {
      if (val) {
        prev.set("faculty", val);
      } else {
        prev.delete("faculty");
      }
      prev.delete("jurusan");
      return prev;
    });
  };

  const setSelectedJurusan = (val: string | null) => {
    setSearchParams((prev) => {
      if (val) {
        prev.set("jurusan", val);
      } else {
        prev.delete("jurusan");
      }
      return prev;
    });
  };

  // If a Jenjang is selected, render the beautiful drilldown subpage with integrated Radar Charts
  if (selectedJenjang) {
    const jenjangData = IKU1_DRILLDOWN_DATA[selectedJenjang];
    const ideal = jenjangData?.ideal || 100;

    // Calculate total numbers
    let totalLulus = 0;
    let totalMhs = 0;

    if (jenjangData) {
      jenjangData.faculties.forEach((f) => {
        f.jurusans.forEach((j) => {
          j.prodis.forEach((p) => {
            totalLulus += p.lulus;
            totalMhs += p.total;
          });
        });
      });
    }

    // Active Faculty data & totals
    const activeFacultyData = jenjangData?.faculties.find(
      (f) => f.name === selectedFaculty,
    );
    let facultyLulus = 0;
    let facultyMhs = 0;
    if (activeFacultyData) {
      activeFacultyData.jurusans.forEach((j) => {
        j.prodis.forEach((p) => {
          facultyLulus += p.lulus;
          facultyMhs += p.total;
        });
      });
    }

    // Active Jurusan data & totals
    const activeJurusanData = activeFacultyData?.jurusans.find(
      (j) => j.name === selectedJurusan,
    );
    let jurusanLulus = 0;
    let jurusanMhs = 0;
    if (activeJurusanData) {
      activeJurusanData.prodis.forEach((p) => {
        jurusanLulus += p.lulus;
        jurusanMhs += p.total;
      });
    }

    // Determine currently displayed scope numbers
    let currentLulus = totalLulus;
    let currentMhs = totalMhs;

    if (selectedFaculty) {
      currentLulus = facultyLulus;
      currentMhs = facultyMhs;
    }
    if (selectedJurusan) {
      currentLulus = jurusanLulus;
      currentMhs = jurusanMhs;
    }

    const currentAeeRealisasi =
      currentMhs > 0 ? (currentLulus / currentMhs) * 100 : 0;
    const currentTingkatPencapaian =
      ideal > 0 ? (currentAeeRealisasi / ideal) * 100 : 0;

    // ----------------------------------------------------
    // PREPARE CONTEXTUAL RADAR CHART DATA
    // ----------------------------------------------------
    let radarChartData: any[] = [];
    let radarTitle = "";

    if (!selectedFaculty) {
      // 1. Jenjang level radar: Compare AEE across all faculties
      radarChartData =
        jenjangData?.faculties.map((f) => {
          const fLulus = f.jurusans.reduce(
            (s, j) => s + j.prodis.reduce((sp, p) => sp + p.lulus, 0),
            0,
          );
          const fMhs = f.jurusans.reduce(
            (s, j) => s + j.prodis.reduce((sp, p) => sp + p.total, 0),
            0,
          );
          const fAee = fMhs > 0 ? (fLulus / fMhs) * 100 : 0;
          return {
            subject: getRadarLabel(f.name),
            fullName: f.name,
            AEE: parseFloat(fAee.toFixed(2)),
          };
        }) || [];
      radarTitle = `Radar Distribusi AEE Fakultas (Jenjang ${selectedJenjang})`;
    } else if (selectedFaculty && !selectedJurusan) {
      // 2. Faculty level radar: Compare AEE across all Jurusans
      radarChartData =
        activeFacultyData?.jurusans.map((j) => {
          const jLulus = j.prodis.reduce((sp, p) => sp + p.lulus, 0);
          const jMhs = j.prodis.reduce((sp, p) => sp + p.total, 0);
          const jAee = jMhs > 0 ? (jLulus / jMhs) * 100 : 0;
          return {
            subject: getRadarLabel(j.name),
            fullName: j.name,
            AEE: parseFloat(jAee.toFixed(2)),
          };
        }) || [];
      radarTitle = `Radar Perbandingan AEE Jurusan`;
    } else if (selectedJurusan) {
      // 3. Jurusan level radar: Compare AEE across all Prodis
      radarChartData =
        activeJurusanData?.prodis.map((p) => {
          const pAee = p.total > 0 ? (p.lulus / p.total) * 100 : 0;
          return {
            subject: getRadarLabel(p.name),
            fullName: p.name,
            AEE: parseFloat(pAee.toFixed(2)),
          };
        }) || [];
      radarTitle = `Radar Perbandingan AEE Program Studi`;
    }

    return (
      <div className="w-full max-w-7xl mx-auto space-y-12 py-10 transition-all duration-500">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (selectedJurusan) {
                  setSelectedJurusan(null);
                } else if (selectedFaculty) {
                  setSelectedFaculty(null);
                } else {
                  setSelectedJenjang(null);
                }
              }}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft className="size-4 text-slate-600 dark:text-slate-400 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-400">
              <button
                onClick={() => {
                  setSelectedJenjang(null);
                  setSelectedFaculty(null);
                  setSelectedJurusan(null);
                }}
                className="hover:text-amber-500 transition-colors uppercase tracking-wider cursor-pointer"
              >
                IKU 1 (AEE PT)
              </button>
              <ChevronRight className="size-3 text-slate-300 dark:text-slate-700" />
              <button
                onClick={() => {
                  setSelectedFaculty(null);
                  setSelectedJurusan(null);
                }}
                className={`hover:text-amber-500 transition-colors uppercase tracking-wider cursor-pointer ${
                  !selectedFaculty
                    ? "text-slate-800 dark:text-slate-100 font-extrabold"
                    : ""
                }`}
              >
                Jenjang {selectedJenjang}
              </button>
              {selectedFaculty && (
                <>
                  <ChevronRight className="size-3 text-slate-300 dark:text-slate-700" />
                  <button
                    onClick={() => {
                      setSelectedJurusan(null);
                    }}
                    className={`hover:text-amber-500 transition-colors uppercase tracking-wider cursor-pointer ${
                      !selectedJurusan
                        ? "text-slate-800 dark:text-slate-100 font-extrabold"
                        : ""
                    }`}
                  >
                    {selectedFaculty.replace("Fakultas ", "")}
                  </button>
                </>
              )}
              {selectedJurusan && (
                <>
                  <ChevronRight className="size-3 text-slate-300 dark:text-slate-700" />
                  <span className="text-slate-800 dark:text-slate-100 font-extrabold uppercase tracking-wider">
                    {selectedJurusan.replace("Jurusan ", "")}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-500/20">
              AEE Ideal: {ideal}%
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/20">
              Target: {jenjangData?.target}%
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="px-4 space-y-2">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
            {selectedJurusan
              ? selectedJurusan
              : selectedFaculty
                ? selectedFaculty
                : `Analisis Efisiensi Edukasi - Jenjang ${selectedJenjang}`}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest leading-relaxed max-w-3xl">
            {selectedJurusan
              ? `Daftar Program Studi dan Detail Rumus Perhitungan Formula`
              : selectedFaculty
                ? `Daftar Jurusan dan Tingkat Efisiensi Edukasi Akademik`
                : `Analisis Distribusi Fakultas terhadap Capaian IKU 1`}
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
          {[
            {
              title: "Total Mahasiswa",
              value: currentMhs,
              desc: "Terdaftar aktif pada tahun akademik",
              icon: GraduationCap,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
              unit: "Mhs",
            },
            {
              title: "Lulus Tepat Waktu",
              value: currentLulus,
              desc: "Masa tempuh kurikulum standar",
              icon: CheckCircle2,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
              unit: "Mhs",
            },
            {
              title: "AEE Realisasi",
              value: `${currentAeeRealisasi.toFixed(2)}%`,
              desc: `Formula: Lulus / Total`,
              icon: Percent,
              color: "text-amber-500",
              bg: "bg-amber-500/10",
            },
            {
              title: "Tingkat Pencapaian",
              value: `${currentTingkatPencapaian.toFixed(2)}%`,
              desc: `Terhadap AEE Ideal (${ideal}%)`,
              icon: Target,
              color: "text-purple-500",
              bg: "bg-purple-500/10",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-2xl ${item.bg} flex items-center justify-center`}
                >
                  <item.icon className={`size-5 ${item.color}`} />
                </div>
                {idx === 3 && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      currentTingkatPencapaian >=
                      parseFloat(jenjangData?.target || "0")
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : currentTingkatPencapaian >=
                            parseFloat(jenjangData?.baseline || "0")
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {currentTingkatPencapaian >=
                    parseFloat(jenjangData?.target || "0")
                      ? "Exceeds Target"
                      : currentTingkatPencapaian >=
                          parseFloat(jenjangData?.baseline || "0")
                        ? "Meets Baseline"
                        : "Under Target"}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  {item.title}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {item.value}{" "}
                  {item.unit && (
                    <span className="text-xs font-bold text-slate-400">
                      {item.unit}
                    </span>
                  )}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium italic block">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Drilldown & Radar Chart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 items-stretch">
          {/* Radar Chart (Span 5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl h-full min-h-[420px]"
          >
            <div className="space-y-1 mb-6">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                Analisis Visual AEE
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {radarTitle}
              </p>
            </div>

            <div className="flex-1 w-full flex items-center justify-center min-h-[280px]">
              {radarChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={radarChartData}
                  >
                    <PolarGrid stroke="rgba(148, 163, 184, 0.15)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#64748b", fontSize: 10, fontWeight: 900 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[
                        0,
                        (value: number) => Math.max(ideal * 1.2, value, 40),
                      ]}
                      tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 700 }}
                    />
                    <Radar
                      name="AEE Realisasi"
                      dataKey="AEE"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.25}
                    />
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-white/10 dark:border-slate-200/50 backdrop-blur-md">
                              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">
                                Unit Akademik
                              </p>
                              <p className="text-xs font-black mb-1.5">
                                {data.fullName}
                              </p>
                              <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-amber-500" />
                                <p className="text-sm font-black tabular-nums">
                                  AEE: {data.AEE.toFixed(2)}%
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Data visualisasi tidak tersedia
                </p>
              )}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-6">
              <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">
                <Target size={12} className="text-blue-500" />
                <span>Batas Ideal: {ideal}%</span>
              </div>
            </div>
          </motion.div>

          {/* Drilldown List/Table Scope (Span 7) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  {selectedJurusan
                    ? "Daftar Program Studi"
                    : selectedFaculty
                      ? "Daftar Jurusan"
                      : "Daftar Fakultas"}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {selectedJurusan
                    ? "Detail hitung AEE realisasi dan tingkat pencapaian program studi"
                    : "Klik baris untuk melihat analisis pada tingkat berikutnya"}
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
              {/* 1. Fakultas Scope */}
              {!selectedFaculty &&
                jenjangData?.faculties.map((f, idx) => {
                  const fLulus = f.jurusans.reduce(
                    (s, j) => s + j.prodis.reduce((sp, p) => sp + p.lulus, 0),
                    0,
                  );
                  const fMhs = f.jurusans.reduce(
                    (s, j) => s + j.prodis.reduce((sp, p) => sp + p.total, 0),
                    0,
                  );
                  const fAee = fMhs > 0 ? (fLulus / fMhs) * 100 : 0;
                  const fAch = ideal > 0 ? (fAee / ideal) * 100 : 0;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedFaculty(f.name)}
                      className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-amber-500/40 hover:shadow-xl dark:hover:shadow-none transition-all duration-300 cursor-pointer gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                          <School className="size-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                            {f.name}
                          </h4>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {f.jurusans.length} Jurusan •{" "}
                            {f.jurusans.reduce(
                              (s, j) => s + j.prodis.length,
                              0,
                            )}{" "}
                            Prodi
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end md:self-auto shrink-0">
                        <div className="text-right">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                            AEE Realisasi
                          </span>
                          <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                            {fAee.toFixed(2)}%
                          </span>
                        </div>

                        <div className="text-right w-24">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                            Pencapaian
                          </span>
                          <span
                            className={`text-xs font-black px-2 py-0.5 rounded-full inline-block ${
                              fAch >= parseFloat(jenjangData?.target)
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : fAch >= parseFloat(jenjangData?.baseline)
                                  ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}
                          >
                            {fAch.toFixed(2)}%
                          </span>
                        </div>

                        <ChevronRight className="size-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}

              {/* 2. Jurusan Scope */}
              {selectedFaculty &&
                !selectedJurusan &&
                activeFacultyData?.jurusans.map((j, idx) => {
                  const jLulus = j.prodis.reduce((sp, p) => sp + p.lulus, 0);
                  const jMhs = j.prodis.reduce((sp, p) => sp + p.total, 0);
                  const jAee = jMhs > 0 ? (jLulus / jMhs) * 100 : 0;
                  const jAch = ideal > 0 ? (jAee / ideal) * 100 : 0;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedJurusan(j.name)}
                      className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-amber-500/40 hover:shadow-xl dark:hover:shadow-none transition-all duration-300 cursor-pointer gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                          <BookOpen className="size-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                            {j.name}
                          </h4>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {j.prodis.length} Program Studi
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end md:self-auto shrink-0">
                        <div className="text-right">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                            AEE Realisasi
                          </span>
                          <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                            {jAee.toFixed(2)}%
                          </span>
                        </div>

                        <div className="text-right w-24">
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                            Pencapaian
                          </span>
                          <span
                            className={`text-xs font-black px-2 py-0.5 rounded-full inline-block ${
                              jAch >= parseFloat(jenjangData?.target)
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : jAch >= parseFloat(jenjangData?.baseline)
                                  ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}
                          >
                            {jAch.toFixed(2)}%
                          </span>
                        </div>

                        <ChevronRight className="size-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}

              {/* 3. Prodi Scope with Formula visualization */}
              {selectedJurusan &&
                activeJurusanData?.prodis.map((p, idx) => {
                  const pAee = p.total > 0 ? (p.lulus / p.total) * 100 : 0;
                  const pAch = ideal > 0 ? (pAee / ideal) * 100 : 0;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900 gap-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                            <GraduationCap className="size-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                              {p.name}
                            </h4>
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Lulus: {p.lulus} • Total Mahasiswa: {p.total}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 self-end md:self-auto shrink-0">
                          <div className="text-right">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                              AEE Realisasi
                            </span>
                            <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                              {pAee.toFixed(2)}%
                            </span>
                          </div>

                          <div className="text-right w-24">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                              Pencapaian
                            </span>
                            <span
                              className={`text-xs font-black px-2 py-0.5 rounded-full inline-block ${
                                pAch >= parseFloat(jenjangData?.target)
                                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                  : pAch >= parseFloat(jenjangData?.baseline)
                                    ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              }`}
                            >
                              {pAch.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Mathematical Formula Display panel */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 dark:border-slate-800/60 pt-4 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Calculator className="text-amber-500 size-4 mt-1 shrink-0" />
                          <div className="text-[11px] font-medium leading-relaxed">
                            <span className="font-extrabold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[9px] mb-1">
                              Formula AEE Realisasi (AEE Prodi)
                            </span>
                            <div className="flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300">
                              <div className="flex flex-col items-center">
                                <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-2">
                                  Graduates ({p.lulus})
                                </span>
                                <span className="pt-0.5 px-2">
                                  Total Mhs ({p.total})
                                </span>
                              </div>
                              <span>x 100% =</span>
                              <span className="text-amber-500 font-extrabold">
                                {pAee.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Target className="text-blue-500 size-4 mt-1 shrink-0" />
                          <div className="text-[11px] font-medium leading-relaxed">
                            <span className="font-extrabold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[9px] mb-1">
                              Formula Tingkat Pencapaian AEE
                            </span>
                            <div className="flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300">
                              <div className="flex flex-col items-center">
                                <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-2">
                                  AEE Realisasi ({pAee.toFixed(2)}%)
                                </span>
                                <span className="pt-0.5 px-2">
                                  AEE Ideal ({ideal}%)
                                </span>
                              </div>
                              <span>x 100% =</span>
                              <span className="text-blue-500 font-extrabold">
                                {pAch.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Fallback: Render standard list page of all IKUs
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-10 transition-all duration-500">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <Sparkles size={12} />
          Strategic Performance
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Indikator <span className="text-amber-500">Kinerja</span> Utama
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Pantau dan analisis pencapaian target strategis universitas secara
            real-time melalui engine analisis performa terpusat.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {[
          {
            title: "Capaian Strategis",
            desc: "Analisis mendalam terhadap 8 indikator kinerja utama universitas.",
            icon: TrendingUp,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            title: "Target Tahunan",
            desc: "Visualisasi perbandingan target vs realisasi periode berjalan.",
            icon: Target,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            title: "Distribusi Fakultas",
            desc: "Ranking dan performa kontribusi unit kerja terhadap IKU.",
            icon: Award,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-6 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-amber-500/50 transition-all duration-500"
          >
            <div
              className={`size-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
            >
              <item.icon className={`size-6 ${item.color}`} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Formula Board */}
      <div className="mx-4 overflow-hidden rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-6 space-y-4">
        <div
          className="flex justify-between items-center cursor-pointer select-none"
          onClick={() => setShowFormulaBoard(!showFormulaBoard)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
              <Calculator className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                Panduan Formula Kebijakan IKU 1 (AEE PT)
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Klik untuk {showFormulaBoard ? "menyembunyikan" : "melihat"}{" "}
                penjelasan rumus perhitungan
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-widest border border-amber-500/20">
            {showFormulaBoard ? "CLOSE" : "EXPAND"}
          </span>
        </div>

        {showFormulaBoard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-amber-500/10"
          >
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase tracking-widest border border-blue-500/20">
                A. AEE PRODI (REALISASI)
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Mengukur rasio mahasiswa tahun akademik yang lulus tepat waktu
                sesuai masa tempuh kurikulum standar terhadap total mahasiswa
                terdaftar.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg font-mono text-[10px] text-slate-700 dark:text-slate-300">
                <div className="text-center border-b border-slate-300 dark:border-slate-700 pb-1">
                  Mhs Lulus Sesuai Kurikulum
                </div>
                <div className="text-center pt-1">
                  Total Mahasiswa TA Tersebut
                </div>
                <div className="text-center text-amber-500 font-black mt-2">
                  x 100%
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">
                B. TINGKAT PENCAPAIAN AEE
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Membandingkan capaian AEE realisasi dengan batas ideal nasional
                untuk masing-masing jenjang (S1: 25%, D4: 25%, D3: 33%, S2: 50%,
                S3: 33%).
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg font-mono text-[10px] text-slate-700 dark:text-slate-300 flex flex-col justify-center h-[90px]">
                <div className="text-center border-b border-slate-300 dark:border-slate-700 pb-1">
                  AEE Realisasi
                </div>
                <div className="text-center pt-1">AEE Ideal Jenjang</div>
                <div className="text-center text-emerald-500 font-black mt-2">
                  x 100%
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-[8px] font-black uppercase tracking-widest border border-purple-500/20">
                C. AEE PT (PERGURUAN TINGGI)
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                Rata-rata kumulatif tingkat pencapaian dari seluruh jenjang
                akademik (D3 hingga S3) yang diselenggarakan oleh Perguruan
                Tinggi.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg font-mono text-[10px] text-slate-700 dark:text-slate-300 flex flex-col justify-center items-center h-[90px]">
                <div className="text-center text-purple-500 font-black">
                  Σ (Tingkat Pencapaian_i)
                </div>
                <div className="w-1/2 border-b border-slate-300 dark:border-slate-700 my-1" />
                <div className="text-center">n (Jumlah Jenjang)</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* IKU Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4 overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                  No.
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                  Sasaran Program
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                  Indikator Kinerja Utama Wajib
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 text-center">
                  Satuan
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 text-center bg-blue-500/5">
                  Baseline 2025
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 text-center bg-amber-500/5">
                  Target 2026
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center bg-emerald-500/5">
                  Realisasi 2026
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {ikuData.map((sasaran, sIndex) => {
                const totalRows = sasaran.indicators.reduce(
                  (acc, curr) => acc + 1 + (curr.children?.length || 0),
                  0,
                );

                return (
                  <React.Fragment key={sIndex}>
                    {sasaran.indicators.map((indicator, iIndex) => (
                      <React.Fragment key={iIndex}>
                        {/* Main Indicator Row */}
                        <tr className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors duration-300">
                          {iIndex === 0 && (
                            <>
                              <td
                                rowSpan={totalRows}
                                className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 align-top text-center bg-slate-50/20 dark:bg-slate-900/20"
                              >
                                {sasaran.no}
                              </td>
                              <td
                                rowSpan={totalRows}
                                className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800 align-top max-w-[150px] bg-slate-50/20 dark:bg-slate-900/20"
                              >
                                {sasaran.sasaran}
                              </td>
                            </>
                          )}
                          <td className="px-6 py-4 border-r border-slate-200 dark:border-slate-800">
                            <div className="flex items-start gap-4">
                              {indicator.id && (
                                <span className="mt-1 shrink-0 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/20">
                                  {indicator.id}
                                </span>
                              )}
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                                {indicator.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-xs font-black text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                            {indicator.satuan}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-black text-blue-600 dark:text-blue-400 border-r border-slate-200 dark:border-slate-800 bg-blue-500/2">
                            {indicator.baseline}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-black text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-800 bg-amber-500/2">
                            {indicator.target}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/2">
                            {indicator.realisasi || "-"}
                          </td>
                        </tr>

                        {/* Sub Indicators */}
                        {indicator.children?.map((sub, subIndex) => {
                          const key = getJenjangKey(sub.label);
                          const isClickable = key !== null;
                          return (
                            <tr
                              key={subIndex}
                              onClick={() => {
                                if (isClickable) {
                                  setSelectedJenjang(key);
                                }
                              }}
                              className={`group transition-colors duration-300 ${
                                isClickable
                                  ? "hover:bg-amber-50/40 dark:hover:bg-amber-500/5 cursor-pointer"
                                  : "hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                              }`}
                            >
                              <td className="px-6 py-3 border-r border-slate-200 dark:border-slate-800 bg-slate-50/5 dark:bg-slate-900/5">
                                <div className="pl-14 text-[13px] font-medium text-slate-500 dark:text-slate-400 italic flex items-center justify-between">
                                  <span>{sub.label}</span>
                                  {isClickable && (
                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0 ml-2">
                                      <span>Click to analyze</span>
                                      <ChevronRight className="size-3" />
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-3 text-center text-xs font-bold text-slate-400 border-r border-slate-200 dark:border-slate-800">
                                {sub.satuan}
                              </td>
                              <td className="px-6 py-3 text-center text-[13px] font-bold text-slate-400 border-r border-slate-200 dark:border-slate-800 bg-blue-500/1">
                                {sub.baseline}
                              </td>
                              <td className="px-6 py-3 text-center text-[13px] font-bold text-slate-400 border-r border-slate-200 dark:border-slate-800 bg-amber-500/1">
                                {sub.target}
                              </td>
                              <td className="px-6 py-3 text-center text-[13px] font-bold text-emerald-500/80 bg-emerald-500/1">
                                {sub.realisasi || "-"}
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="px-4 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            System Live: v2.4.0-Stable
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Validated by Rektorat
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Data Updated: Just Now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
