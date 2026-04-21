import { useQuery } from "@tanstack/react-query";
import { fetchPegawaiHistory } from "@/services/kepegawaian/pegawai";
import { usePeriod } from "@/contexts/PeriodContext";
import { useUnitFilter } from "@/contexts/UnitFilterContext";
import { useState } from "react";

export const usePegawaiHistory = () => {
  const { tahun, semester } = usePeriod();
  const { kodeFakultas, kodeJurusan, kodeProdi } = useUnitFilter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: [
      "pegawai-history",
      tahun,
      semester,
      kodeFakultas,
      kodeJurusan,
      kodeProdi,
      page,
      limit,
    ],
    queryFn: () =>
      fetchPegawaiHistory(
        tahun,
        semester,
        kodeFakultas,
        kodeJurusan,
        kodeProdi,
        page,
        limit
      ),
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
