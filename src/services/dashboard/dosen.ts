import { apiClient } from "@/lib/api-client";
import { type MhsStatusResponse } from "./mahasiswa";

export interface DosenOverviewItem {
  title: string;
  value: number;
  id_status_pegawai: number;
  id_status_keaktifan: number;
  drilldown: boolean;
}

export interface DosenOverviewResponse {
  datas: DosenOverviewItem[];
  message: string;
}

export const fetchDosenOverview = async (
  tahun: string,
  semester: string,
  filters: { id_status_pegawai?: string; id_status_keaktifan?: string } = {},
) => {
  const params = new URLSearchParams({ tahun, semester });
  if (filters.id_status_pegawai)
    params.append("statusPegawai", filters.id_status_pegawai);
  if (filters.id_status_keaktifan)
    params.append("statusKeaktifan", filters.id_status_keaktifan);

  return apiClient<DosenOverviewResponse>(
    `/api/v1/dashboard-dosen/overview?${params.toString()}`,
  );
};

export const fetchStatusPegawai = async () => {
  return apiClient<MhsStatusResponse>(`/api/v1/status-pegawai`);
};

export const fetchStatusKeaktifan = async () => {
  return apiClient<MhsStatusResponse>(`/api/v1/status-keaktifan-pegawai`);
};

export interface DosenDrilldownResponse {
  datas: {
    id: string;
    name: string;
    value: number;
    level: string;
  }[];
  total: number;
  message: string;
}

export const fetchDosenFakultas = async (
  tahun: string,
  semester: string,
  filters: { id_status_pegawai?: string; id_status_keaktifan?: string } = {},
) => {
  const params = new URLSearchParams({ tahun, semester });
  if (filters.id_status_pegawai)
    params.append("statusPegawai", filters.id_status_pegawai);
  if (filters.id_status_keaktifan)
    params.append("statusKeaktifan", filters.id_status_keaktifan);

  return apiClient<DosenDrilldownResponse>(
    `/api/v1/dashboard-dosen/fakultas?${params.toString()}`,
  );
};

export const fetchDosenJurusan = async (
  tahun: string,
  semester: string,
  kodeFakultas: string,
  filters: { id_status_pegawai?: string; id_status_keaktifan?: string } = {},
) => {
  const params = new URLSearchParams({
    tahun,
    semester,
    kodeFakultas,
  });
  if (filters.id_status_pegawai)
    params.append("statusPegawai", filters.id_status_pegawai);
  if (filters.id_status_keaktifan)
    params.append("statusKeaktifan", filters.id_status_keaktifan);
  console.log(`/api/v1/dashboard-dosen/jurusan?${params.toString()}`);
  return apiClient<DosenDrilldownResponse>(
    `/api/v1/dashboard-dosen/jurusan?${params.toString()}`,
  );
};

export const fetchDosenProdi = async (
  tahun: string,
  semester: string,
  kodeFakultas: string,
  kodeJurusan: string,
  filters: { id_status_pegawai?: string; id_status_keaktifan?: string } = {},
) => {
  const params = new URLSearchParams({
    tahun,
    semester,
    kodeFakultas,
    kodeJurusan,
  });
  if (filters.id_status_pegawai)
    params.append("statusPegawai", filters.id_status_pegawai);
  if (filters.id_status_keaktifan)
    params.append("statusKeaktifan", filters.id_status_keaktifan);

  return apiClient<DosenDrilldownResponse>(
    `/api/v1/dashboard-dosen/prodi?${params.toString()}`,
  );
};
