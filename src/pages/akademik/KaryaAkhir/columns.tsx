import { Badge } from "@/components/ui/badge";
import { type KaryaAkhirData } from "@/services/akademik/karya-akhir";
import { type ColumnDef } from "@tanstack/react-table";
import { Clock, FileText, User } from "lucide-react";

export const columns: ColumnDef<KaryaAkhirData>[] = [
  {
    accessorKey: "mahasiswa",
    header: "Mahasiswa",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-0.5 min-w-[180px]">
          <span className="text-sm font-bold leading-tight line-clamp-1">
            {data.nama_lengkap || "Nama Tidak Tersedia"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none">
              {data.nim || "NIM -"}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-muted font-bold text-muted-foreground leading-none">
              {data.tahun_masuk}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "judul",
    header: "Judul Karya Akhir",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-1.5 max-w-[400px]">
          <p className="text-[11px] font-bold leading-relaxed line-clamp-2 italic text-foreground/90">
            "{data.judul}"
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-primary/5 border border-primary/10">
              <FileText className="size-3 text-primary" />
              <span className="text-[9px] font-black uppercase tracking-tighter text-primary">
                {data.main_stage}
              </span>
            </div>
            <span className="text-[9px] font-medium text-muted-foreground truncate">
              {data.status_judul}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "pembimbing",
    header: "Pembimbing",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            <User className="size-3 text-muted-foreground" />
            <span className="text-[11px] font-bold leading-tight line-clamp-1">
              {data.nama_pa || "Belum Ditentukan"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge
              variant="secondary"
              className="text-[9px] py-0 px-2 font-bold bg-secondary/40"
            >
              PA / Utama
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status Hub",
    cell: ({ row }) => {
      const state = row.original.current_state;
      const isFinishing =
        state.toLowerCase().includes("selesai") ||
        state.toLowerCase().includes("lulus");

      return (
        <div className="flex flex-col items-center gap-1">
          <Badge
            className={`px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest ${
              isFinishing
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                : "bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.1)]"
            }`}
          >
            {state}
          </Badge>
          <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground animate-pulse">
            <Clock className="size-2.5" />
            Live Sync
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Prodi",
    cell: ({ row }) => {
      const unit = row.original.unit;
      return (
        <div className="flex flex-col gap-0.5 text-right">
          <span className="text-[10px] font-black uppercase leading-tight line-clamp-1 italic">
            {unit.prodi}
          </span>
          <span className="text-[9px] font-medium text-muted-foreground line-clamp-1">
            {unit.fakultas}
          </span>
        </div>
      );
    },
  },
];
