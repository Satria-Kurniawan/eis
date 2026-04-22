import { useQuery } from "@tanstack/react-query";
import { fetchPerangkatPembelajaran } from "@/services/akademik/perangkatPembelajaran";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const usePerangkatPembelajaran = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["perangkat-pembelajaran", tahun, semester, page, limit, search],
    queryFn: () =>
      fetchPerangkatPembelajaran(tahun, semester, page, limit, search),
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

