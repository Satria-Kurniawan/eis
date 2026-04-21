import { apiClient } from "@/lib/api-client";

export interface BeasiswaData {
  _id: number;
  nim: string;
  nama: string;
  jenis_beasiswa: string;
  ipk: number;
  status: string;
  tahun: number;
  semester: string;
  semester_type: string;
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

export interface BeasiswaResponse {
  datas: BeasiswaData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface BeasiswaParams {
  tahun: string;
  semester: string;
  kodeFakultas?: string;
  kodeJurusan?: string;
  kodeProdi?: string;
  page?: number;
  limit?: number;
}

export const fetchBeasiswa = async (params: BeasiswaParams) => {
  const searchParams = new URLSearchParams({
    tahun: params.tahun,
    semester: params.semester,
    ...(params.kodeFakultas && { kodeFakultas: params.kodeFakultas }),
    ...(params.kodeJurusan && { kodeJurusan: params.kodeJurusan }),
    ...(params.kodeProdi && { kodeProdi: params.kodeProdi }),
    page: (params.page || 1).toString(),
    limit: (params.limit || 10).toString(),
  });

  return apiClient<BeasiswaResponse>(`/api/v1/beasiswa?${searchParams.toString()}`);
};
