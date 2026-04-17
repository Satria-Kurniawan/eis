import { useQuery } from "@tanstack/react-query";
import { fetchMahasiswaWisuda } from "@/services/akademik/mahasiswaWisuda";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useMahasiswaWisuda = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["mahasiswa-wisuda", tahun, semester, page, limit],
    queryFn: () => fetchMahasiswaWisuda(tahun, semester, page, limit),
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
