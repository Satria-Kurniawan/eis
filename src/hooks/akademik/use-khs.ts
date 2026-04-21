import { useQuery } from "@tanstack/react-query";
import { fetchKhs } from "@/services/akademik/khs";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useKhs = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["khs-orang-tua", tahun, semester, page, limit],
    queryFn: () => fetchKhs(tahun, semester, page, limit),
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
