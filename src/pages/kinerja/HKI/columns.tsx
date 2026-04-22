import { Badge } from "@/components/ui/badge";
import { type HKI } from "@/services/kinerja/hki";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  ExternalLink,
  Fingerprint,
  Layers,
  School,
  TrendingUp,
  Users,
} from "lucide-react";

export const columns: ColumnDef<HKI>[] = [
  {
    accessorKey: "nama_karya",
    header: "Nama Karya",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[400px]">
        <span
          className="font-bold text-sm leading-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-2"
          title={row.original.nama_karya}
        >
          {row.original.nama_karya}
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-1.5 py-0 h-4 text-[9px] font-black border-indigo-500/20 bg-indigo-500/5 text-indigo-600"
          >
            {row.original.jenis_paten}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {row.original.scope}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "inventor",
    header: "Inventor",
    cell: ({ row }) => {
      let anggota = [];
      try {
        if (typeof row.original.anggota_penelitian === "string") {
          anggota = JSON.parse(row.original.anggota_penelitian);
        } else if (Array.isArray(row.original.anggota_penelitian)) {
          anggota = row.original.anggota_penelitian;
        }
      } catch (e) {
        console.error("Failed to parse anggota_penelitian", e);
      }

      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Users className="size-3.5 text-indigo-500" />
            <span className="text-xs font-bold text-foreground">
              {row.original.nama_dosen}
            </span>
          </div>
          {anggota.length > 1 && (
            <span className="text-[10px] font-medium text-muted-foreground">
              & {anggota.length - 1} inventor lainnya
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "pendaftaran",
    header: "Pendaftaran & Sertifikat",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
          <Fingerprint className="size-3" />
          <span className="truncate max-w-[150px]">
            Reg: {row.original.no_pendaftaran}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Layers className="size-3 text-indigo-500" />
          <span className="text-[11px] font-black text-foreground/80 truncate max-w-[120px]">
            No: {row.original.no_pendatatan_sertifikat || "-"}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit Kerja",
    cell: ({ row }) => {
      const unitData = row.original.unit || row.original.units;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
            <Building2 className="size-3" />
            <span className="truncate max-w-[150px]">
              {unitData?.fakultas || "-"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-600">
              <School className="size-2.5" />
            </div>
            <span className="text-[11px] font-black text-foreground/80 truncate max-w-[150px]">
              {unitData?.prodi || "-"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "periode",
    header: "Periode",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 shadow-sm w-fit">
        <TrendingUp className="size-3.5 text-indigo-500" />
        <span className="text-[10px] font-black text-foreground uppercase tracking-widest">
          {row.original.tahun_ajaran}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "dokumen",
    header: "Dokumen",
    cell: ({ row }) => {
      const url =
        row.original.file_sertifikat_paten || row.original.file_bukti_kinerja;

      return (
        <div className="flex items-center gap-2">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 transition-all font-bold text-[10px] uppercase tracking-widest"
            >
              <ExternalLink className="size-3" />
              Sertifikat
            </a>
          ) : (
            <Badge
              variant="secondary"
              className="bg-muted/50 text-muted-foreground/50 border-transparent text-[8px] font-black uppercase"
            >
              No File
            </Badge>
          )}
        </div>
      );
    },
  },
];
