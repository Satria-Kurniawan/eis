import { useQuery } from "@tanstack/react-query";
import {
  fetchMhsFakultas,
  fetchMhsJurusan,
  fetchMhsProdi,
} from "@/services/dashboard/mahasiswa";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";

export const useMhsDrilldown = () => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan } = useUnitFilter();

  const currentLevel = !kodeFakultas
    ? "fakultas"
    : !kodeJurusan
      ? "jurusan"
      : "prodi";

  const query = useQuery({
    queryKey: ["mhs-drilldown", tahun, semester, kodeFakultas, kodeJurusan],
    queryFn: () => {
      if (currentLevel === "fakultas") return fetchMhsFakultas(tahun, semester);
      if (currentLevel === "jurusan")
        return fetchMhsJurusan(tahun, semester, kodeFakultas);
      return fetchMhsProdi(tahun, semester, kodeFakultas, kodeJurusan);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    currentLevel,
  };
};
