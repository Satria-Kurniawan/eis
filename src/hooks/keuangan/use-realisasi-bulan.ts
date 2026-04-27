import { useQuery } from "@tanstack/react-query";
import { fetchRealisasiBulan } from "@/services/keuangan/realisasi-bulan";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useRealisasiBulan = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12); // Default to 12 for months

  const query = useQuery({
    queryKey: ["realisasi-bulan", tahun, semester, page, limit],
    queryFn: () => fetchRealisasiBulan(tahun, semester, page, limit),
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
