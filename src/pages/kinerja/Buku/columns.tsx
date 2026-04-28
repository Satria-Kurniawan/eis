import { Badge } from "@/components/ui/badge";
import { type Buku } from "@/services/kinerja/buku";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ExternalLink,
  Globe,
  Hash,
  Layers,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";

export const createColumns = (
  onViewDetail: (buku: Buku) => void,
): ColumnDef<Buku>[] => [
  {
    accessorKey: "judul_buku",
    header: "Judul Buku",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[320px]">
        <span
          className="font-bold text-sm leading-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-2"
          title={row.original.judul_buku}
        >
          {row.original.judul_buku}
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-1.5 py-0 h-4 text-[9px] font-black border-indigo-500/20 bg-indigo-500/5 text-indigo-600"
          >
            {row.original.kategori_buku}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {row.original.keterangan || "-"}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "penulis",
    header: "Penulis",
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
              & {anggota.length - 1} penulis lainnya
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "penerbit_isbn",
    header: "Penerbit & ISBN",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
          <MapPin className="size-3" />
          <span className="truncate max-w-[150px]">
            {row.original.penerbit}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Hash className="size-3 text-indigo-500" />
          <span className="text-[11px] font-black text-foreground/80">
            {row.original.ISBN || "-"}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "scope",
    header: "Scope & Level",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Globe className="size-3.5 text-indigo-500" />
          <span className="text-xs font-bold text-foreground">
            {row.original.scope}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="size-3.5 text-amber-500" />
          <Badge
            variant="secondary"
            className="text-[9px] font-black uppercase tracking-widest px-2 py-0 h-4 bg-amber-500/10 text-amber-600 border-amber-500/20"
          >
            {row.original.posisi === "1"
              ? "UTAMA"
              : `ANGGOTA (${row.original.posisi})`}
          </Badge>
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
