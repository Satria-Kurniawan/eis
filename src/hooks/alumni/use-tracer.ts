import { useQuery } from "@tanstack/react-query";
import { fetchTracer } from "@/services/alumni/tracer";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useTracer = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["tracer-alumni", tahun, semester, page, limit],
    queryFn: () => fetchTracer(tahun, semester, page, limit),
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
