import { Badge } from "@/components/ui/badge";
import { type RealisasiBulan } from "@/services/keuangan/realisasi-bulan";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  CalendarDays,
  Coins,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const columns: ColumnDef<RealisasiBulan>[] = [
  {
    accessorKey: "bulan",
    header: "Bulan Anggaran",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/5">
          <CalendarDays className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-sm uppercase tracking-tighter text-foreground">
            {row.original.bulan}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            FY {row.original.tahun_anggaran}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "realisasi_total",
    header: "Total Realisasi",
    cell: ({ row }) => {
      const total =
        Number(row.original.realisasi_total_pnbp) +
        Number(row.original.realisasi_total_rm) +
        Number(row.original.realisasi_total_rm_boptn);
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Coins className="size-3.5 text-amber-500 shrink-0" />
            <span className="text-sm font-bold text-foreground">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(total)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 pl-5">
            <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600/60 uppercase">
              <Activity className="size-2.5" />
              Aggregated
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "realisasi_pnbp",
    header: "PNBP",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="size-3 text-indigo-500" />
          <span className="text-xs font-semibold text-foreground/80">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(Number(row.original.realisasi_total_pnbp))}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "realisasi_rm",
    header: "Rupiah Murni (RM)",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3 text-purple-500" />
          <span className="text-xs font-semibold text-foreground/80">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(Number(row.original.realisasi_total_rm))}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "growth",
    header: "Status",
    cell: ({ row }) => {
      const hasRealisasi =
        Number(row.original.realisasi_total_pnbp) +
          Number(row.original.realisasi_total_rm) >
        0;
      return (
        <Badge
          variant={hasRealisasi ? "default" : "secondary"}
          className={`font-black text-[9px] uppercase tracking-widest ${hasRealisasi ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground opacity-50"}`}
        >
          {hasRealisasi ? "REPORTED" : "PENDING"}
        </Badge>
      );
    },
  },
];
