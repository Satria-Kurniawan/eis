import { useQuery } from "@tanstack/react-query";
import { fetchJurnal } from "@/services/kinerja/jurnal";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useJurnal = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["jurnal", tahun, semester, page, limit],
    queryFn: () => fetchJurnal(tahun, semester, page, limit),
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
