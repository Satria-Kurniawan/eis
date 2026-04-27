import { useQuery } from "@tanstack/react-query";
import { fetchProsiding } from "@/services/kinerja/prosiding";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useProsiding = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["prosiding", tahun, semester, page, limit],
    queryFn: () => fetchProsiding(tahun, semester, page, limit),
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
