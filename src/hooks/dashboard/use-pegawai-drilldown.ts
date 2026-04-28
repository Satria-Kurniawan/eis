import { useQuery } from "@tanstack/react-query";
import {
  fetchPegawaiFakultas,
  fetchPegawaiJurusan,
  fetchPegawaiProdi,
} from "@/services/dashboard/pegawai";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useSearchParams } from "react-router-dom";

export const usePegawaiDrilldown = (enabled: boolean = true) => {
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
      "pegawai-drilldown",
      tahun,
      semester,
      kodeFakultas,
      kodeJurusan,
      statusPegawai,
      statusKeaktifan,
    ],
    queryFn: () => {
      const filters = { statusPegawai, statusKeaktifan };
      if (currentLevel === "fakultas")
        return fetchPegawaiFakultas(tahun, semester, filters);
      if (currentLevel === "jurusan")
        return fetchPegawaiJurusan(tahun, semester, kodeFakultas, filters);
      return fetchPegawaiProdi(
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
