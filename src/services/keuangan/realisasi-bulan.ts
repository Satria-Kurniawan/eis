import { apiClient } from "@/lib/api-client";

export interface RealisasiBulan {
    _id: number;
    id: string;
    bulan: string;
    realisasi_total_pnbp: string;
    realisasi_total_rm: string;
    realisasi_total_rm_boptn: string;
    tahun_anggaran: string;
}

export interface RealisasiBulanResponse {
    datas: RealisasiBulan[];
    pagination: {
        limit: number;
        page: number;
        pages: number;
        total: number;
    };
}

export const fetchRealisasiBulan = async (
    tahun: string,
    semester: string,
    page: number = 1,
    limit: number = 10
) => {
    const params = new URLSearchParams({
        tahun,
        semester,
        page: page.toString(),
        limit: limit.toString(),
    });

    return apiClient<RealisasiBulanResponse>(`/api/v1/realisasi-bulan?${params.toString()}`);
};
