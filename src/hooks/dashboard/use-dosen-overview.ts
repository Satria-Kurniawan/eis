import { useQuery } from "@tanstack/react-query";
import { fetchDosenOverview } from "@/services/dashboard/dosen";
import { usePeriod } from "@/contexts/PeriodContext";

import { useSearchParams } from "react-router-dom";

export const useDosenOverview = () => {
  const { tahun, semester } = usePeriod();
  const [searchParams] = useSearchParams();

  const id_status_pegawai = searchParams.get("statusPegawai") || "";
  const id_status_keaktifan = searchParams.get("statusKeaktifan") || "";

  return useQuery({
    queryKey: [
      "dosen-overview",
      tahun,
      semester,
      id_status_pegawai,
      id_status_keaktifan,
    ],
    queryFn: () =>
      fetchDosenOverview(tahun, semester, {
        id_status_pegawai,
        id_status_keaktifan,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
