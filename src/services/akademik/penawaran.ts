import { apiClient } from "@/lib/api-client";

export interface PenawaranData {
  _id: number;
  jml_mhs_ambil: string;
  kode_matakuliah: string;
  kurikulum: string;
  nama_kelas: string;
  nama_matakuliah: string;
  nama_pengampu: string;
  nip_pengampu: string;
  pengampu: string;
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

export interface PenawaranResponse {
  datas: PenawaranData[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchPenawaran = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return apiClient<PenawaranResponse>(
    `/api/v1/penawaran?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}&search=${search}`
  );
};

