import { useQuery } from "@tanstack/react-query";
import {
  fetchMhsFakultas,
  fetchMhsJurusan,
  fetchMhsProdi,
} from "@/services/dashboard/mahasiswa";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";

import { useSearchParams } from "react-router-dom";

export const useMhsDrilldown = (enabled: boolean = true) => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan } = useUnitFilter();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("mhsStatus") || "1";

  const currentLevel = !kodeFakultas
    ? "fakultas"
    : !kodeJurusan
      ? "jurusan"
      : "prodi";

  const query = useQuery({
    queryKey: [
      "mhs-drilldown",
      tahun,
      semester,
      kodeFakultas,
      kodeJurusan,
      status,
    ],
    queryFn: () => {
      if (currentLevel === "fakultas")
        return fetchMhsFakultas(tahun, semester, status);
      if (currentLevel === "jurusan")
        return fetchMhsJurusan(tahun, semester, kodeFakultas, status);
      return fetchMhsProdi(tahun, semester, kodeFakultas, kodeJurusan, status);
    },
    staleTime: 1000 * 60 * 5,
    enabled,
  });

  return {
    ...query,
    currentLevel,
  };
};
