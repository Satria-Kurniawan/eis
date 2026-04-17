import { type EvaluationMetric, type EvaluasiDosen } from "@/services/akademik/evaluasiDosen";

export const calculateMetricScore = (metric: EvaluationMetric) => {
  const total = metric.sangat_baik + metric.baik + metric.cukup + metric.kurang;
  if (total === 0) return 0;
  
  // Weighting: SB=4, B=3, C=2, K=1
  const weightedSum = (metric.sangat_baik * 4) + (metric.baik * 3) + (metric.cukup * 2) + (metric.kurang * 1);
  return (weightedSum / (total * 4)) * 100; // Returns score in percentage 0-100
};

export const getOverallSatisfaction = (data: EvaluasiDosen) => {
  const metricKeys: (keyof EvaluasiDosen)[] = [
    "Perencanaan_perkuliahan",
    "Relevansi_materi_dengan_tujuan_pembelajaran",
    "Penguasaan_materi_perkuliahan",
    "Metode_dan_pendekatan_perkuliahan",
    "Inovasi_dalam_perkuliahan",
    "Kreatifitas_dalam_perkuliahan",
    "Media_pembelajaran",
    "Sumber_belajar",
    "Penilaian_hasil_belajar",
    "Penilaian_proses_belajar",
    "Pemberian_tugas_perkuliahan",
    "Pengelolaan_kelas",
    "Motivasi_dan_antusiasme_mengajar",
    "Penciptaan_iklim_belajar",
    "Kedisiplinan",
    "Penegakan_aturan_perkuliahan",
    "Pengembangan_karakter_mahasiswa",
    "Keteladanan_dalam_bersikap_dan_bertindak",
    "Kemampuan_berkomunikasi",
    "Penggunaan_bahasa_lisan_dan_tulisan",
    "Kemampuan_berinteraksi_sosial_dengan_mahasiswa"
  ];

  let totalScore = 0;
  let activeMetrics = 0;

  metricKeys.forEach(key => {
    const metric = data[key] as EvaluationMetric;
    const score = calculateMetricScore(metric);
    if (score > 0) {
      totalScore += score;
      activeMetrics++;
    }
  });

  return activeMetrics > 0 ? Math.round(totalScore / activeMetrics) : 0;
};

export const getStatusFromScore = (score: number) => {
  if (score >= 85) return { label: "Sangat Memuaskan", color: "emerald" };
  if (score >= 70) return { label: "Memuaskan", color: "blue" };
  if (score >= 50) return { label: "Cukup", color: "amber" };
  return { label: "Perlu Peningkatan", color: "destructive" };
};
