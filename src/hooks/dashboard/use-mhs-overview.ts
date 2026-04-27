import { useQuery } from "@tanstack/react-query";
import { fetchMhsOverview } from "@/services/dashboard/mahasiswa";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";

export const useMhsOverview = () => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();

  return useQuery({
    queryKey: ["mhs-overview", tahun, semester, kodeFakultas, kodeJurusan, kodeProdi],
    queryFn: () => fetchMhsOverview(tahun, semester, { kodeFakultas, kodeJurusan, kodeProdi }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
