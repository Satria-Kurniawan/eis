import { apiClient } from "@/lib/api-client";

export interface MahasiswaWisuda {
  _id: number;
  nim: string;
  nama_lengkap: string;
  tahun_wisuda: number;
  bulan_wisuda: number;
  nama_bulan: string;
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

export interface MahasiswaWisudaResponse {
  datas: MahasiswaWisuda[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchMahasiswaWisuda = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10
) => {
  return apiClient<MahasiswaWisudaResponse>(
    `/api/v1/mhs-wisuda?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}`
  );
};
