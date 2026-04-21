import { useQuery } from "@tanstack/react-query";
import { fetchPenawaran } from "@/services/akademik/penawaran";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const usePenawaran = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["penawaran", tahun, semester, page, limit],
    queryFn: () => fetchPenawaran(tahun, semester, page, limit),
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
