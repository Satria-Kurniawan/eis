import { type ColumnDef } from "@tanstack/react-table";
import { type KhsLog } from "@/services/akademik/khs";

export const columns: ColumnDef<KhsLog>[] = [
  {
    accessorKey: "mhs",
    header: "Mahasiswa",
    cell: ({ row }) => {
      const log = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden bg-muted border border-border shadow-inner">
            <img
              src={log.foto}
              alt={log.nama_mhs}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(log.nama_mhs) +
                  "&background=random";
              }}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold leading-none tracking-tight">
              {log.nama_mhs}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              {log.nim}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Program Studi",
    cell: ({ row }) => {
      const unit = row.original.unit;
      return (
        <div className="flex flex-col gap-0.5 max-w-[250px]">
          <span className="text-[11px] font-bold leading-tight line-clamp-1">
            {unit.prodi}
          </span>
          <span className="text-[9px] font-medium text-muted-foreground line-clamp-1">
            {unit.fakultas}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "period",
    header: "Periode",
    cell: ({ row }) => {
      const log = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-xs font-bold">{log.tahun}</span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
            Sem. {log.semester === "1" ? "Ganjil" : "Genap"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dilihat",
    header: "Waktu Akses",
    cell: ({ row }) => {
      const dateStr = row.getValue("dilihat") as string;
      const date = new Date(dateStr);
      return (
        <div className="flex flex-col items-end text-right px-2">
          <span className="text-xs font-black tabular-nums">
            {new Intl.DateTimeFormat("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(date)}
          </span>
          <span className="text-[10px] text-muted-foreground font-bold tabular-nums">
            {new Intl.DateTimeFormat("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }).format(date)}{" "}
            WITA
          </span>
        </div>
      );
    },
  },
];
