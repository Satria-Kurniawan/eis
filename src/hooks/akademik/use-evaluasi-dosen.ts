import { useQuery } from "@tanstack/react-query";
import { fetchEvaluasiDosen } from "@/services/akademik/evaluasiDosen";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useEvaluasiDosen = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["evaluasi-dosen", tahun, semester, page, limit],
    queryFn: () => fetchEvaluasiDosen(tahun, semester, page, limit),
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
