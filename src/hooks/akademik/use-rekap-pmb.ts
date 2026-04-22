import { useQuery } from "@tanstack/react-query";
import { fetchRekapPmb } from "@/services/akademik/rekap-pmb";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useRekapPmb = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["rekap-pmb", tahun, semester, page, limit, search],
    queryFn: () => fetchRekapPmb(tahun, semester, page, limit, search),
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

