import { apiClient } from "@/lib/api-client";

export interface PerangkatPembelajaran {
  id_penawaran: string;
  kode: string;
  id_kelas: string;
  mk: string;
  kurikulum: string;
  pertemuan: string;
  dosen: string[];
  metode: string;
  silabus: string;
  kontrak: string;
  rps: string;
  rtm: string;
  semester: string;
  tahun: string;
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

export interface PerangkatPembelajaranResponse {
  datas: PerangkatPembelajaran[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchPerangkatPembelajaran = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10
) => {
  return apiClient<PerangkatPembelajaranResponse>(
    `/api/v1/perpem?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}`
  );
};
