import { apiClient } from "@/lib/api-client";

export interface Dosen {
  no_induk_undiksha: string;
  nama: string;
  fakultas: string;
  jurusan: string;
  prodi: string;
  tahun: number;
  status_pegawai: string;
  status_keaktifan: string;
  jabatan_fungsional: string;
  strata: string;
}

export interface DosenResponse {
  datas: Dosen[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchDosenHistory = async (
  tahun: string,
  semester: string,
  kodeFakultas: string,
  kodeJurusan: string,
  kodeProdi: string,
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  const params = new URLSearchParams({
    tahun,
    semester,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (kodeFakultas) params.append("kode_fakultas", kodeFakultas);
  if (kodeJurusan) params.append("kode_jurusan", kodeJurusan);
  if (kodeProdi) params.append("kode_prodi", kodeProdi);
  if (search) params.append("search", search);

  return apiClient<DosenResponse>(`/api/v1/dosen/history?${params.toString()}`);
};
