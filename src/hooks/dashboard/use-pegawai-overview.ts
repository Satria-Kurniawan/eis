import { useQuery } from "@tanstack/react-query";
import { fetchPegawaiOverview } from "@/services/dashboard/pegawai";
import { usePeriod } from "@/contexts/PeriodContext";
import { useSearchParams } from "react-router-dom";

export const usePegawaiOverview = () => {
  const { tahun, semester } = usePeriod();
  const [searchParams] = useSearchParams();

  const statusPegawai = searchParams.get("statusPegawai") || "";
  const statusKeaktifan = searchParams.get("statusKeaktifan") || "";

  return useQuery({
    queryKey: [
      "pegawai-overview",
      tahun,
      semester,
      statusPegawai,
      statusKeaktifan,
    ],
    queryFn: () =>
      fetchPegawaiOverview(tahun, semester, {
        statusPegawai,
        statusKeaktifan,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
