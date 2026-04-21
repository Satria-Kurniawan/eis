import { Badge } from "@/components/ui/badge";
import { type MahasiswaHistoryData } from "@/services/kemahasiswaan/mahasiswa";
import { type ColumnDef } from "@tanstack/react-table";
import { Building2, Calendar, Mail, User, UserCheck } from "lucide-react";

export const columns: ColumnDef<MahasiswaHistoryData>[] = [
  {
    accessorKey: "mhs",
    header: "Mahasiswa",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm shrink-0">
            <User className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-black leading-tight uppercase line-clamp-1 italic">
              {data.nama}
            </span>
            <div className="flex items-center gap-2">
              <code className="text-[10px] font-black tracking-widest text-muted-foreground bg-muted px-1.5 py-0.5 rounded border">
                {data.nim}
              </code>
              <Badge
                variant="outline"
                className="text-[8px] font-black uppercase tracking-tighter px-1 px-1 py-0 border-blue-500/20 bg-blue-500/5 text-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.1)]"
              >
                Student
              </Badge>
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
      const data = row.original;
      return (
        <div className="flex flex-col gap-1.5 min-w-[250px]">
          <div className="flex items-center gap-2">
            <Building2 className="size-3 text-primary/60" />
            <span className="text-[10px] font-black uppercase tracking-tight text-foreground/80 line-clamp-1">
              {data.fakultas}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 rounded-full bg-primary/20" />
            <span className="text-[9px] font-bold text-muted-foreground italic leading-tight">
              {data.prodi}
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
      const isActive = status.toLowerCase() === "aktif";
      return (
        <div className="flex flex-col items-center gap-1.5">
          <Badge
            className={`px-3 py-0.5 rounded-full font-black text-[9px] uppercase tracking-[0.15em] ${
              isActive
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                : "bg-red-500/10 text-red-600 border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.1)]"
            }`}
          >
            {status}
          </Badge>
          <span className="text-[8px] font-bold text-muted-foreground opacity-50 flex items-center gap-1 uppercase tracking-widest italic">
            <Calendar className="size-2 text-primary/40" />
            {row.original.periode}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "angkatan",
    header: "Angkatan",
    cell: ({ row }) => (
      <div className="flex flex-col items-center gap-1">
        <div className="text-xs font-black text-foreground tabular-nums">
          {row.original.tahun_masuk}
        </div>
        <div className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest italic leading-none">
          Cohort
        </div>
      </div>
    ),
  },
  {
    accessorKey: "kontak",
    header: "Kontak & PA",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-1.5 min-w-[200px]">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="size-4 h-4 rounded-md bg-muted flex items-center justify-center">
              <Mail className="size-2.5 text-muted-foreground" />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors italic truncate max-w-[160px]">
              {data.email_sso}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 h-4 rounded-md bg-muted flex items-center justify-center">
              <UserCheck className="size-2.5 text-emerald-500" />
            </div>
            <span className="text-[9px] font-black uppercase text-foreground/70 tracking-tight line-clamp-1">
              PA: {data.nama_pa}
            </span>
          </div>
        </div>
      );
    },
  },
];
