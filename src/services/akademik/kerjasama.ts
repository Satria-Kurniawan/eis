import { apiClient } from "@/lib/api-client";

export interface KerjasamaData {
  _id: number;
  partner_nama: string;
  uk_kerjasama: string;
  uk_pelaksana: string;
  bntkrjsma_nama: string;
  deskripsi_singkat: string;
  stskrjsma_nama: string;
  tanggal_awal: string;
  tanggal_akhir: string;
  jns_asalmitra_nama: string;
  negara_nama: string;
  dokumen_url: string;
  dokument_nama: string;
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

export interface KerjasamaResponse {
  datas: KerjasamaData[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchKerjasama = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return apiClient<KerjasamaResponse>(
    `/api/v1/kerjasama?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}&search=${search}`
  );
};

