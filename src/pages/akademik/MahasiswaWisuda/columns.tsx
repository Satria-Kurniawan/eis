import { type ColumnDef } from "@tanstack/react-table";
import { type MahasiswaWisuda } from "@/services/akademik/mahasiswaWisuda";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Calendar, Building2 } from "lucide-react";

export const columns: ColumnDef<MahasiswaWisuda>[] = [
  {
    accessorKey: "nama_lengkap",
    header: "Mahasiswa",
    cell: ({ row }) => {
      const { nama_lengkap, nim } = row.original;
      return (
        <div className="flex flex-col gap-0.5 max-w-[300px]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/5 text-primary">
              <User className="size-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
              {nim}
            </span>
          </div>
          <span className="font-bold text-sm leading-tight text-foreground/90">
            {nama_lengkap}
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
            <Building2 className="size-2.5" />
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
    accessorKey: "nama_bulan",
    header: "Periode Wisuda",
    cell: ({ row }) => {
      const { nama_bulan, tahun_wisuda } = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm">
            <Calendar className="size-3.5 text-primary" />
            <span className="text-xs font-black text-foreground uppercase tracking-wider">
              {nama_bulan} {tahun_wisuda}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "status",
    header: () => <div className="text-center">Status</div>,
    cell: () => (
      <div className="flex justify-center">
        <Badge
          variant="secondary"
          className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
        >
          Alumni
        </Badge>
      </div>
    ),
  },
];
