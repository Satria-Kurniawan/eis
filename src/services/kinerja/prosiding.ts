import { apiClient } from "@/lib/api-client";

export interface Prosiding {
    _id: number;
    judul_artikel: string;
    nama_seminar: string;
    tgl_awal: string;
    created_at: string;
    isValid: string;
    semester: string;
    tahun_ajaran: string;
    tahun_data: string;
    tbName: string;
    primaryKey: string;
    waktu_pelaksanaan: string;
    nama_dosen: string;
    scope: string;
    tipe_prosiding: string;
    tanggal: string;
    id_sinta: string;
    penyelenggara: string;
    penerbit: string;
    tgl_akhir: string;
    P_ISSN: string;
    E_ISSN: string;
    ISBN: string;
    url_dokumen: string;
    url_per_review: string;
    keterangan: string;
    tempat_pelaksanaan: string;
    satuan: string;
    volume_kegiatan: string;
    sinta: string;
    jenis_pembicara: string;
    posisi: string;
    file_upload: string;
    jml_penulis: string;
    file_penilaian_reviewer: string;
    file_hasil_uji_plagiarim: string;
    updated_at: string;
    deleted_at: string;
    is_produk: string;
    produk_penelitian_judul: string;
    produk_penelitian_id: string;
    produk_pengabdian_judul: string;
    produk_pengabdian_id: string;
    komentar: string;
    status_publish: string;
    valid_ipk: string;
    valid_ipk_komentar: string;
    bereputasi: string;
    create_dosen_id: string;
    indexer: {
        url: string;
        nama_indexer: string;
    }[];
    sumber_produk: string;
    produk_penelitian: {
        id: number | null;
        judul: string;
    };
    produk_pengabdian: {
        id: number | null;
        judul: string;
    };
    mahasiswa_penelitian: any[];
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
    anggota_non_dosen: string;
    cron_tahun: string;
    cron_semester: string;
    kode_tipe_prosiding: string;
    kode_scope: string;
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

export interface ProsidingResponse {
    datas: Prosiding[];
    pagination: {
        limit: number;
        page: number;
        pages: number;
        total: number;
    };
}

export const fetchProsiding = async (
    tahun: string,
    semester: string,
    page: number = 1,
    limit: number = 10,
    search?: string,
    kodeFakultas?: string,
    kodeJurusan?: string,
    kodeProdi?: string
) => {
    const params = new URLSearchParams({
        tahun,
        semester,
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(kodeFakultas && { kodeFakultas }),
        ...(kodeJurusan && { kodeJurusan }),
        ...(kodeProdi && { kodeProdi }),
    });

    return apiClient<ProsidingResponse>(`/api/v1/prosiding?${params.toString()}`);
};
