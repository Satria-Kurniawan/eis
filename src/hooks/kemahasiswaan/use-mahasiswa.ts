import { useQuery } from "@tanstack/react-query";
import { fetchMahasiswaHistory } from "@/services/kemahasiswaan/mahasiswa";
import { usePeriod } from "@/contexts/PeriodContext";
import { useState } from "react";

export const useMahasiswa = () => {
  const { tahun, semester } = usePeriod();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Filters
  const [angkatan, setAngkatan] = useState("");
  const [kodeFakultas, setKodeFakultas] = useState("");
  const [kodeJurusan, setKodeJurusan] = useState("");
  const [kodeProdi, setKodeProdi] = useState("");

  const query = useQuery({
    queryKey: [
      "mahasiswa-history", 
      tahun, 
      semester, 
      angkatan, 
      kodeFakultas, 
      kodeJurusan, 
      kodeProdi, 
      page, 
      limit
    ],
    queryFn: () => fetchMahasiswaHistory({
      tahun,
      semester,
      angkatan,
      kodeFakultas,
      kodeJurusan,
      kodeProdi,
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
    setLimit,
    filters: {
      angkatan,
      setAngkatan,
      kodeFakultas,
      setKodeFakultas,
      kodeJurusan,
      setKodeJurusan,
      kodeProdi,
      setKodeProdi
    }
  };
};
