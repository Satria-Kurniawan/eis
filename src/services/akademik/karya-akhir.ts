import { apiClient } from "@/lib/api-client";

export interface KaryaAkhirData {
  _id: number;
  current_state: string;
  judul: string;
  main_stage: string;
  nama_lengkap: string;
  nama_pa: string;
  nama_pembimbing_1: string;
  nama_pembimbing_2: string;
  nama_penguji_1: string;
  nama_penguji_2: string;
  nilai_akhir: string;
  nim: string;
  status_judul: string;
  tahun_masuk: number;
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

export interface KaryaAkhirResponse {
  datas: KaryaAkhirData[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchKaryaAkhir = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return apiClient<KaryaAkhirResponse>(
    `/api/v1/karya-akhir?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}&search=${search}`
  );
};

