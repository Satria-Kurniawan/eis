import { useQuery } from "@tanstack/react-query";
import { fetchMahasiswaHistory } from "@/services/kemahasiswaan/mahasiswa";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useState } from "react";

export const useMahasiswa = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const query = useQuery({
    queryKey: [
      "mahasiswa-history", 
      tahun, 
      semester, 
      kodeFakultas, 
      kodeJurusan, 
      kodeProdi,
      search,
      page, 
      limit
    ],
    queryFn: () => fetchMahasiswaHistory({
      tahun,
      semester,
      kodeFakultas,
      kodeJurusan,
      kodeProdi,
      search,
      page,
      limit
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...query,
    page,
    setPage,
    limit,
    setLimit
  };
};
