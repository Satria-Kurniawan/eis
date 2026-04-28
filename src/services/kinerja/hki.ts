import { apiClient } from "@/lib/api-client";

export interface HKI {
  _id: number;
  nama_karya: string;
  tanggal: string;
  created_at: string;
  isValid: string;
  semester: string;
  tahun_ajaran: string;
  tahun_data: string;
  jenis_paten: string;
  tbName: string;
  primaryKey: string;
  waktu_pelaksanaan: string;
  nama_dosen: string;
  no_pendaftaran: string;
  no_pendatatan_sertifikat: string;
  scope: string;
  jml_negara_pengaku: string;
  file_bukti_kinerja: string;
  file_sertifikat_paten: string;
  deskripsi: string;
  posisi: string;
  file_pendaftaran: string;
  file_pemeriksaan_substansi: string;
  file_uji_publik: string;
  file_sertifikasi: string;
  jml_penulis: string;
  updated_at: string;
  deleted_at: string;
  is_produk: string;
  produk_penelitian_judul: string;
  produk_penelitian_id: string;
  produk_pengabdian_judul: string;
  produk_pengabdian_id: string;
  komentar: string;
  file_penilaian_reviewer: string;
  file_hasil_uji_plagiarim: string;
  valid_ipk: string;
  valid_ipk_komentar: string;
  create_dosen_id: string;
  level_capaian: string;
  sumber_produk: string;
  produk_penelitian: string;
  produk_pengabdian: string;
  mahasiswa_penelitian: string;
  anggota_penelitian: string;
  cron_tahun: string;
  cron_semester: string;
  kode_scope: string;
  kode_jenis_paten: string;
  periode: string;
  semester_type: string;
  units?: {
    uk_kode: string;
    fkt_kode: string;
    jrs_kode: string;
    prd_kode: string;
    fakultas: string;
    jurusan: string;
    prodi: string;
  };
  unit?: {
    uk_kode: string;
    fkt_kode: string;
    jrs_kode: string;
    prd_kode: string;
    fakultas: string;
    jurusan: string;
    prodi: string;
  };
}

export interface HKIResponse {
  datas: HKI[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchHKI = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
  search?: string,
  kodeFakultas?: string,
  kodeJurusan?: string,
  kodeProdi?: string
) => {
  const params = new URLSearchParams({
    tahun,
    semester,
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(kodeFakultas && { kodeFakultas }),
    ...(kodeJurusan && { kodeJurusan }),
    ...(kodeProdi && { kodeProdi }),
  });

  return apiClient<HKIResponse>(`/api/v1/hki?${params.toString()}`);
};
