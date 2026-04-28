import { useQuery } from "@tanstack/react-query";
import { fetchRekapPmb } from "@/services/akademik/rekap-pmb";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useState, useEffect } from "react";

export const useRekapPmb = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [tahun, semester, search, kodeFakultas, kodeJurusan, kodeProdi]);

  const query = useQuery({
    queryKey: [
      "rekap-pmb",
      tahun,
      semester,
      page,
      limit,
      search,
      kodeFakultas,
      kodeJurusan,
      kodeProdi,
    ],
    queryFn: () =>
      fetchRekapPmb(
        tahun,
        semester,
        page,
        limit,
        search,
        kodeFakultas,
        kodeJurusan,
        kodeProdi,
      ),
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

