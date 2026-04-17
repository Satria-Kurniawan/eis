import { Badge } from "@/components/ui/badge";
import { type AgendaMengajar } from "@/services/akademik/agendaMengajar";
import { type ColumnDef } from "@tanstack/react-table";
import { User, Book, Hash, Layers } from "lucide-react";

export const columns: ColumnDef<AgendaMengajar>[] = [
  {
    accessorKey: "matakuliah",
    header: () => (
      <div className="flex items-center gap-2">
        <Book className="size-4 text-primary" />
        <span>Mata Kuliah</span>
      </div>
    ),
    cell: ({ row }) => {
      const { matakuliah, kode } = row.original;
      return (
        <div className="flex flex-col gap-1 py-1">
          <span className="font-semibold text-sm leading-tight text-foreground hover:text-primary transition-colors cursor-default">
            {matakuliah}
          </span>
          <div className="flex items-center gap-1.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
            <Badge
              variant="secondary"
              className="px-1.5 h-4 text-[10px] font-mono tracking-wider"
            >
              {kode}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dosen",
    header: () => (
      <div className="flex items-center gap-2">
        <User className="size-4 text-primary" />
        <span>Dosen Pengampu</span>
      </div>
    ),
    cell: ({ row }) => {
      const dosenList = row.original.dosen;
      return (
        <div className="flex flex-col gap-1.5 py-1">
          {dosenList.map((d, i) => (
            <div key={i} className="flex items-center gap-2 group/dosen">
              <div className="size-1.5 rounded-full bg-primary/40 group-hover/dosen:bg-primary transition-colors mt-0.5" />
              <span
                className="text-sm text-muted-foreground group-hover/dosen:text-foreground transition-colors truncate max-w-[220px]"
                title={d}
              >
                {d}
              </span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "id_kelas",
    header: () => (
      <div className="flex items-center gap-2">
        <Layers className="size-4 text-primary" />
        <span>Kelas</span>
      </div>
    ),
    cell: ({ row }) => {
      const jenis = row.original.jenis_kelas;
      return (
        <div className="flex flex-col items-start gap-1">
          <Badge
            variant="outline"
            className="font-bold border-primary/20 bg-primary/5 text-primary"
          >
            {row.getValue("id_kelas")}
          </Badge>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">
            {jenis}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "pertemuan",
    header: () => (
      <div className="flex items-center gap-2">
        <Hash className="size-4 text-primary" />
        <span>Pert.</span>
      </div>
    ),
    cell: ({ row }) => {
      const p = parseInt(row.getValue("pertemuan") as string);
      return (
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center justify-center size-8 rounded-full border text-xs font-bold transition-all
              ${p > 0 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" : "bg-muted border-muted-foreground/20 text-muted-foreground"}`}
          >
            {p}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "unit.prodi",
    header: "Program Studi",
    cell: ({ row }) => (
      <div className="max-w-[180px] py-1">
        <span className="text-xs text-muted-foreground leading-relaxed block italic">
          {row.original.unit.prodi}
        </span>
        <span className="text-[10px] text-muted-foreground/50 block mt-0.5">
          {row.original.unit.fakultas}
        </span>
      </div>
    ),
  },
];
