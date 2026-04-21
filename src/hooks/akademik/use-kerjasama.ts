import { useQuery } from "@tanstack/react-query";
import { fetchKerjasama } from "@/services/akademik/kerjasama";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useKerjasama = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["kerjasama", tahun, semester, page, limit],
    queryFn: () => fetchKerjasama(tahun, semester, page, limit),
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
