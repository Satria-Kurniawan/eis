import { type ColumnDef } from "@tanstack/react-table";
import { type PenawaranData } from "@/services/akademik/penawaran";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<PenawaranData>[] = [
  {
    accessorKey: "matakuliah",
    header: "Mata Kuliah",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-0.5 max-w-[300px]">
          <span className="text-sm font-bold leading-tight line-clamp-2">
            {data.nama_matakuliah}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            {data.kode_matakuliah}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "kurikulum",
    header: "Kurikulum",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-bold border-primary/20 text-primary bg-primary/5 rounded-lg px-3">
        {row.getValue("kurikulum")}
      </Badge>
    ),
  },
  {
    accessorKey: "kelas",
    header: "Kelas",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-foreground text-background flex items-center justify-center font-black text-xs shadow-lg">
            {data.nama_kelas}
          </div>
          <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">
            Smtr {data.semester}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "pengampu",
    header: "Pengampu",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-bold leading-tight line-clamp-1">
            {data.nama_pengampu || "Belum Ditentukan"}
          </span>
          {data.nip_pengampu && (
            <span className="text-[9px] font-medium text-muted-foreground">
              NIP. {data.nip_pengampu}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "jml_mhs_ambil",
    header: "Mhs",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-xs border border-primary/10">
          {row.getValue("jml_mhs_ambil")}
        </div>
      </div>
    ),
  },
];
