import { Button } from "@/components/ui/button";
import { type KritikSaran } from "@/services/akademik/kritikSaran";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye, GraduationCap, MessageCircle, User } from "lucide-react";

export const createColumns = (
  onViewDetails: (item: KritikSaran) => void,
): ColumnDef<KritikSaran>[] => [
  {
    accessorKey: "nama",
    header: "Dosen Pengampu",
    cell: ({ row }) => {
      const { nama, nip } = row.original;
      return (
        <div className="flex flex-col gap-0.5 max-w-[300px]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/5 text-primary">
              <User className="size-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
              {nip}
            </span>
          </div>
          <span className="font-bold text-sm leading-tight text-foreground/90">
            {nama}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit / Prodi",
    cell: ({ row }) => {
      const { unit } = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <span>{unit.fakultas}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-600">
              <GraduationCap className="size-2.5" />
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 truncate max-w-[200px]">
              {unit.prodi}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "saran",
    header: "Summary",
    cell: ({ row }) => {
      const saranCount = row.original.saran.length;
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm">
            <MessageCircle className="size-3.5 text-primary" />
            <span className="text-xs font-black text-primary">
              {saranCount} Masukan
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-4 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all gap-2 group border border-transparent hover:border-primary/20"
          onClick={() => onViewDetails(row.original)}
        >
          <Eye className="size-4 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs">Detail Saran</span>
        </Button>
      </div>
    ),
  },
];
