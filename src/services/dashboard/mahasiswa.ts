import { apiClient } from "@/lib/api-client";

export interface MhsOverviewItem {
    title: string;
    value: number;
    status: string;
    drilldown: boolean;
}

export interface MhsOverviewResponse {
    datas: MhsOverviewItem[];
    message: string;
}

export const fetchMhsOverview = async (
    tahun: string,
    semester: string,
    unitFilters: {
        kodeFakultas?: string;
        kodeJurusan?: string;
        kodeProdi?: string;
    } = {}
) => {
    const params = new URLSearchParams({ tahun, semester });
    if (unitFilters.kodeFakultas) params.append("kodeFakultas", unitFilters.kodeFakultas);
    if (unitFilters.kodeJurusan) params.append("kodeJurusan", unitFilters.kodeJurusan);
    if (unitFilters.kodeProdi) params.append("kodeProdi", unitFilters.kodeProdi);

    return apiClient<MhsOverviewResponse>(`/api/v1/dashboard-mhs/overview?${params.toString()}`);
};

export interface MhsDrilldownItem {
    id: string;
    name: string;
    value: number;
    level: "fakultas" | "jurusan" | "prodi";
}

export interface MhsDrilldownResponse {
    datas: MhsDrilldownItem[];
    message: string;
    total: number;
}

export interface MhsStatusItem {
    id_status: number;
    status: string;
}

export interface MhsStatusResponse {
    datas: MhsStatusItem[];
    message: string;
}

export const fetchMhsStatus = async () => {
    return apiClient<MhsStatusResponse>(`/api/v1/status-mhs`);
};

export const fetchMhsFakultas = async (tahun: string, semester: string, status: string = "1") => {
    const params = new URLSearchParams({ tahun, semester, status });
    return apiClient<MhsDrilldownResponse>(`/api/v1/dashboard-mhs/fakultas?${params.toString()}`);
};

export const fetchMhsJurusan = async (tahun: string, semester: string, kodeFakultas: string, status: string = "1") => {
    const params = new URLSearchParams({ tahun, semester, kodeFakultas, status });
    return apiClient<MhsDrilldownResponse>(`/api/v1/dashboard-mhs/jurusan?${params.toString()}`);
};

export const fetchMhsProdi = async (tahun: string, semester: string, kodeFakultas: string, kodeJurusan: string, status: string = "1") => {
    const params = new URLSearchParams({ tahun, semester, kodeFakultas, kodeJurusan, status });
    return apiClient<MhsDrilldownResponse>(`/api/v1/dashboard-mhs/prodi?${params.toString()}`);
};
