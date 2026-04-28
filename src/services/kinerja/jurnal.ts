import { apiClient } from "@/lib/api-client";

export interface Jurnal {
  _id: number;
  judul_artikel: string;
  nama_jurnal: string;
  tanggal: string;
  semester: string;
  tahun_ajaran: string;
  tahun_data: string;
  akreditasi: string;
  created_at: string;
  isValid: string;
  tbName: string;
  primaryKey: string;
  waktu_pelaksanaan: string;
  nama_dosen: string;
  kode_prodi: string;
  nama_jurusan: string;
  nama_fakultas: string;
  id_sinta: string;
  authors: string;
  sitasi: string;
  volume_jurnal: string;
  nomor_jurnal: string;
  halaman_awal: string;
  halaman_akhir: string;
  P_ISSN: string;
  E_ISSN: string;
  DOI: string;
  penerbit: string;
  file_upload: string;
  alamat_web_jurnal: string;
  url_dokumen: string;
  url_peer_review: string;
  keterangan: string;
  bahasa_id: string;
  sinta: string;
  scope: string;
  jenis_jurnal: string;
  aggregation_type: string;
  impact_factor: string;
  satuan: string;
  volume_kegiatan: string;
  tahun_publish: string;
  posisi: string;
  file_submit: string;
  file_revisi: string;
  file_sudah_revisi: string;
  file_diterima: string;
  file_selesai_dicetak: string;
  file_terpublikasi: string;
  jml_penulis: string;
  file_hasil_uji_plagiarim: string;
  file_penilaian_reviewer: string;
  updated_at: string;
  deleted_at: string | null;
  is_produk: string;
  produk_penelitian_judul: string;
  produk_penelitian_id: string;
  produk_pengabdian_judul: string;
  produk_pengabdian_id: string;
  dari_api_sinta: string;
  status_lengkap: string;
  komentar: string;
  valid_ipk: string;
  valid_ipk_komentar: string;
  create_dosen_id: string;
  indexer: string[];
  sumber_produk: string;
  produk_penelitian: string;
  produk_pengabdian: string;
  mahasiswa_penelitian: string;
  anggota_penelitian: string;
  cron_tahun: string;
  cron_semester: string;
  kode_akreditasi: string;
  kode_scope: string;
  kode_jenis_jurnal: string;
  periode: string;
  semester_type: string;
  unit: {
    uk_kode: string;
    fkt_kode: string;
    jrs_kode: string;
    prd_kode: string;
    fakultas: string;
    jurusan: string;
    prodi: string;
  };
}

export interface JurnalResponse {
  datas: Jurnal[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchJurnal = async (
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

  return apiClient<JurnalResponse>(`/api/v1/jurnal?${params.toString()}`);
};
