import { Badge } from "@/components/ui/badge";
import { type EvaluasiDosen } from "@/services/akademik/evaluasiDosen";
import { type ColumnDef } from "@tanstack/react-table";
import { User, Book, Star, ChevronRight, BarChart3 } from "lucide-react";
import { getOverallSatisfaction, getStatusFromScore } from "@/lib/evaluasi-utils";
import { Button } from "@/components/ui/button";

export const createColumns = (onDetail: (data: EvaluasiDosen) => void): ColumnDef<EvaluasiDosen>[] => [
  {
    accessorKey: "nama_lengkap",
    header: () => (
      <div className="flex items-center gap-2">
        <User className="size-4 text-primary" />
        <span>Nama Dosen</span>
      </div>
    ),
    cell: ({ row }) => {
      const { nama_lengkap, nip } = row.original;
      return (
        <div className="flex flex-col gap-1 py-1">
          <span className="font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
            {nama_lengkap}
          </span>
          <span className="text-[10px] font-mono opacity-50 font-bold">NIP: {nip}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "nama_matakuliah",
    header: () => (
      <div className="flex items-center gap-2">
        <Book className="size-4 text-primary" />
        <span>Mata Kuliah</span>
      </div>
    ),
    cell: ({ row }) => {
      const { nama_matakuliah, nama_kelas, kode_matakuliah } = row.original;
      return (
        <div className="flex flex-col gap-1 py-1">
          <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[200px]" title={nama_matakuliah}>
            {nama_matakuliah}
          </span>
          <div className="flex items-center gap-2">
             <Badge variant="outline" className="px-1.5 h-4 text-[10px] font-bold border-primary/20 text-primary">
              {kode_matakuliah}
            </Badge>
            <span className="text-[10px] font-black uppercase text-muted-foreground/40">
              Kelas {nama_kelas}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "satisfaction",
    header: () => (
      <div className="flex items-center gap-2">
        <Star className="size-4 text-primary" />
        <span>Indeks Kepuasan</span>
      </div>
    ),
    cell: ({ row }) => {
      const score = getOverallSatisfaction(row.original);
      const status = getStatusFromScore(score);
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <span className={`text-lg font-black text-${status.color}-600 dark:text-${status.color}-400`}>
              {score}%
            </span>
            <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60 leading-none">
              {status.label}
            </span>
          </div>
          {/* Sparkline simulation */}
          <div className="flex items-end gap-0.5 h-6">
            {[40, 70, 55, 90, 80].map((h, i) => (
              <div 
                key={i} 
                className={`w-1 rounded-full bg-${status.color}-500/20`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDetail(row.original)}
          className="h-9 px-4 rounded-xl border-primary/10 hover:bg-primary hover:text-primary-foreground group/btn transition-all shadow-sm"
        >
          <BarChart3 className="size-4 mr-2" />
          <span className="font-bold text-xs">Detail Metrik</span>
          <ChevronRight className="size-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      );
    },
  },
];
