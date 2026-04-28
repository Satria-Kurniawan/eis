import { useQuery } from "@tanstack/react-query";
import {
  fetchDosenFakultas,
  fetchDosenJurusan,
  fetchDosenProdi,
} from "@/services/dashboard/dosen";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useSearchParams } from "react-router-dom";

export const useDosenDrilldown = (enabled: boolean = true) => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan } = useUnitFilter();
  const [searchParams] = useSearchParams();

  const statusPegawai = searchParams.get("statusPegawai") || "";
  const statusKeaktifan = searchParams.get("statusKeaktifan") || "";

  const currentLevel = !kodeFakultas
    ? "fakultas"
    : !kodeJurusan
      ? "jurusan"
      : "prodi";

  const query = useQuery({
    queryKey: [
      "dosen-drilldown",
      tahun,
      semester,
      kodeFakultas,
      kodeJurusan,
      statusPegawai,
      statusKeaktifan,
    ],
    queryFn: () => {
      const filters = {
        id_status_pegawai: statusPegawai,
        id_status_keaktifan: statusKeaktifan,
      };
      if (currentLevel === "fakultas")
        return fetchDosenFakultas(tahun, semester, filters);
      if (currentLevel === "jurusan")
        return fetchDosenJurusan(tahun, semester, kodeFakultas, filters);
      return fetchDosenProdi(
        tahun,
        semester,
        kodeFakultas,
        kodeJurusan,
        filters,
      );
    },
    staleTime: 1000 * 60 * 5,
    enabled,
  });

  return {
    ...query,
    currentLevel,
  };
};
