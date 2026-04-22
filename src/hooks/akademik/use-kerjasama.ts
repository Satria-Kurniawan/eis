import { useQuery } from "@tanstack/react-query";
import { fetchKerjasama } from "@/services/akademik/kerjasama";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useKerjasama = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["kerjasama", tahun, semester, page, limit, search],
    queryFn: () => fetchKerjasama(tahun, semester, page, limit, search),
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

