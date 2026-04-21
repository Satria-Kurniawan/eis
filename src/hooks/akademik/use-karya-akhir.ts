import { useQuery } from "@tanstack/react-query";
import { fetchKaryaAkhir } from "@/services/akademik/karya-akhir";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useKaryaAkhir = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["karya-akhir", tahun, semester, page, limit],
    queryFn: () => fetchKaryaAkhir(tahun, semester, page, limit),
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
