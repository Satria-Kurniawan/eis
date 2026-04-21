import { type ColumnDef } from "@tanstack/react-table";
import { type Pegawai } from "@/services/kepegawaian/pegawai";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  TrendingUp,
  School,
  IdCard
} from "lucide-react";

export const columns: ColumnDef<Pegawai>[] = [
  {
    accessorKey: "no_induk_undiksha",
    header: "ID / NIP",
    cell: ({ row }) => {
      const { no_induk_undiksha, nip } = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600">
              <IdCard className="size-3.5" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700/70 dark:text-emerald-400">
              {no_induk_undiksha}
            </span>
          </div>
          <div className="flex items-center gap-1.5 ml-0.5 opacity-50">
             <span className="text-[9px] font-medium tracking-wider">NIP: {nip}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "nama",
    header: "Nama Pegawai",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-bold text-sm leading-tight text-foreground/90">
          {row.original.nama}
        </span>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="px-1.5 py-0 h-4 text-[9px] font-black border-emerald-500/20 bg-emerald-500/5 text-emerald-600">
            {row.original.last_strata || "N/A"}
          </Badge>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit / Satuan Kerja",
    cell: ({ row }) => {
      const { fakultas, jurusan, prodi } = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
            <Building2 className="size-3" />
            <span className="truncate max-w-[200px]">{fakultas}</span>
          </div>
          {(jurusan || prodi) && (
            <div className="flex items-center gap-1.5 ml-1">
              <div className="size-1.5 rounded-full bg-emerald-500/30" />
              <span className="text-[10px] font-medium text-muted-foreground italic truncate max-w-[180px]">
                {prodi || jurusan}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status_pegawai",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-emerald-500" />
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
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 shadow-sm w-fit">
        <TrendingUp className="size-3.5 text-emerald-500" />
        <span className="text-[10px] font-black text-foreground uppercase tracking-[0.1em]">
          {row.original.tahun}
        </span>
      </div>
    ),
  },
];
