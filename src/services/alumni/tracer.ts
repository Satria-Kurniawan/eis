import { apiClient } from "@/lib/api-client";

export interface Tracer {
  _id: number;
  id_mahasiswa: number;
  nim_mahasiswa: string;
  nama_mahasiswa: string;
  email_mahasiswa: string;
  no_telp: string;
  nik_mahasiswa: string;
  npwp_mahasiswa: string;
  tgl_lahir_mahasiswa: string;
  jenis_kelamin_mahasiswa: string;
  bulan_lulus_mahasiswa: number;
  tahun_lulus_mahasiswa: number;
  ipk_mahasiswa: number;
  tgl_lulus_mahasiswa: string;
  status_mahasiswa: string;
  id_jurusan: number;
  user_id: number;
  deleted_at: string;
  status_pengisian: string;
  persentase_pengisian: number;
  pengisian_terakhir: string;
  dikti: string;
  bulan_wisuda: number;
  tahun_wisuda: number;
  no_ijasah: string;
  no_sk_yudisium: string;
  ayah: string;
  ibu: string;
  saudara: string;
  wali: string;
  jenjang: string;
  status_saat_ini: string;
  masa_tunggu_sebelum_lulus: string;
  masa_tunggu_setelah_lulus: string;
  provinsi: string;
  kabupaten: string;
  alamat_perusahaan: string;
  gaji: string;
  jenis_perusahaan: string;
  nama_perusahaan: string;
  jabatan_dalam_berwirausaha: string;
  tingkat_tempat_kerja: string;
  sumber_biaya_studi_lanjut: string;
  perguruan_tinggi_studi_lanjut: string;
  prodi_masuk_studi_lanjut: string;
  tanggal_masuk_studi_lanjut: string;
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

export interface TracerResponse {
  datas: Tracer[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchTracer = async (
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
  
  return apiClient<TracerResponse>(`/api/v1/tracer?${params.toString()}`);
};
