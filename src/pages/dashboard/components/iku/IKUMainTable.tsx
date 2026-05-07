import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type Iku1Response } from "../../../../services/dashboard/iku";
import { getJenjangKey } from "./iku1-data";

interface IKUMainTableProps {
  iku1Response?: Iku1Response;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  tahun?: string;
  d3Ach: number;
  d4Ach: number;
  s1Ach: number;
  s2Ach: number;
  s3Ach: number;
  proAch?: number;
  overallAeePtVal: number;
}

export function IKUMainTable({
  isError,
  refetch,
  d3Ach,
  d4Ach,
  s1Ach,
  s2Ach,
  s3Ach,
  proAch = 0,
  overallAeePtVal,
}: IKUMainTableProps) {
  const [, setSearchParams] = useSearchParams();
  const [showFormulaBoard, setShowFormulaBoard] = useState(false);

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

  const ikuData = [
    {
      no: "1",
      sasaran: "Kualitas Lulusan",
      indicators: [
        {
          id: "IKU 1",
          label: "Angka Efisiensi Edukasi Perguruan Tinggi (AEE PT)",
          satuan: "%",
          baseline: "57,00",
          target: "67,04",
          realisasi: `${overallAeePtVal.toFixed(2)}%`,
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
              realisasi: `${d3Ach.toFixed(2)}%`,
            },
            {
              label: "d. D4",
              satuan: "%",
              baseline: "70,00",
              target: "80,00",
              realisasi: `${d4Ach.toFixed(2)}%`,
            },
            {
              label: "e. S1",
              satuan: "%",
              baseline: "70,00",
              target: "80,00",
              realisasi: `${s1Ach.toFixed(2)}%`,
            },
            {
              label: "f. S2**",
              satuan: "%",
              baseline: "45,00",
              target: "54,00",
              realisasi: `${s2Ach.toFixed(2)}%`,
            },
            {
              label: "g. S3**",
              satuan: "%",
              baseline: "30,00",
              target: "45,45",
              realisasi: `${s3Ach.toFixed(2)}%`,
            },
            {
              label: "h. Profesi",
              satuan: "%",
              baseline: "80,00",
              target: "100,00",
              realisasi: `${proAch.toFixed(2)}%`,
            },
          ],
        },
        {
          id: "IKU 2",
          label:
            "Persentase lulusan pendidikan tinggi program diploma satu, diploma dua, diploma tiga, diploma empat/sarjana terapan, dan sarjana yang langsung bekerja, berwirausaha, atau melanjutkan studi dalam jangka waktu 1 (satu) tahun setelah kelulusan, serta sudah bekerja, atau berwirausaha sebelum lulus kuliah.",
          satuan: "%",
          baseline: "46,94",
          target: "60,00",
          realisasi: "58,20%",
        },
        {
          id: "IKU 3",
          label:
            "Persentase mahasiswa program Diploma dan Sarjana yang berkegiatan/meraih prestasi di luar program studi",
          satuan: "%",
          baseline: "22,59",
          target: "30,00",
          realisasi: "28,40%",
        },
      ],
    },
    {
      no: "2",
      sasaran: "Kualitas Dosen",
      indicators: [
        {
          id: "IKU 4",
          label:
            "Jumlah Dosen perguruan tinggi yang mendapatkan rekognisi internasional atau hasil penelitiannya diterapkan oleh masyarakat.",
          satuan: "%",
          baseline: "35,20",
          target: "42,00",
          realisasi: "40,50%",
        },
        {
          id: "IKU 5",
          label:
            "Persentase luaran hasil kerja sama dan hilirisasi antara perguruan tinggi dengan industri/Lembaga.",
          satuan: "%",
          baseline: "70,00",
          target: "80,00",
          realisasi: "79,50%",
        },
        {
          id: "IKU 6",
          label: "Persentase publikasi bereputasi internasional (Scopus/WoS)",
          satuan: "%",
          baseline: "15,00",
          target: "25,00",
          realisasi: "22,40%",
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
    {
      no: "3",
      sasaran: "Kualitas Kurikulum",
      indicators: [
        {
          id: "IKU 7",
          label:
            "Persentase keterlibatan perguruan tinggi dalam: 1) SDG 1 (Tanpa Kemiskinan); dan 2) SDG 4 (Pendidikan Berkualitas); 3) SDG 17 (Kemitraan) 4) 2 (dua) SDGs lain sesuai keunggulan",
          satuan: "%",
          baseline: "50,00",
          target: "60,00",
          realisasi: "58,30%",
        },
        {
          id: "IKU 8",
          label:
            "Persentase Sumber Daya Manusia (SDM) perguruan tinggi yang terlibat langsung dalam penyusunan kebijakan (nasional/daerah/industri)",
          satuan: "%",
          baseline: "15,00",
          target: "25,00",
          realisasi: "20,00%",
        },
        {
          id: "IKU 9",
          label:
            "Persentase pendapatan/penghasilan dari bidang non akademik (selain UKT/uang kuliah)",
          satuan: "%",
          baseline: "8,50",
          target: "12,00",
          realisasi: "10,80%",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-10 transition-all duration-500">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <TrendingUp className="size-3" />
          <span>Direktorat Perencanaan & Keuangan</span>
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

      {isError && (
        <div className="mx-4 p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>
              Gagal memuat data IKU 1 real-time. Menampilkan data fallback
              lokal.
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

      {/* Target and Realization Table */}
      <div className="px-4">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative">
          {/* Table Header Decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-amber-500 to-emerald-500" />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 w-16 text-center">
                    No
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                    Indikator Utama & Sub Indikator
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 text-center">
                    Satuan
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 text-center bg-blue-500/5">
                    Baseline Projected 2025
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 text-center bg-amber-500/5">
                    Target 2026
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center bg-emerald-500/5">
                    Realisasi 2026
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {ikuData.map((sasaran, sIndex) => {
                  const totalRows = sasaran.indicators.reduce(
                    (acc, curr) => acc + 1 + (curr.children?.length || 0),
                    0,
                  );

                  return (
                    <React.Fragment key={sIndex}>
                      {sasaran.indicators.map((indicator, iIndex) => {
                        return (
                          <React.Fragment key={iIndex}>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                              {iIndex === 0 && (
                                <td
                                  rowSpan={totalRows}
                                  className="px-6 py-4 border-r border-slate-200 dark:border-slate-800 text-center align-top bg-slate-50/30 dark:bg-slate-950/30"
                                >
                                  <div className="flex flex-col items-center gap-2">
                                    <span className="text-sm font-black text-slate-900 dark:text-white bg-white dark:bg-slate-800 size-8 flex items-center justify-center rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                                      {sasaran.no}
                                    </span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 [writing-mode:vertical-lr] rotate-180 mt-2">
                                      {sasaran.sasaran}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td className="px-6 py-5 border-r border-slate-200 dark:border-slate-800">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex flex-col gap-1">
                                    {indicator.id && (
                                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                                        {indicator.id}
                                      </span>
                                    )}
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                                      {indicator.label}
                                    </span>
                                  </div>
                                  {indicator.id === "IKU 1" && (
                                    <button
                                      onClick={() => setShowFormulaBoard(true)}
                                      className="shrink-0 p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                                      title="Lihat Rumus Perhitungan"
                                    >
                                      <Calculator className="size-3.5" />
                                      <span>Formula</span>
                                    </button>
                                  )}
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
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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

      {/* Premium Formula Dialog Overlay */}
      <AnimatePresence>
        {showFormulaBoard && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormulaBoard(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 space-y-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-900 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                      <Calculator className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        Panduan Formula Kebijakan IKU 1 (AEE PT)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        Perhitungan Angka Efisiensi Edukasi
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFormulaBoard(false)}
                    className="p-2 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 text-xs font-black uppercase tracking-widest border border-slate-200/50 dark:border-slate-800 cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>

                {/* Formula Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card A */}
                  <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[8px] font-black uppercase tracking-widest border border-blue-500/20">
                      A. AEE PRODI (Capaian Prodi)
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      Mengukur rasio mahasiswa lulus tepat waktu sesuai
                      kurikulum standar terhadap total mahasiswa aktif
                      seangkatan.
                    </p>
                    <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-[10px] text-slate-700 dark:text-slate-300">
                      <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-1">
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

                  {/* Card B */}
                  <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">
                      B. TINGKAT PENCAPAIAN AEE
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      Membandingkan AEE realisasi prodi dengan batas ideal
                      nasional masing-masing jenjang (S1: 25%, D4: 25%, D3: 33%,
                      S2: 50%, S3: 33%).
                    </p>
                    <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-[10px] text-slate-700 dark:text-slate-300 flex flex-col justify-center h-[90px]">
                      <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-1">
                        AEE Realisasi
                      </div>
                      <div className="text-center pt-1">AEE Ideal Jenjang</div>
                      <div className="text-center text-emerald-500 font-black mt-2">
                        x 100%
                      </div>
                    </div>
                  </div>

                  {/* Card C */}
                  <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-[8px] font-black uppercase tracking-widest border border-purple-500/20">
                      C. AEE PT (Perguruan Tinggi)
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      Rata-rata tingkat pencapaian dari seluruh jenjang akademik
                      (D3 s/d S3) yang diselenggarakan oleh perguruan tinggi.
                    </p>
                    <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-[10px] text-slate-700 dark:text-slate-300 flex flex-col justify-center items-center h-[90px]">
                      <div className="text-center text-purple-500 font-black">
                        Σ (Tingkat Pencapaian_i)
                      </div>
                      <div className="w-1/2 border-b border-slate-200 dark:border-slate-800 my-1" />
                      <div className="text-center">n (Jumlah Jenjang)</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Footer */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] text-amber-700 dark:text-amber-400/80 leading-relaxed font-bold">
                  * Catatan Penting: Capaian AEE PT Universitas Pendidikan
                  Ganesha (Undiksha) dihitung secara berkala setiap tahun
                  akademik selesai guna mengevaluasi efisiensi internal
                  penyelenggaraan pendidikan.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
