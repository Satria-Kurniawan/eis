import { Badge } from "@/components/ui/badge";
import { type RealisasiUnit } from "@/services/keuangan/realisasi-unit";
import { type ColumnDef } from "@tanstack/react-table";
import { Activity, Building2, Coins, TrendingUp } from "lucide-react";

export const columns: ColumnDef<RealisasiUnit>[] = [
  {
    accessorKey: "nama_unit",
    header: "Unit Kerja",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 max-w-[300px]">
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-indigo-500 shrink-0" />
          <span className="font-bold text-sm leading-tight text-foreground/90 uppercase tracking-tighter">
            {row.original.nama_unit}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pl-6">
          <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            ID: {row.original.id} • KODE: {row.original.kode_unit}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "pagu",
    header: "Total Pagu",
    cell: ({ row }) => {
      const totalPagu =
        Number(row.original.pagu_pnbp) +
        Number(row.original.pagu_rm) +
        Number(row.original.pagu_rm_boptn);
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Coins className="size-3.5 text-amber-500 shrink-0" />
            <span className="text-xs font-bold text-foreground leading-tight">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(totalPagu)}
            </span>
          </div>
          <div className="flex gap-2 pl-5">
            {Number(row.original.pagu_pnbp) > 0 && (
              <span className="text-[9px] font-bold text-muted-foreground/60">
                PNBP:{" "}
                {new Intl.NumberFormat("id-ID", { notation: "compact" }).format(
                  Number(row.original.pagu_pnbp),
                )}
              </span>
            )}
            {Number(row.original.pagu_rm) > 0 && (
              <span className="text-[9px] font-bold text-muted-foreground/60">
                RM:{" "}
                {new Intl.NumberFormat("id-ID", { notation: "compact" }).format(
                  Number(row.original.pagu_rm),
                )}
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "realisasi",
    header: "Total Realisasi",
    cell: ({ row }) => {
      const totalRealisasi =
        Number(row.original.realisasi_pnbp) +
        Number(row.original.realisasi_rm) +
        Number(row.original.realisasi_rm_boptn);
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="size-3.5 text-emerald-500 shrink-0" />
            <span className="text-xs font-bold text-emerald-600 leading-tight">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(totalRealisasi)}
            </span>
          </div>
          <div className="flex gap-2 pl-5">
            <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600/60 uppercase">
              <Activity className="size-2.5" />
              Synced
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "percentage",
    header: "% Serapan",
    cell: ({ row }) => {
      const totalPagu =
        Number(row.original.pagu_pnbp) +
        Number(row.original.pagu_rm) +
        Number(row.original.pagu_rm_boptn);
      const totalRealisasi =
        Number(row.original.realisasi_pnbp) +
        Number(row.original.realisasi_rm) +
        Number(row.original.realisasi_rm_boptn);
      const percentage = totalPagu > 0 ? (totalRealisasi / totalPagu) * 100 : 0;

      return (
        <div className="flex items-center gap-3">
          <div className="relative size-10 flex items-center justify-center">
            <svg className="size-10 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-muted/20"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={100}
                strokeDashoffset={100 - percentage}
                className={
                  percentage > 90
                    ? "text-emerald-500"
                    : percentage > 50
                      ? "text-amber-500"
                      : "text-rose-500"
                }
              />
            </svg>
            <span className="absolute text-[8px] font-black">
              {Math.round(percentage)}%
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <Badge
              className={
                percentage > 90
                  ? "bg-emerald-500/10 text-emerald-600"
                  : percentage > 50
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-rose-500/10 text-rose-600" +
                      " border-none text-[8px] font-black h-4"
              }
            >
              {percentage > 90
                ? "OPTIMAL"
                : percentage > 50
                  ? "MODERATE"
                  : "LOW"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tahun_anggaran",
    header: "Tahun",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="font-black text-[10px] bg-muted/50 border-primary/10"
      >
        FY {row.original.tahun_anggaran}
      </Badge>
    ),
  },
];
