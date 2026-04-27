import { Badge } from "@/components/ui/badge";
import { type Penelitian } from "@/services/kinerja/penelitian";
import { type ColumnDef } from "@tanstack/react-table";
import { Building2, Calendar, Coins, Eye, Sparkles, Users } from "lucide-react";

export const createColumns = (
  onViewDetail: (data: Penelitian) => void,
): ColumnDef<Penelitian>[] => [
  {
    accessorKey: "judul_tulisan",
    header: "Judul Penelitian",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[400px]">
        <span
          className="font-bold text-sm leading-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-2"
          title={row.original.judul_tulisan}
        >
          {row.original.judul_tulisan}
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-1.5 py-0 h-4 text-[9px] font-black border-indigo-500/20 bg-indigo-500/5 text-indigo-600 truncate max-w-[150px]"
          >
            {row.original.skim}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {row.original.skema}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "sumber_dana",
    header: "Pendanaan",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[200px]">
        <div className="flex items-center gap-1.5">
          <Coins className="size-3.5 text-amber-500 shrink-0" />
          <span className="text-xs font-bold text-foreground leading-tight">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(Number(row.original.dana))}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pl-5">
          <span className="text-[10px] font-medium text-muted-foreground truncate uppercase tracking-widest">
            {row.original.sumber_dana}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "waktu",
    header: "Pelaksanaan",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3 text-indigo-500" />
          <span className="text-[11px] font-black text-foreground/80">
            {row.original.tahun_awal}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3 text-indigo-500" />
          <span className="text-[10px] font-bold text-muted-foreground">
            {row.original.waktu_pelaksanaan}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "anggota",
    header: "Peneliti",
    cell: ({ row }) => {
      let anggota = [];
      try {
        if (typeof row.original.anggota_penelitian === "string") {
          anggota = JSON.parse(row.original.anggota_penelitian);
        } else if (Array.isArray(row.original.anggota_penelitian)) {
          anggota = row.original.anggota_penelitian;
        }
      } catch (e) {
        anggota = [];
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
              & {anggota.length - 1} peneliti lainnya
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit Kerja",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
          <Building2 className="size-3" />
          <span className="truncate max-w-[150px]">
            {row.original.unit?.fakultas}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-black text-foreground/80 truncate max-w-[150px]">
            {row.original.unit?.prodi}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <button
        onClick={() => onViewDetail(row.original)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-all font-bold text-[10px] uppercase tracking-widest"
      >
        <Eye className="size-3" />
        Detail
      </button>
    ),
  },
];
