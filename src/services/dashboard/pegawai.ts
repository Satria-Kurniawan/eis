import { apiClient } from "@/lib/api-client";
import { type DosenOverviewItem } from "./dosen";

export interface PegawaiOverviewResponse {
  datas: DosenOverviewItem[]; // The structure is identical to DosenOverviewItem based on user prompt
  message: string;
}

export const fetchPegawaiOverview = async (
  tahun: string,
  semester: string,
  filters: { statusPegawai?: string; statusKeaktifan?: string } = {},
) => {
  const params = new URLSearchParams({ tahun, semester });
  if (filters.statusPegawai)
    params.append("statusPegawai", filters.statusPegawai);
  if (filters.statusKeaktifan)
    params.append("statusKeaktifan", filters.statusKeaktifan);

  return apiClient<PegawaiOverviewResponse>(
    `/api/v1/dashboard-pegawai/overview?${params.toString()}`,
  );
};

export interface PegawaiDrilldownResponse {
  datas: {
    id: string;
    name: string;
    value: number;
    level: string;
  }[];
  total: number;
  message: string;
}

export const fetchPegawaiFakultas = async (
  tahun: string,
  semester: string,
  filters: { statusPegawai?: string; statusKeaktifan?: string } = {},
) => {
  const params = new URLSearchParams({ tahun, semester });
  if (filters.statusPegawai)
    params.append("statusPegawai", filters.statusPegawai);
  if (filters.statusKeaktifan)
    params.append("statusKeaktifan", filters.statusKeaktifan);

  return apiClient<PegawaiDrilldownResponse>(
    `/api/v1/dashboard-pegawai/fakultas?${params.toString()}`,
  );
};

export const fetchPegawaiJurusan = async (
  tahun: string,
  semester: string,
  kodeFakultas: string,
  filters: { statusPegawai?: string; statusKeaktifan?: string } = {},
) => {
  const params = new URLSearchParams({
    tahun,
    semester,
    kodeFakultas,
  });
  if (filters.statusPegawai)
    params.append("statusPegawai", filters.statusPegawai);
  if (filters.statusKeaktifan)
    params.append("statusKeaktifan", filters.statusKeaktifan);

  return apiClient<PegawaiDrilldownResponse>(
    `/api/v1/dashboard-pegawai/jurusan?${params.toString()}`,
  );
};

export const fetchPegawaiProdi = async (
  tahun: string,
  semester: string,
  kodeFakultas: string,
  kodeJurusan: string,
  filters: { statusPegawai?: string; statusKeaktifan?: string } = {},
) => {
  const params = new URLSearchParams({
    tahun,
    semester,
    kodeFakultas,
    kodeJurusan,
  });
  if (filters.statusPegawai)
    params.append("statusPegawai", filters.statusPegawai);
  if (filters.statusKeaktifan)
    params.append("statusKeaktifan", filters.statusKeaktifan);

  return apiClient<PegawaiDrilldownResponse>(
    `/api/v1/dashboard-pegawai/prodi?${params.toString()}`,
  );
};
