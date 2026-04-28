import { apiClient } from "@/lib/api-client";

export interface Pegawai {
  nip: string;
  no_induk_undiksha: string;
  nama: string;
  fakultas: string;
  jurusan: string;
  prodi: string;
  tahun: number;
  status_pegawai: string;
  status_keaktifan: string;
  last_strata: string;
}

export interface PegawaiResponse {
  datas: Pegawai[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchPegawaiHistory = async (
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
    ...(search && { search }),
  });

  if (kodeFakultas) params.append("kode_fakultas", kodeFakultas);
  if (kodeJurusan) params.append("kode_jurusan", kodeJurusan);
  if (kodeProdi) params.append("kode_prodi", kodeProdi);

  return apiClient<PegawaiResponse>(
    `/api/v1/pegawai/history?${params.toString()}`,
  );
};
