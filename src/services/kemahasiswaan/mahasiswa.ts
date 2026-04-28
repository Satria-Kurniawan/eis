import { apiClient } from "@/lib/api-client";

export interface MahasiswaHistoryData {
  nim: string;
  nama: string;
  tahun_masuk: string;
  fakultas: string;
  jurusan: string;
  prodi: string;
  tahun: number;
  semester: number;
  status: string;
  periode: string;
  kewarganegaraan: string;
  telp: string;
  email_sso: string;
  nama_pa: string;
}

export interface MahasiswaHistoryResponse {
  datas: MahasiswaHistoryData[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchMahasiswaHistory = async (
  params: {
    tahun?: string;
    semester?: string;
    kodeFakultas?: string;
    kodeJurusan?: string;
    kodeProdi?: string;
    search?: string;
    page?: number;
    limit?: number;
  }
) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  return apiClient<MahasiswaHistoryResponse>(
    `/api/v1/mhs/history?${queryParams.toString()}`
  );
};
