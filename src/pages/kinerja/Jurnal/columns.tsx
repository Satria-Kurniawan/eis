import { Badge } from "@/components/ui/badge";
import { type Jurnal } from "@/services/kinerja/jurnal";
import { type ColumnDef } from "@tanstack/react-table";
import {
  BookOpen,
  Building2,
  ExternalLink,
  Globe,
  Hash,
  School,
  Users,
} from "lucide-react";

export const createColumns = (
  onViewDetail: (jurnal: Jurnal) => void,
): ColumnDef<Jurnal>[] => [
  {
    accessorKey: "judul_artikel",
    header: "Judul Artikel",
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
            {row.original.jenis_jurnal}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {row.original.scope}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "nama_jurnal",
    header: "Jurnal & Penerbit",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[250px]">
        <div className="flex items-center gap-1.5">
          <BookOpen className="size-3.5 text-indigo-500 shrink-0" />
          <span className="text-xs font-bold text-foreground leading-tight line-clamp-1">
            {row.original.nama_jurnal}
          </span>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground truncate pl-5">
          {row.original.penerbit}
        </span>
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
          <span className="text-[11px] font-black text-foreground/80 lowercase">
            {row.original.E_ISSN || row.original.P_ISSN || "-"}
          </span>
        </div>
        {row.original.DOI && (
          <a
            href={`https://doi.org/${row.original.DOI}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-indigo-600 hover:underline"
          >
            <Globe className="size-3" />
            <span className="text-[10px] font-bold truncate max-w-[120px]">
              {row.original.DOI}
            </span>
          </a>
        )}
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
