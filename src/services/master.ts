import { apiClient } from "@/lib/api-client";

export interface UnitKerja {
  uk_id: number;
  uk_kode: string;
  uk_nama: string;
  children: UnitKerja[] | null;
}

export interface UnitKerjaResponse {
  datas: UnitKerja[];
}

export const fetchUnitKerja = async () => {
  return apiClient<UnitKerjaResponse>("/api/v1/unit-kerja");
};
