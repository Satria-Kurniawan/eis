import { useQuery } from "@tanstack/react-query";
import { fetchDosenHistory } from "@/services/kepegawaian/dosen";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useState } from "react";

export const useDosenHistory = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: [
      "dosen-history",
      tahun,
      semester,
      kodeFakultas,
      kodeJurusan,
      kodeProdi,
      search,
      page,
      limit,
    ],
    queryFn: () =>
      fetchDosenHistory(
        tahun,
        semester,
        kodeFakultas,
        kodeJurusan,
        kodeProdi,
        page,
        limit,
        search
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
