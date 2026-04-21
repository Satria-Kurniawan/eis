import { useQuery } from "@tanstack/react-query";
import { fetchBeasiswa } from "@/services/kemahasiswaan/beasiswa";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useState } from "react";

export const useBeasiswa = () => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: [
      "beasiswa", 
      tahun, 
      semester, 
      kodeFakultas, 
      kodeJurusan, 
      kodeProdi, 
      page, 
      limit
    ],
    queryFn: () => fetchBeasiswa({
      tahun,
      semester,
      kodeFakultas,
      kodeJurusan,
      kodeProdi,
      page,
      limit
    }),
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    page,
    setPage,
    limit,
    setLimit
  };
};
