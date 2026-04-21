import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type Tracer } from "@/services/alumni/tracer";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Briefcase,
  Building2,
  Calendar,
  Mail,
  Phone,
  User,
} from "lucide-react";

export const columns: ColumnDef<Tracer>[] = [
  {
    accessorKey: "nama_mahasiswa",
    header: "Alumni",
    cell: ({ row }) => {
      const { nama_mahasiswa, nim_mahasiswa, email_mahasiswa, no_telp } =
        row.original;
      return (
        <div className="flex flex-col gap-1.5 max-w-[300px]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shadow-sm">
              <User className="size-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary/70">
              {nim_mahasiswa}
            </span>
          </div>
          <span className="font-bold text-sm leading-tight text-foreground/90">
            {nama_mahasiswa}
          </span>
          <div className="flex items-center gap-3 opacity-60">
            {email_mahasiswa && (
              <div className="flex items-center gap-1 group/item">
                <Mail className="size-2.5 text-muted-foreground group-hover/item:text-primary transition-colors" />
                <span className="text-[9px] font-medium truncate max-w-[120px]">
                  {email_mahasiswa}
                </span>
              </div>
            )}
            {no_telp && (
              <div className="flex items-center gap-1 group/item">
                <Phone className="size-2.5 text-muted-foreground group-hover/item:text-primary transition-colors" />
                <span className="text-[9px] font-medium">{no_telp}</span>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Prodi",
    cell: ({ row }) => {
      const { unit, jenjang } = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
            <Building2 className="size-3" />
            <span className="truncate max-w-[180px]">{unit.fakultas}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="px-1.5 py-0 h-4 text-[9px] font-black border-primary/20 bg-primary/5 text-primary rounded-md"
            >
              {jenjang}
            </Badge>
            <span className="text-[11px] font-black text-foreground/80 truncate max-w-[200px]">
              {unit.prodi}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "persentase_pengisian",
    header: "Progress Tracer",
    cell: ({ row }) => {
      const { persentase_pengisian, status_pengisian } = row.original;
      const isComplete =
        status_pengisian === "1" || persentase_pengisian === 100;

      return (
        <div className="flex flex-col gap-2 min-w-[140px]">
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-black uppercase tracking-tighter ${isComplete ? "text-emerald-500" : "text-amber-500"}`}
            >
              {isComplete ? "Completed" : "In Progress"}
            </span>
            <span className="text-[10px] font-black text-foreground">
              {persentase_pengisian}%
            </span>
          </div>
          <Progress
            value={persentase_pengisian}
            className={`h-1.5 rounded-full bg-muted shadow-inner ${isComplete ? "[&>div]:bg-emerald-500" : "[&>div]:bg-amber-500"}`}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "status_saat_ini",
    header: "Status Alumni",
    cell: ({ row }) => {
      const {
        status_saat_ini,
        nama_perusahaan,
        perguruan_tinggi_studi_lanjut,
      } = row.original;

      const instansi = nama_perusahaan || perguruan_tinggi_studi_lanjut;

      return (
        <div className="flex flex-col gap-1">
          {status_saat_ini ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-primary" />
                <span className="text-xs font-bold text-foreground capitalize">
                  {status_saat_ini.toLowerCase()}
                </span>
              </div>
              {instansi && (
                <div className="flex items-center gap-1.5 ml-3.5">
                  <Briefcase className="size-2.5 text-muted-foreground" />
                  <span className="text-[10px] font-medium text-muted-foreground italic truncate max-w-[180px]">
                    {instansi}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 italic">
              Belum Mengisi
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "tahun_wisuda",
    header: "Wisuda",
    cell: ({ row }) => {
      const { tahun_wisuda, bulan_wisuda } = row.original;
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/40 border border-primary/5 shadow-sm w-fit">
          <Calendar className="size-3 text-primary" />
          <span className="text-[10px] font-black text-foreground uppercase tracking-wider">
            {bulan_wisuda}/{tahun_wisuda}
          </span>
        </div>
      );
    },
  },
];
