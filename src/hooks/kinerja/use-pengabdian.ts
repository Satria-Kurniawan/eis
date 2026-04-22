import { useQuery } from "@tanstack/react-query";
import { fetchPengabdian } from "@/services/kinerja/pengabdian";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const usePengabdian = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["pengabdian", tahun, semester, page, limit],
    queryFn: () => fetchPengabdian(tahun, semester, page, limit),
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
