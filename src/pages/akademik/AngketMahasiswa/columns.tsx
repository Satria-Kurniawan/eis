import { type ColumnDef } from "@tanstack/react-table";
import { type AngketMahasiswa } from "@/services/akademik/angketMahasiswa";
import { Badge } from "@/components/ui/badge";
import { User, Book, GraduationCap } from "lucide-react";

export const columns: ColumnDef<AngketMahasiswa>[] = [
  {
    accessorKey: "mk",
    header: "Mata Kuliah",
    cell: ({ row }) => {
      const { kode, mk } = row.original;
      return (
        <div className="flex flex-col gap-1 max-w-[300px]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/5 text-primary">
              <Book className="size-3" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
              {kode}
            </span>
          </div>
          <span className="font-bold text-sm leading-tight text-foreground/90">
            {mk}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dosen",
    header: "Dosen Pengampu",
    cell: ({ row }) => {
      const { dosen } = row.original;
      return (
        <div className="flex flex-wrap gap-1.5 max-w-[400px]">
          {dosen.map((name, idx) => {
            const cleanName = name.replace(/^,/, "").trim();
            if (!cleanName) return null;
            return (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-muted text-[10px] font-bold py-0.5 px-2 rounded-md flex items-center gap-1 border border-primary/5 shadow-xs"
              >
                <User className="size-2.5 opacity-40" />
                {cleanName}
              </Badge>
            );
          })}
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
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              {unit.prodi}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "id_kelas",
    header: "Kelas",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner">
          <span className="text-xs font-black text-primary">
            {row.getValue("id_kelas")}
          </span>
        </div>
      </div>
    ),
  },
];
