import { useQuery } from "@tanstack/react-query";
import { fetchAgendaMengajar } from "@/services/akademik/agendaMengajar";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useAgendaMengajar = (search: string = "") => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["agenda-mengajar", tahun, semester, page, limit, search],
    queryFn: () => fetchAgendaMengajar(tahun, semester, page, limit, search),
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

