import { useQuery } from "@tanstack/react-query";
import { fetchAngketMahasiswa } from "@/services/akademik/angketMahasiswa";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useAngketMahasiswa = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["angket-mahasiswa", tahun, semester, page, limit, search],
    queryFn: () => fetchAngketMahasiswa(tahun, semester, page, limit, search),
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

