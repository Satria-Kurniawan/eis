import { apiClient } from "@/lib/api-client";

export interface AngketMahasiswa {
  _id: number;
  dosen: string[];
  id_kelas: string;
  id_penawaran: string;
  kode: string;
  mk: string;
  nip_dosen: string[];
  periode: string;
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

export interface AngketMahasiswaResponse {
  datas: AngketMahasiswa[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchAngketMahasiswa = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10
) => {
  return apiClient<AngketMahasiswaResponse>(
    `/api/v1/angket-mhs?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}`
  );
};
