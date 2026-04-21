import { apiClient } from "@/lib/api-client";

export interface KhsLog {
  _id: number;
  nim: string;
  nama_mhs: string;
  semester: string;
  tahun: string;
  dilihat: string;
  foto: string;
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

export interface KhsResponse {
  datas: KhsLog[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchKhs = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
) => {
  return apiClient<KhsResponse>(
    `/api/v1/khs?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}`,
  );
};
