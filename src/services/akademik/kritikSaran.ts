import { apiClient } from "@/lib/api-client";

export interface KritikSaran {
  _id: number;
  nip: string;
  nama: string;
  saran: string[];
  tahun: string;
  semester: string;
  periode: string;
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

export interface KritikSaranResponse {
  datas: KritikSaran[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchKritikSaran = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10
) => {
  return apiClient<KritikSaranResponse>(
    `/api/v1/kritik-saran?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}`
  );
};
