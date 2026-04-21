import { apiClient } from "@/lib/api-client";

export interface PmbStats {
  peminat: string;
  lulus: string;
  daftar: string;
}

export interface RekapPmb {
  _id: number;
  tahun: number;
  kode: string;
  nama_prodi: string;
  snbp: PmbStats;
  snbt: PmbStats;
  smbjm_cbt: PmbStats;
  smbjm_raport: PmbStats;
  smbjm_talent: PmbStats;
  smbjm_utbk: PmbStats;
  profesi: PmbStats;
  internasional: PmbStats;
  pasca: PmbStats;
  adikpapua: PmbStats;
  jumlah: PmbStats;
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

export interface RekapPmbResponse {
  datas: RekapPmb[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export const fetchRekapPmb = async (
  tahun: string,
  semester: string,
  page: number = 1,
  limit: number = 10,
) => {
  return apiClient<RekapPmbResponse>(
    `/api/v1/rekap-pmb?tahun=${tahun}&semester=${semester}&page=${page}&limit=${limit}`,
  );
};
