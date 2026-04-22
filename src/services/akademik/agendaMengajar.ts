import { apiClient } from "@/lib/api-client";

export interface AgendaMengajar {
  _id: number;
  dosen: string[];
  id_kelas: string;
  id_penawaran: string;
  jenis_kelas: string;
  kode: string;
  kurikulum: string;
  matakuliah: string;
  nip_dosen: string[];
  periode: string;
  pertemuan: string;
  semester: string;
  sumber: string;
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

export interface AgendaMengajarResponse {
  datas: AgendaMengajar[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchAgendaMengajar = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return apiClient<AgendaMengajarResponse>(
    `/api/v1/agenda-mengajar?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}&search=${search}`
  );
};

