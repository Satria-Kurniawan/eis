import { useQuery } from "@tanstack/react-query";
import { fetchPenelitian } from "@/services/kinerja/penelitian";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useState } from "react";

export const usePenelitian = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: [
      "penelitian", 
      tahun, 
      semester, 
      kodeFakultas, 
      kodeJurusan, 
      kodeProdi,
      search,
      page, 
      limit
    ],
    queryFn: () => fetchPenelitian(
      tahun, 
      semester, 
      page, 
      limit,
      search,
      kodeFakultas,
      kodeJurusan,
      kodeProdi
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
