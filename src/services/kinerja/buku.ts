import { apiClient } from "@/lib/api-client";

export interface Buku {
  _id: number;
  judul_buku: string;
  penerbit: string;
  tanggal: string;
  created_at: string;
  isValid: string;
  semester: string;
  tahun_ajaran: string;
  tahun_data: string;
  scope: string;
  tbName: string;
  primaryKey: string;
  waktu_pelaksanaan: string;
  nama_dosen: string;
  kode_prodi: string;
  nama_jurusan: string;
  nama_fakultas: string;
  keterangan: string;
  kategori_buku: string;
  ISBN: string;
  url_dokumen: string;
  url_per_review: string;
  satuan: string;
  jumlah_halaman: string;
  volume_kegiatan: string;
  file_upload: string;
  posisi: string;
  jml_negara_pengedaran: string;
  file_pendahuluan: string;
  file_isi_buku: string;
  file_penutup_dan_referensi: string;
  file_persetujuan_penerbit: string;
  file_selesai_dicetak: string;
  jml_penulis: string;
  file_hasil_uji_plagiarim: string;
  file_penilaian_reviewer: string;
  updated_at: string;
  deleted_at: string;
  is_produk: string;
  produk_penelitian_judul: string;
  produk_penelitian_id: string;
  produk_pengabdian_judul: string;
  produk_pengabdian_id: string;
  komentar: string;
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
  kode_kategori_buku: string;
  kode_scope: string;
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

export interface BukuResponse {
  datas: Buku[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchBuku = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10
) => {
  const params = new URLSearchParams({
    tahun,
    semester,
    page: page.toString(),
    limit: limit.toString(),
  });

  return apiClient<BukuResponse>(`/api/v1/buku?${params.toString()}`);
};
