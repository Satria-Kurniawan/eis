import { apiClient } from "@/lib/api-client";

export interface RealisasiUnit {
    _id: number;
    id: string;
    kode_unit: string;
    nama_unit: string;
    pagu_pnbp: string;
    pagu_rm: string;
    pagu_rm_boptn: string;
    realisasi_pnbp: string;
    realisasi_rm: string;
    realisasi_rm_boptn: string;
    tahun_anggaran: string;
}

export interface RealisasiUnitResponse {
    datas: RealisasiUnit[];
    pagination: {
        limit: number;
        page: number;
        pages: number;
        total: number;
    };
}

export const fetchRealisasiUnit = async (
    tahun: string,
    semester: string,
    page: number = 1,
    limit: number = 10,
    unitFilters: {
        kodeFakultas?: string;
        kodeJurusan?: string;
        kodeProdi?: string;
    } = {}
) => {
    const params = new URLSearchParams({
        tahun,
        semester,
        page: page.toString(),
        limit: limit.toString(),
    });

    if (unitFilters.kodeFakultas) params.append("kodeFakultas", unitFilters.kodeFakultas);
    if (unitFilters.kodeJurusan) params.append("kodeJurusan", unitFilters.kodeJurusan);
    if (unitFilters.kodeProdi) params.append("kodeProdi", unitFilters.kodeProdi);

    return apiClient<RealisasiUnitResponse>(`/api/v1/realisasi-unit?${params.toString()}`);
};
