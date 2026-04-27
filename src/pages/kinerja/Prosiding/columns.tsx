import { Badge } from "@/components/ui/badge";
import { type Prosiding } from "@/services/kinerja/prosiding";
import { type ColumnDef } from "@tanstack/react-table";
import { Building2, Calendar, Eye, Hash, School, Users } from "lucide-react";

export const createColumns = (
  onViewDetail: (data: Prosiding) => void,
): ColumnDef<Prosiding>[] => [
  {
    accessorKey: "judul_artikel",
    header: "Artikel & Seminar",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[400px]">
        <span
          className="font-bold text-sm leading-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-2"
          title={row.original.judul_artikel}
        >
          {row.original.judul_artikel}
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="px-1.5 py-0 h-4 text-[9px] font-black border-indigo-500/20 bg-indigo-500/5 text-indigo-600 truncate max-w-[150px]"
          >
            {row.original.nama_seminar}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {row.original.scope}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "penyelenggara",
    header: "Penyelenggara & Lokasi",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[250px]">
        <div className="flex items-center gap-1.5">
          <Building2 className="size-3.5 text-indigo-500 shrink-0" />
          <span className="text-xs font-bold text-foreground leading-tight line-clamp-1">
            {row.original.penyelenggara}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pl-5">
          <span className="text-[10px] font-medium text-muted-foreground truncate">
            {row.original.tempat_pelaksanaan}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "identitas",
    header: "Identitas",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <Hash className="size-3 text-indigo-500" />
          <span className="text-[11px] font-black text-foreground/80">
            {row.original.ISBN || row.original.P_ISSN || "-"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3 text-indigo-500" />
          <span className="text-[10px] font-bold text-muted-foreground">
            {row.original.tanggal}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "anggota",
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
              & {anggota.length - 1} penulis lainnya
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
