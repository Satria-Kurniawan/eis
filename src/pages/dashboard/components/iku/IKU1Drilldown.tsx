import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  GraduationCap,
  Percent,
  School,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
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
import {
  type Iku1Response,
  type IkuFakultasResponse,
  type IkuJurusanResponse,
  type IkuProdiResponse,
} from "../../../../services/dashboard/iku";
import { IKU1_DRILLDOWN_DATA, getRadarLabel } from "./iku1-data";
import { StudentList } from "./StudentList";

interface IKU1DrilldownProps {
  iku1Response?: Iku1Response;
  ikuFakultasResponse?: IkuFakultasResponse;
  ikuJurusanResponse?: IkuJurusanResponse;
  ikuProdiResponse?: IkuProdiResponse;
  isError: boolean;
  refetch: () => void;
  selectedJenjang: string;
  selectedFaculty: string | null;
  selectedJurusan: string | null;
  activeStudentUnitName: string | null;
  handleSelectStudentUnit: (unitName: string) => void;
}

export function IKU1Drilldown({
  iku1Response,
  ikuFakultasResponse,
  ikuJurusanResponse,
  ikuProdiResponse,
  isError,
  refetch,
  selectedJenjang,
  selectedFaculty,
  selectedJurusan,
  activeStudentUnitName,
  handleSelectStudentUnit,
}: IKU1DrilldownProps) {
  const [, setSearchParams] = useSearchParams();

  // Scroll to top of window and main layout when navigating to a new drilldown tier or clearing it
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTo({ top: 0 });
    }
  }, [selectedJenjang, selectedFaculty, selectedJurusan]);

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

  const getDetailForJenjang = (jenjang: string) => {
    return iku1Response?.datas?.detail?.find(
      (item) => item.jenjang.toUpperCase() === jenjang.toUpperCase(),
    );
  };

  const getJenjangData = (jenjang: string) => {
    const key = Object.keys(IKU1_DRILLDOWN_DATA).find(
      (k) => k.toUpperCase() === jenjang.toUpperCase(),
    );
    return key ? IKU1_DRILLDOWN_DATA[key] : undefined;
  };

  const getFacultyDetailForJenjang = (facultyCode: string, jenjang: string) => {
    const fNode = ikuFakultasResponse?.datas?.find(
      (f) => f.kode_unit === facultyCode,
    );
    return fNode?.detail?.find(
      (d) => d.jenjang.toUpperCase() === jenjang.toUpperCase(),
    );
  };

  const getJurusanDetailForJenjang = (
    jurusanNameOrCode: string,
    jenjang: string,
  ) => {
    const jNode = ikuJurusanResponse?.datas?.find(
      (j) =>
        j.kode_unit === jurusanNameOrCode ||
        j.nama_unit.toLowerCase() === jurusanNameOrCode.toLowerCase(),
    );
    return jNode?.detail?.find(
      (d) => d.jenjang.toUpperCase() === jenjang.toUpperCase(),
    );
  };

  const jenjangData = getJenjangData(selectedJenjang);

  let apiDetail = getDetailForJenjang(selectedJenjang);
  if (selectedFaculty) {
    apiDetail = getFacultyDetailForJenjang(selectedFaculty, selectedJenjang);
  }
  if (selectedJurusan) {
    apiDetail = getJurusanDetailForJenjang(selectedJurusan, selectedJenjang);
  }

  const ideal = apiDetail ? apiDetail.aee_ideal : jenjangData?.ideal || 100;

  // Live Faculty Data mapping
  const liveFaculties =
    ikuFakultasResponse?.datas
      ?.map((f) => {
        const detailForJenjang = f.detail?.find(
          (d) => d.jenjang.toUpperCase() === selectedJenjang.toUpperCase(),
        );
        if (!detailForJenjang) return null;
        return {
          name: f.nama_unit,
          kode: f.kode_unit,
          totalMhs: detailForJenjang.total_lulusan,
          lulusTepatWaktu: detailForJenjang.lulus_tepat_waktu,
          aeeRealisasi: detailForJenjang.aee_realisasi,
          tingkatPencapaian: detailForJenjang.tingkat_pencapaian,
          ideal: detailForJenjang.aee_ideal,
        };
      })
      .filter((f): f is NonNullable<typeof f> => f !== null) ?? [];

  // Find live faculty name by code unit
  const activeLiveFaculty = liveFaculties.find(
    (lf) =>
      lf.kode === selectedFaculty ||
      lf.name.toLowerCase() === selectedFaculty?.toLowerCase(),
  );
  const selectedFacultyName = activeLiveFaculty
    ? activeLiveFaculty.name
    : selectedFaculty;

  // Live Jurusan Data mapping
  const liveJurusans =
    ikuJurusanResponse?.datas
      ?.map((j) => {
        const detailForJenjang = j.detail?.find(
          (d) => d.jenjang.toUpperCase() === selectedJenjang.toUpperCase(),
        );
        if (!detailForJenjang) return null;
        return {
          name: j.nama_unit,
          kode: j.kode_unit,
          totalMhs: detailForJenjang.total_lulusan,
          lulusTepatWaktu: detailForJenjang.lulus_tepat_waktu,
          aeeRealisasi: detailForJenjang.aee_realisasi,
          tingkatPencapaian: detailForJenjang.tingkat_pencapaian,
          ideal: detailForJenjang.aee_ideal,
        };
      })
      .filter((j): j is NonNullable<typeof j> => j !== null) ?? [];

  // Find live jurusan by name or code
  const activeLiveJurusan = liveJurusans.find(
    (lj) =>
      lj.name.toLowerCase() === selectedJurusan?.toLowerCase() ||
      lj.kode === selectedJurusan,
  );
  const selectedJurusanName = activeLiveJurusan
    ? activeLiveJurusan.name
    : selectedJurusan;

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
    (f) => f.name === selectedFacultyName,
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

  if (apiDetail) {
    currentLulus = apiDetail.lulus_tepat_waktu;
    currentMhs = apiDetail.total_lulusan;
  } else {
    if (selectedFaculty) {
      currentLulus = facultyLulus;
      currentMhs = facultyMhs;
    }
    if (selectedJurusan) {
      currentLulus = jurusanLulus;
      currentMhs = jurusanMhs;
    }
  }

  const currentAeeRealisasi = apiDetail
    ? apiDetail.aee_realisasi
    : currentMhs > 0
      ? (currentLulus / currentMhs) * 100
      : 0;

  const currentTingkatPencapaian = apiDetail
    ? apiDetail.tingkat_pencapaian
    : ideal > 0
      ? (currentAeeRealisasi / ideal) * 100
      : 0;

  // ----------------------------------------------------
  // PREPARE CONTEXTUAL RADAR CHART DATA
  // ----------------------------------------------------
  let radarChartData: any[] = [];
  let radarTitle = "";

  if (!selectedFaculty) {
    // 1. Jenjang level radar: Compare AEE across all faculties
    radarChartData =
      liveFaculties.length > 0
        ? liveFaculties.map((f) => ({
            subject: getRadarLabel(f.name),
            AEE: parseFloat(f.aeeRealisasi.toFixed(2)),
            Ideal: f.ideal,
            fullSubject: f.name,
          }))
        : jenjangData?.faculties.map((f) => {
            const fLulus = f.jurusans.reduce(
              (acc, j) => acc + j.prodis.reduce((pAcc, p) => pAcc + p.lulus, 0),
              0,
            );
            const fTotal = f.jurusans.reduce(
              (acc, j) => acc + j.prodis.reduce((pAcc, p) => pAcc + p.total, 0),
              0,
            );
            const fAee = fTotal > 0 ? (fLulus / fTotal) * 100 : 0;
            return {
              subject: getRadarLabel(f.name),
              AEE: parseFloat(fAee.toFixed(2)),
              Ideal: ideal,
              fullSubject: f.name,
            };
          }) || [];
    radarTitle = `Sebaran AEE Fakultas - Jenjang ${selectedJenjang}`;
  } else if (!selectedJurusan) {
    // 2. Faculty level radar: Compare AEE across all jurusans in this faculty
    radarChartData =
      liveJurusans.length > 0
        ? liveJurusans.map((j) => ({
            subject: getRadarLabel(j.name),
            AEE: parseFloat(j.aeeRealisasi.toFixed(2)),
            Ideal: j.ideal,
            fullSubject: j.name,
          }))
        : activeFacultyData?.jurusans.map((j) => {
            const jLulus = j.prodis.reduce((acc, p) => acc + p.lulus, 0);
            const jTotal = j.prodis.reduce((acc, p) => acc + p.total, 0);
            const jAee = jTotal > 0 ? (jLulus / jTotal) * 100 : 0;
            return {
              subject: getRadarLabel(j.name),
              AEE: parseFloat(jAee.toFixed(2)),
              Ideal: ideal,
              fullSubject: j.name,
            };
          }) || [];
    radarTitle = `Sebaran AEE Jurusan - ${getRadarLabel(selectedFacultyName || "")}`;
  } else {
    // 3. Jurusan level radar: Compare AEE across all prodis in this jurusan
    radarChartData =
      ikuProdiResponse?.datas && ikuProdiResponse.datas.length > 0
        ? ikuProdiResponse.datas
            .map((p) => {
              const detailForJenjang = p.detail?.find(
                (d) =>
                  d.jenjang.toUpperCase() === selectedJenjang.toUpperCase(),
              );
              if (!detailForJenjang) return null;
              return {
                subject: getRadarLabel(p.nama_unit),
                AEE: parseFloat(detailForJenjang.aee_realisasi.toFixed(2)),
                Ideal: detailForJenjang.aee_ideal,
                fullSubject: p.nama_unit,
              };
            })
            .filter((p): p is NonNullable<typeof p> => p !== null)
        : activeJurusanData?.prodis.map((p) => {
            const pAee = p.total > 0 ? (p.lulus / p.total) * 100 : 0;
            return {
              subject: getRadarLabel(p.name),
              AEE: parseFloat(pAee.toFixed(2)),
              Ideal: ideal,
              fullSubject: p.name,
            };
          }) || [];
    radarTitle = `Sebaran AEE Prodi - ${getRadarLabel(selectedJurusanName || "")}`;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-10 transition-all duration-500">
      {/* Navigation & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
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
          className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 px-4 py-2 rounded-xl w-fit"
        >
          <ArrowLeft size={16} />
          <span>
            KEMBALI{" "}
            {selectedJurusan
              ? "KE FAKULTAS"
              : selectedFaculty
                ? "KE JENJANG"
                : "KE UTAMA"}
          </span>
        </button>

        <div className="flex items-center flex-wrap gap-2 text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-4 py-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 w-full md:w-auto overflow-x-auto custom-scrollbar">
          <span
            className="cursor-pointer hover:text-amber-500 transition-colors whitespace-nowrap"
            onClick={() => setSelectedJenjang(selectedJenjang)}
          >
            Jenjang {selectedJenjang}
          </span>
          {selectedFaculty && (
            <>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span
                className="cursor-pointer hover:text-amber-500 transition-colors whitespace-nowrap"
                onClick={() => setSelectedJurusan(null)}
              >
                {selectedFacultyName}
              </span>
            </>
          )}
          {selectedJurusan && (
            <>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className="text-amber-500 whitespace-nowrap">
                {selectedJurusanName}
              </span>
            </>
          )}

          {/* Quick Filter Pill to jump to student list */}
          <div className="ml-auto hidden sm:block pl-4 border-l border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                let unitName = `Jenjang ${selectedJenjang}`;
                if (selectedJurusan) {
                  unitName = selectedJurusanName || "";
                } else if (selectedFaculty) {
                  unitName = selectedFacultyName || "";
                }
                handleSelectStudentUnit(unitName);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
              title="Lihat Data Mahasiswa Unit Kerja Aktif"
            >
              <Users className="size-2.5 sm:size-3" />
              <span>Data Mahasiswa</span>
            </button>
          </div>
        </div>
      </div>

      {isError && (
        <div className="mx-4 p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>
              Gagal memuat data real-time. Menampilkan data fallback lokal.
            </span>
          </div>
          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-[10px] font-black uppercase tracking-wider text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* Title Section */}
      <div className="px-4 space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
          {selectedJurusan
            ? selectedJurusanName
            : selectedFaculty
              ? selectedFacultyName
              : `Angka Efisiensi Edukasi - Jenjang ${selectedJenjang}`}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.color.replace("text-", "from-").replace("500", "500/10")} to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform`}
            />
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                  <item.icon className="size-6" />
                </div>
                <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight">
                  {item.title}
                </h3>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {item.unit}
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Body Grid: Radar Chart + Breakdown List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
        {/* Radar Chart Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-5 bg-slate-950 rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-slate-800"
        >
          {/* Subtle glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-2 mb-8">
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <Sparkles className="size-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Radar Kinerja
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {radarTitle}
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Visualisasi distribusi capaian Angka Efisiensi Edukasi. Area
              berwarna merepresentasikan realisasi dibandingkan garis ambang
              batas ideal ({ideal}%).
            </p>
          </div>

          <div className="h-[300px] sm:h-[400px] w-full relative z-10 -ml-4 sm:ml-0">
            {radarChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={radarChartData}
                >
                  <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 900 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#475569", fontSize: 10 }}
                  />
                  <Radar
                    name="AEE Realisasi"
                    dataKey="AEE"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="#10b981"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Target Ideal"
                    dataKey="Ideal"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    fill="transparent"
                    strokeDasharray="5 5"
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid #334155",
                      borderRadius: "1rem",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                    labelStyle={{
                      color: "#94a3b8",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                    }}
                    formatter={(value: any, name: any) => [
                      `${value}%`,
                      name,
                    ]}
                    labelFormatter={(label: any) => {
                      const item = radarChartData.find(
                        (d) => d.subject === label,
                      );
                      return item ? item.fullSubject : label;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-500 font-bold text-xs uppercase tracking-widest">
                Data Tidak Tersedia
              </div>
            )}
          </div>
        </motion.div>

        {/* Dynamic Breakdown List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col"
        >
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
              <School className="text-amber-500 size-6" />
              Detail Capaian Unit Kerja
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-widest">
              Pilih baris untuk melakukan drill-down analisis
            </p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[500px] custom-scrollbar bg-slate-50/50 dark:bg-slate-950/50">
            {/* 1. Show Faculties if no faculty is selected */}
            {/* 1. Show Faculties if no faculty is selected */}
            {!selectedFaculty && liveFaculties.length > 0
              ? liveFaculties.map((f, i) => {
                  const fTotal = f.totalMhs;
                  const fLulus = f.lulusTepatWaktu;
                  const fAee = f.aeeRealisasi;
                  const fAch = f.tingkatPencapaian;

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedFaculty(f.kode);
                      }}
                      className="p-6 border-b border-slate-100 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-800/50 cursor-pointer transition-colors group flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                          <BookOpen className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-relaxed">
                            {f.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <GraduationCap className="size-3" />
                              {fTotal} Mhs
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 className="size-3" />
                              {fLulus} Lulus
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 shrink-0 bg-slate-50 sm:bg-transparent dark:bg-slate-900 sm:dark:bg-transparent p-3 sm:p-0 rounded-xl">
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            AEE Prodi
                          </span>
                          <span className="text-lg font-black text-slate-900 dark:text-white">
                            {fAee.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 sm:hidden mx-2" />
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Pencapaian
                          </span>
                          <span className="text-lg font-black text-amber-500">
                            {fAch.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : !selectedFaculty &&
                jenjangData?.faculties.map((f, i) => {
                  const fLulus = f.jurusans.reduce(
                    (acc, j) =>
                      acc + j.prodis.reduce((pAcc, p) => pAcc + p.lulus, 0),
                    0,
                  );
                  const fTotal = f.jurusans.reduce(
                    (acc, j) =>
                      acc + j.prodis.reduce((pAcc, p) => pAcc + p.total, 0),
                    0,
                  );
                  const fAee = fTotal > 0 ? (fLulus / fTotal) * 100 : 0;
                  const fAch = ideal > 0 ? (fAee / ideal) * 100 : 0;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedFaculty(f.name)}
                      className="p-6 border-b border-slate-100 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-800/50 cursor-pointer transition-colors group flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                          <BookOpen className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-relaxed">
                            {f.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <GraduationCap className="size-3" />
                              {fTotal} Mhs
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 className="size-3" />
                              {fLulus} Lulus
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 shrink-0 bg-slate-50 sm:bg-transparent dark:bg-slate-900 sm:dark:bg-transparent p-3 sm:p-0 rounded-xl">
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            AEE Prodi
                          </span>
                          <span className="text-lg font-black text-slate-900 dark:text-white">
                            {fAee.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 sm:hidden mx-2" />
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Pencapaian
                          </span>
                          <span className="text-lg font-black text-amber-500">
                            {fAch.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

            {/* 2. Show Jurusans if faculty is selected but no jurusan is selected */}
            {selectedFaculty && !selectedJurusan && liveJurusans.length > 0
              ? liveJurusans.map((j, i) => {
                  const jTotal = j.totalMhs;
                  const jLulus = j.lulusTepatWaktu;
                  const jAee = j.aeeRealisasi;
                  const jAch = j.tingkatPencapaian;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedJurusan(j.kode)}
                      className="p-6 border-b border-slate-100 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-800/50 cursor-pointer transition-colors group flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                          <Award className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-relaxed">
                            {j.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <GraduationCap className="size-3" />
                              {jTotal} Mhs
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 className="size-3" />
                              {jLulus} Lulus
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 shrink-0 bg-slate-50 sm:bg-transparent dark:bg-slate-900 sm:dark:bg-transparent p-3 sm:p-0 rounded-xl">
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            AEE Prodi
                          </span>
                          <span className="text-lg font-black text-slate-900 dark:text-white">
                            {jAee.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 sm:hidden mx-2" />
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Pencapaian
                          </span>
                          <span className="text-lg font-black text-amber-500">
                            {jAch.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : selectedFaculty &&
                !selectedJurusan &&
                activeFacultyData?.jurusans.map((j, i) => {
                  const jLulus = j.prodis.reduce((acc, p) => acc + p.lulus, 0);
                  const jTotal = j.prodis.reduce((acc, p) => acc + p.total, 0);
                  const jAee = jTotal > 0 ? (jLulus / jTotal) * 100 : 0;
                  const jAch = ideal > 0 ? (jAee / ideal) * 100 : 0;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedJurusan(j.name)}
                      className="p-6 border-b border-slate-100 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-800/50 cursor-pointer transition-colors group flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                          <Award className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-relaxed">
                            {j.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <GraduationCap className="size-3" />
                              {jTotal} Mhs
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 className="size-3" />
                              {jLulus} Lulus
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 shrink-0 bg-slate-50 sm:bg-transparent dark:bg-slate-900 sm:dark:bg-transparent p-3 sm:p-0 rounded-xl">
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            AEE Prodi
                          </span>
                          <span className="text-lg font-black text-slate-900 dark:text-white">
                            {jAee.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 sm:hidden mx-2" />
                        <div className="text-right flex items-center sm:items-end flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Pencapaian
                          </span>
                          <span className="text-lg font-black text-blue-500">
                            {jAch.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

            {/* 3. Show Prodis if Jurusan is selected (Leaf node) */}
            {selectedJurusan &&
            ikuProdiResponse?.datas &&
            ikuProdiResponse.datas.length > 0
              ? ikuProdiResponse.datas.map((p, i) => {
                  const detailForJenjang = p.detail?.find(
                    (d) =>
                      d.jenjang.toUpperCase() === selectedJenjang.toUpperCase(),
                  );
                  if (!detailForJenjang) return null;

                  const pTotal = detailForJenjang.total_lulusan;
                  const pLulus = detailForJenjang.lulus_tepat_waktu;
                  const pAee = detailForJenjang.aee_realisasi;
                  const pAch = detailForJenjang.tingkat_pencapaian;

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelectStudentUnit(p.nama_unit)}
                      className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 rounded-xl bg-purple-500/10 text-purple-500">
                          <School className="size-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-relaxed">
                              {p.nama_unit}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectStudentUnit(p.nama_unit);
                              }}
                              className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[9px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1 transition-colors"
                            >
                              <Users size={12} /> Data Mhs
                            </button>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <GraduationCap className="size-3" />
                              {pTotal} Total Terdaftar
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 className="size-3" />
                              {pLulus} Lulus Tepat Waktu
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highly detailed visual calculation formula for leaf nodes */}
                      <div className="pl-0 sm:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <Calculator className="text-amber-500 size-4 mt-1 shrink-0" />
                          <div className="text-[10px] sm:text-[11px] font-medium leading-relaxed w-full">
                            <span className="font-extrabold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[8px] sm:text-[9px] mb-1">
                              Formula AEE Prodi
                            </span>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 font-mono text-[10px] sm:text-xs text-slate-700 dark:text-slate-300">
                              <div className="flex flex-col items-center shrink-0">
                                <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-1 sm:px-2 text-center">
                                  Graduates ({pLulus})
                                </span>
                                <span className="pt-0.5 px-1 sm:px-2 text-center">
                                  Total Mhs ({pTotal})
                                </span>
                              </div>
                              <span className="shrink-0">x 100% =</span>
                              <span className="text-amber-500 font-extrabold shrink-0">
                                {pAee.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <Target className="text-blue-500 size-4 mt-1 shrink-0" />
                          <div className="text-[10px] sm:text-[11px] font-medium leading-relaxed w-full">
                            <span className="font-extrabold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[8px] sm:text-[9px] mb-1">
                              Formula Tingkat Pencapaian AEE
                            </span>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 font-mono text-[10px] sm:text-xs text-slate-700 dark:text-slate-300">
                              <div className="flex flex-col items-center shrink-0">
                                <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-1 sm:px-2 text-center">
                                  AEE Realisasi ({pAee.toFixed(2)}%)
                                </span>
                                <span className="pt-0.5 px-1 sm:px-2 text-center">
                                  AEE Ideal ({ideal}%)
                                </span>
                              </div>
                              <span className="shrink-0">x 100% =</span>
                              <span className="text-blue-500 font-extrabold shrink-0">
                                {pAch.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : selectedJurusan &&
                activeJurusanData?.prodis.map((p, i) => {
                  const pAee = p.total > 0 ? (p.lulus / p.total) * 100 : 0;
                  const pAch = ideal > 0 ? (pAee / ideal) * 100 : 0;

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelectStudentUnit(p.name)}
                      className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 rounded-xl bg-purple-500/10 text-purple-500">
                          <School className="size-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-relaxed">
                              {p.name}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectStudentUnit(p.name);
                              }}
                              className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[9px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1 transition-colors"
                            >
                              <Users size={12} /> Data Mhs
                            </button>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <GraduationCap className="size-3" />
                              {p.total} Total Terdaftar
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 className="size-3" />
                              {p.lulus} Lulus Tepat Waktu
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highly detailed visual calculation formula for leaf nodes */}
                      <div className="pl-0 sm:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <Calculator className="text-amber-500 size-4 mt-1 shrink-0" />
                          <div className="text-[10px] sm:text-[11px] font-medium leading-relaxed w-full">
                            <span className="font-extrabold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[8px] sm:text-[9px] mb-1">
                              Formula AEE Prodi
                            </span>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 font-mono text-[10px] sm:text-xs text-slate-700 dark:text-slate-300">
                              <div className="flex flex-col items-center shrink-0">
                                <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-1 sm:px-2 text-center">
                                  Graduates ({p.lulus})
                                </span>
                                <span className="pt-0.5 px-1 sm:px-2 text-center">
                                  Total Mhs ({p.total})
                                </span>
                              </div>
                              <span className="shrink-0">x 100% =</span>
                              <span className="text-amber-500 font-extrabold shrink-0">
                                {pAee.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <Target className="text-blue-500 size-4 mt-1 shrink-0" />
                          <div className="text-[10px] sm:text-[11px] font-medium leading-relaxed w-full">
                            <span className="font-extrabold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[8px] sm:text-[9px] mb-1">
                              Formula Tingkat Pencapaian AEE
                            </span>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 font-mono text-[10px] sm:text-xs text-slate-700 dark:text-slate-300">
                              <div className="flex flex-col items-center shrink-0">
                                <span className="border-b border-slate-300 dark:border-slate-700 pb-0.5 px-1 sm:px-2 text-center">
                                  AEE Realisasi ({pAee.toFixed(2)}%)
                                </span>
                                <span className="pt-0.5 px-1 sm:px-2 text-center">
                                  AEE Ideal ({ideal}%)
                                </span>
                              </div>
                              <span className="shrink-0">x 100% =</span>
                              <span className="text-blue-500 font-extrabold shrink-0">
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

      {/* Dynamic active student database view inline at the bottom of the page */}
      <div id="student-list-section" className="px-4 max-w-7xl mx-auto w-full">
        <StudentList
          unitName={
            activeStudentUnitName ||
            selectedJurusan ||
            selectedFaculty ||
            `Jenjang ${selectedJenjang}`
          }
          jenjang={selectedJenjang || "S1"}
        />
      </div>
    </div>
  );
}
