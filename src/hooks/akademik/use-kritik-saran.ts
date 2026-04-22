import { useQuery } from "@tanstack/react-query";
import { fetchKritikSaran } from "@/services/akademik/kritikSaran";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useKritikSaran = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["kritik-saran", tahun, semester, page, limit, search],
    queryFn: () => fetchKritikSaran(tahun, semester, page, limit, search),
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

