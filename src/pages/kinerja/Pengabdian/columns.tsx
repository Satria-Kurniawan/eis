import { Badge } from "@/components/ui/badge";
import { type Pengabdian } from "@/services/kinerja/pengabdian";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  Coins,
  ExternalLink,
  School,
  TrendingUp,
  Users,
} from "lucide-react";

export const createColumns = (
  onViewDetail: (pengabdian: Pengabdian) => void,
): ColumnDef<Pengabdian>[] => [
  {
    accessorKey: "nama_kegiatan",
    header: "Nama Kegiatan",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[320px]">
        <span
          className="font-bold text-sm leading-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-2"
          title={row.original.nama_kegiatan}
        >
          {row.original.nama_kegiatan}
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-1.5 py-0 h-4 text-[9px] font-black border-indigo-500/20 bg-indigo-500/5 text-indigo-600"
          >
            {row.original.skim || row.original.skema}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground italic truncate max-w-[200px]">
            {row.original.bidang_penelitian}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "anggota",
    header: "Pelaksana",
    cell: ({ row }) => {
      let anggota = [];
      try {
        if (typeof row.original.anggota_pengabdian === "string") {
          anggota = JSON.parse(row.original.anggota_pengabdian);
        } else if (Array.isArray(row.original.anggota_pengabdian)) {
          anggota = row.original.anggota_pengabdian;
        }
      } catch (e) {
        console.error("Failed to parse anggota_pengabdian", e);
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
              & {anggota.length - 1} anggota lainnya
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "dana",
    header: "Dana & Sumber",
    cell: ({ row }) => {
      const dana = parseFloat(row.original.dana) || 0;
      const formattedDana = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(dana);

      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <Coins className="size-3.5" />
            <span className="text-xs font-black tracking-tight">
              {formattedDana}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
              {row.original.sumber_dana}
            </span>
            <Badge
              variant="secondary"
              className="px-1.5 py-0 h-3.5 text-[8px] font-black uppercase"
            >
              {row.original.sumber_data}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit / Homebase",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
          <Building2 className="size-3" />
          <span className="truncate max-w-[150px]">
            {row.original.unit?.fakultas}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-600">
            <School className="size-2.5" />
          </div>
          <span className="text-[11px] font-black text-foreground/80 truncate max-w-[150px]">
            {row.original.unit?.prodi}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "periode",
    header: "Periode",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 shadow-sm w-fit">
        <TrendingUp className="size-3.5 text-indigo-500" />
        <span className="text-[10px] font-black text-foreground uppercase">
          {row.original.tahun_ajaran}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <button
        onClick={() => onViewDetail(row.original)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm"
      >
        <ExternalLink className="size-3" />
        Detail
      </button>
    ),
  },
];
