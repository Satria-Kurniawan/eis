import { fetchUnitKerja } from "@/services/master";
import { useQuery } from "@tanstack/react-query";

export const useUnitKerja = () => {
  const query = useQuery({
    queryKey: ["unit-kerja"],
    queryFn: fetchUnitKerja,
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  const getFakultas = () => {
    if (!query.data?.datas) return [];
    // The root is Univ, level 1 children are Fakultas
    return query.data.datas[0]?.children || [];
  };

  const getJurusan = (fakultasKode: string) => {
    if (!fakultasKode) return [];
    const fakultas = getFakultas().find((f) => f.uk_kode === fakultasKode);
    if (!fakultas) return [];

    // Jurusan are children of Fakultas
    // We should filter for units that actually have children (Prodi)
    // or are explicitly Jurusan. Based on sample, Jurusan have children.
    return fakultas.children || [];
  };

  const getProdi = (fakultasKode: string, jurusanKode: string) => {
    if (!jurusanKode) return [];
    const jurusans = getJurusan(fakultasKode);
    const jurusan = jurusans.find((j) => j.uk_kode === jurusanKode);

    if (!jurusan) return [];
    return jurusan.children || [];
  };

  return {
    ...query,
    getFakultas,
    getJurusan,
    getProdi,
  };
};
