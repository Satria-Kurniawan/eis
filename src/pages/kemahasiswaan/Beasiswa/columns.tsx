import { Badge } from "@/components/ui/badge";
import { type BeasiswaData } from "@/services/kemahasiswaan/beasiswa";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  TrendingUp,
  User,
  XCircle,
} from "lucide-react";

export const columns: ColumnDef<BeasiswaData>[] = [
  {
    accessorKey: "mhs",
    header: "Mahasiswa",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="size-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20 shadow-sm shrink-0">
            <User className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-black leading-tight uppercase line-clamp-1 italic">
              {data.nama}
            </span>
            <code className="text-[10px] font-black tracking-widest text-muted-foreground bg-muted w-fit px-1.5 py-0.5 rounded border">
              {data.nim}
            </code>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "jenis_beasiswa",
    header: "Program Beasiswa",
    cell: ({ row }) => {
      const type = row.original.jenis_beasiswa;
      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            <Award className="size-3.5 text-primary" />
            <span className="text-[11px] font-black uppercase tracking-tight text-foreground leading-tight">
              {type}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-0.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="size-3 text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-600 tabular-nums">
                IPK: {row.original.ipk}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit Akademik",
    cell: ({ row }) => {
      const unit = row.original.unit;
      return (
        <div className="flex flex-col gap-1.5 min-w-[220px]">
          <div className="flex items-center gap-2">
            <Building2 className="size-3 text-primary/60" />
            <span className="text-[10px] font-black uppercase tracking-tight text-foreground/80 line-clamp-1">
              {unit.fakultas}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 rounded-full bg-primary/20" />
            <span className="text-[9px] font-bold text-muted-foreground italic leading-tight">
              {unit.prodi}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const isLolos = status.toLowerCase() === "lolos";
      return (
        <div className="flex flex-col items-center gap-1.5">
          <Badge
            className={`px-3 py-0.5 rounded-full font-black text-[9px] uppercase tracking-[0.15em] ${
              isLolos
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                : "bg-red-500/10 text-red-600 border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.1)]"
            }`}
          >
            <div className="flex items-center gap-1.5">
              {isLolos ? (
                <CheckCircle2 className="size-2.5" />
              ) : (
                <XCircle className="size-2.5" />
              )}
              {status}
            </div>
          </Badge>
          <span className="text-[8px] font-bold text-muted-foreground opacity-50 flex items-center gap-1 uppercase tracking-widest italic">
            <Calendar className="size-2 text-primary/40" />
            {row.original.periode}
          </span>
        </div>
      );
    },
  },
];
