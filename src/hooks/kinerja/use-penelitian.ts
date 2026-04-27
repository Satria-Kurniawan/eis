import { useQuery } from "@tanstack/react-query";
import { fetchPenelitian } from "@/services/kinerja/penelitian";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const usePenelitian = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["penelitian", tahun, semester, page, limit],
    queryFn: () => fetchPenelitian(tahun, semester, page, limit),
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
