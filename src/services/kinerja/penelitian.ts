import { apiClient } from "@/lib/api-client";

export interface Penelitian {
    _id: number;
    judul_tulisan: string;
    tanggal: string;
    created_at: string;
    isValid: string;
    semester: string;
    tahun_ajaran: string;
    tahun_data: string;
    tbName: string;
    primaryKey: string;
    waktu_pelaksanaan: string;
    nama_dosen: string;
    sumber_dana: string;
    id_penelitian_bidang_sub: string;
    id_sub_bidang: string;
    nama_sub_bidang: string;
    id_sinta: string;
    id_silidia: string;
    tahun_implementasi: string;
    tahun_awal: string;
    tahun_proposal: string;
    file_sampul: string;
    file_daftar_isi: string;
    file_lembar_pengesahan: string;
    file_bukti_kerja: string;
    file_proposal: string;
    file_revisi: string;
    file_laporan_kemajuan: string;
    file_laporan_akhir: string;
    id_skim: string;
    id_fokus: string;
    id_hibah: string;
    id_sosek_sub: string;
    jenis_penelitian: string;
    institusi_sumber_dana: string;
    dana: string;
    skema: string;
    sumber_data: string;
    deskripsi: string;
    posisi: string;
    status_lengkap: string;
    rumpun_ilmu: string;
    updated_at: string;
    deleted_at: string;
    komentar: string;
    valid_ipk: string;
    valid_ipk_komentar: string;
    bidang_penelitian: string;
    skim: string;
    tujuan_ekonomi_sosial: string;
    level_capaian: {
        file_kerjasama: string | null;
        file_laporan_akhir: string | null;
        file_laporan_kemajuan: string | null;
        file_proposal: string | null;
        file_revisi: string | null;
    };
    mahasiswa_penelitian: {
        id_anggota: number;
        metadata: {
            judul_skripsi: string;
            penelitian_jenis_id: number;
            table_jenis_penelitian: string;
            valid_ipk: number;
            valid_ipk_komentar: string | null;
        };
        nama_lengkap: string;
        nim: string | null;
    }[];
    anggota_penelitian: {
        identitas: {
            email: string;
            id: number;
            nama_lengkap: string;
            nidn: string;
            nip: string;
            source_id: number;
        };
        peran: {
            asal: string;
            is_ketua: boolean;
            penulis_ke: number;
            status_konfirmasi: string;
        };
        unit_kerja: {
            fakultas: string;
            institusi: string;
            jurusan: string;
            kode_fakultas: string;
            kode_jurusan: string;
        };
    }[];
    cron_tahun: string;
    cron_semester: string;
    dokumen_pendukung: string;
    dokumen_pendukung_opsional: string;
    file_mitra_awal: string;
    periode: string;
    semester_type: string;
    unit: {
        uk_kode: string;
        fkt_kode: string;
        jrs_kode: string;
        prd_kode: string;
        fakultas: string;
        jurusan: string;
        prodi: string;
    };
}

export interface PenelitianResponse {
    datas: Penelitian[];
    pagination: {
        limit: number;
        page: number;
        pages: number;
        total: number;
    };
}

export const fetchPenelitian = async (
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

    return apiClient<PenelitianResponse>(`/api/v1/penelitian?${params.toString()}`);
};
