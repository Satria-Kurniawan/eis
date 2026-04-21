import { Badge } from "@/components/ui/badge";
import { type Dosen } from "@/services/kepegawaian/dosen";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  School,
  ShieldCheck,
  TrendingUp,
  User,
  UserCheck,
} from "lucide-react";

export const columns: ColumnDef<Dosen>[] = [
  {
    accessorKey: "no_induk_undiksha",
    header: "No. Induk / NIP",
    cell: ({ row }) => {
      const id = row.original.no_induk_undiksha;
      return (
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600">
            <User className="size-3.5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-indigo-700/70 dark:text-indigo-400">
            {id}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "nama",
    header: "Nama Dosen",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-bold text-sm leading-tight text-foreground/90">
          {row.original.nama}
        </span>
        <div className="flex items-center gap-1.5">
          <Badge
            variant="outline"
            className="px-1.5 py-0 h-4 text-[9px] font-black border-indigo-500/20 bg-indigo-500/5 text-indigo-600"
          >
            {row.original.strata}
          </Badge>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {row.original.jabatan_fungsional}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit / Homebase",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
          <Building2 className="size-3" />
          <span className="truncate max-w-[180px]">
            {row.original.fakultas}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-600">
            <School className="size-2.5" />
          </div>
          <span className="text-[11px] font-black text-foreground/80 truncate max-w-[200px]">
            {row.original.prodi}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status_pegawai",
    header: "Kepegawaian",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-indigo-500" />
          <span className="text-xs font-bold text-foreground">
            {row.original.status_pegawai}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <UserCheck className="size-3.5 text-emerald-500" />
          <Badge
            variant="secondary"
            className="text-[9px] font-black uppercase tracking-widest px-2 py-0 h-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
          >
            {row.original.status_keaktifan}
          </Badge>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "tahun",
    header: "Periode",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 shadow-sm w-fit">
        <TrendingUp className="size-3.5 text-indigo-500" />
        <span className="text-[10px] font-black text-foreground uppercase tracking-[0.1em]">
          Tahun {row.original.tahun}
        </span>
      </div>
    ),
  },
];
