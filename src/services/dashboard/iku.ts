import { apiClient } from "@/lib/api-client";

export interface Iku1DetailItem {
  jenjang: string;
  total_lulusan: number;
  lulus_tepat_waktu: number;
  aee_realisasi: number;
  aee_ideal: number;
  tingkat_pencapaian: number;
}

export interface Iku1Data {
  tahun: number;
  detail: Iku1DetailItem[];
  aee_pt_final: number;
}

export interface Iku1Response {
  datas: Iku1Data;
  message: string;
}

export interface IkuFakultasItem {
  aee_pt_final: number;
  detail: Iku1DetailItem[];
  kode_unit: string;
  nama_unit: string;
  tahun: number;
}

export interface IkuFakultasResponse {
  datas: IkuFakultasItem[];
  message: string;
}

export interface StudentUnit {
  uk_kode: string;
  fkt_kode: string;
  jrs_kode: string;
  prd_kode: string;
  fakultas: string;
  jurusan: string;
  prodi: string;
}

export interface StudentItem {
  id_mahasiswa: number;
  angkatan: string;
  bulan_studi: number;
  nama_fakultas: string;
  nama_jenjang: string;
  nama_lengkap: string;
  nama_prodi: string;
  nim: string;
  no_ijasah: string;
  semester_posisi: number;
  tahun_lulus: number;
  tahun_studi: number;
  tgl_ijasah: string;
  cdc_synced_at: string;
  unit: StudentUnit;
}

export interface PaginationInfo {
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface StudentResponse {
  datas: StudentItem[];
  message: string;
  pagination?: PaginationInfo;
}

export const fetchIku1 = async (tahun: string) => {
  const params = new URLSearchParams();
  if (tahun) params.append("tahun", tahun);

  return apiClient<Iku1Response>(`/api/v1/iku1?${params.toString()}`);
};

export const fetchIkuFakultas = async (tahun: string) => {
  const params = new URLSearchParams();
  if (tahun) params.append("tahun", tahun);

  return apiClient<IkuFakultasResponse>(
    `/api/v1/iku1/fakultas?${params.toString()}`,
  );
};

export interface IkuJurusanItem {
  aee_pt_final: number;
  detail: {
    jenjang: string;
    total_lulusan: number;
    lulus_tepat_waktu: number;
    aee_realisasi: number;
    aee_ideal: number;
    tingkat_pencapaian: number;
  }[];
  kode_unit: string;
  nama_unit: string;
  tahun: number;
}

export interface IkuJurusanResponse {
  datas: IkuJurusanItem[];
  message: string;
}

export const fetchIkuJurusan = async (tahun: string, fktKode: string) => {
  const params = new URLSearchParams();
  if (tahun) params.append("tahun", tahun);
  if (fktKode) params.append("fktKode", fktKode);

  return apiClient<IkuJurusanResponse>(
    `/api/v1/iku1/jurusan?${params.toString()}`,
  );
};

export interface IkuProdiItem {
  aee_pt_final: number;
  detail: {
    jenjang: string;
    total_lulusan: number;
    lulus_tepat_waktu: number;
    aee_realisasi: number;
    aee_ideal: number;
    tingkat_pencapaian: number;
  }[];
  kode_unit: string;
  nama_unit: string;
  tahun: number;
}

export interface IkuProdiResponse {
  datas: IkuProdiItem[];
  message: string;
}

export const fetchIkuProdi = async (tahun: string, jrsKode: string) => {
  const params = new URLSearchParams();
  if (tahun) params.append("tahun", tahun);
  if (jrsKode) params.append("jrsKode", jrsKode);

  return apiClient<IkuProdiResponse>(`/api/v1/iku1/prodi?${params.toString()}`);
};

export const fetchIkuStudents = async (
  year: string,
  jenjang: string,
  parentFilterKey?: string,
  parentFilterValue?: string,
  page?: number,
  limit?: number,
) => {
  const params = new URLSearchParams();
  if (year) params.append("year", year);
  if (jenjang) params.append("jenjang", jenjang);
  if (parentFilterKey) params.append("parentFilterKey", parentFilterKey);
  if (parentFilterValue) params.append("parentFilterValue", parentFilterValue);
  if (page !== undefined) params.append("page", page.toString());
  if (limit !== undefined) params.append("limit", limit.toString());

  return apiClient<StudentResponse>(
    `/api/v1/iku1/mhs-data?${params.toString()}`,
  );
};
