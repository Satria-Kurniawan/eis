import { apiClient } from "@/lib/api-client";

export interface EvaluationMetric {
  sangat_baik: number;
  baik: number;
  cukup: number;
  kurang: number;
}

export interface EvaluasiDosen {
  _id: number;
  nip: string;
  no_induk_undiksha: string;
  nama_lengkap: string;
  nama_kelas: string;
  kode_matakuliah: string;
  nama_matakuliah: string;
  tahun: string;
  semester: string;
  kode_prodi: string;
  kode_fakultas: string;
  unit: {
    uk_kode: string;
    fkt_kode: string;
    jrs_kode: string;
    prd_kode: string;
    fakultas: string;
    jurusan: string;
    prodi: string;
  };
  created_at: string;
  updated_at: string;
  // Metrics
  Perencanaan_perkuliahan: EvaluationMetric;
  Relevansi_materi_dengan_tujuan_pembelajaran: EvaluationMetric;
  Penguasaan_materi_perkuliahan: EvaluationMetric;
  Metode_dan_pendekatan_perkuliahan: EvaluationMetric;
  Inovasi_dalam_perkuliahan: EvaluationMetric;
  Kreatifitas_dalam_perkuliahan: EvaluationMetric;
  Media_pembelajaran: EvaluationMetric;
  Sumber_belajar: EvaluationMetric;
  Penilaian_hasil_belajar: EvaluationMetric;
  Penilaian_proses_belajar: EvaluationMetric;
  Pemberian_tugas_perkuliahan: EvaluationMetric;
  Pengelolaan_kelas: EvaluationMetric;
  Motivasi_dan_antusiasme_mengajar: EvaluationMetric;
  Penciptaan_iklim_belajar: EvaluationMetric;
  Kedisiplinan: EvaluationMetric;
  Penegakan_aturan_perkuliahan: EvaluationMetric;
  Pengembangan_karakter_mahasiswa: EvaluationMetric;
  Keteladanan_dalam_bersikap_dan_bertindak: EvaluationMetric;
  Kemampuan_berkomunikasi: EvaluationMetric;
  Penggunaan_bahasa_lisan_dan_tulisan: EvaluationMetric;
  Kemampuan_berinteraksi_sosial_dengan_mahasiswa: EvaluationMetric;
}

export interface EvaluasiDosenResponse {
  datas: EvaluasiDosen[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchEvaluasiDosen = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return apiClient<EvaluasiDosenResponse>(
    `/api/v1/evaluasi-dosen?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}&search=${search}`
  );
};

