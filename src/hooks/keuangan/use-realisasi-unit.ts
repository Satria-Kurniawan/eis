import { useQuery } from "@tanstack/react-query";
import { fetchRealisasiUnit } from "@/services/keuangan/realisasi-unit";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useState } from "react";

export const useRealisasiUnit = () => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["realisasi-unit", tahun, semester, page, limit, kodeFakultas, kodeJurusan, kodeProdi],
    queryFn: () => fetchRealisasiUnit(tahun, semester, page, limit, { kodeFakultas, kodeJurusan, kodeProdi }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...query,
    page,
    setPage,
    limit,
    setLimit,
  };
};
