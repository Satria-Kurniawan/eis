import { useQuery } from "@tanstack/react-query";
import { fetchBuku } from "@/services/kinerja/buku";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useBuku = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["buku", tahun, semester, page, limit],
    queryFn: () => fetchBuku(tahun, semester, page, limit),
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
