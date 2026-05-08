import { useQuery } from "@tanstack/react-query";
import {
  fetchIku1,
  fetchIkuFakultas,
  fetchIkuStudents,
  fetchIkuJurusan,
  fetchIkuProdi,
} from "@/services/dashboard/iku";

export const useIku1 = () => {
  const currentYear = new Date().getFullYear().toString();

  return useQuery({
    queryKey: ["iku1", currentYear],
    queryFn: () => fetchIku1(currentYear),
  });
};

export const useIkuFakultas = () => {
  const currentYear = new Date().getFullYear().toString();

  return useQuery({
    queryKey: ["ikuFakultas", currentYear],
    queryFn: () => fetchIkuFakultas(currentYear),
  });
};

export const useIkuJurusan = (fktKode: string | null) => {
  const currentYear = new Date().getFullYear().toString();

  return useQuery({
    queryKey: ["ikuJurusan", currentYear, fktKode],
    queryFn: () => fetchIkuJurusan(currentYear, fktKode || ""),
    enabled: !!fktKode,
  });
};

export const useIkuProdi = (jrsKode: string | null) => {
  const currentYear = new Date().getFullYear().toString();

  return useQuery({
    queryKey: ["ikuProdi", currentYear, jrsKode],
    queryFn: () => fetchIkuProdi(currentYear, jrsKode || ""),
    enabled: !!jrsKode,
  });
};

export const useIkuStudents = (
  jenjang: string,
  parentFilterKey?: string,
  parentFilterValue?: string,
  page?: number,
  limit?: number,
) => {
  const currentYear = new Date().getFullYear().toString();

  return useQuery({
    queryKey: ["ikuStudents", currentYear, jenjang, parentFilterKey, parentFilterValue, page, limit],
    queryFn: () => fetchIkuStudents(currentYear, jenjang, parentFilterKey, parentFilterValue, page, limit),
    enabled: !!jenjang,
  });
};
