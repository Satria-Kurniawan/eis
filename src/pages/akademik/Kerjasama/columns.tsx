import { Badge } from "@/components/ui/badge";
import { type KerjasamaData } from "@/services/akademik/kerjasama";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  Globe2,
  MapPin,
  XCircle,
} from "lucide-react";

export const columns: ColumnDef<KerjasamaData>[] = [
  {
    accessorKey: "partner",
    header: "Partner & Asal",
    cell: ({ row }) => {
      const data = row.original;
      const isForeign = data.jns_asalmitra_nama.toLowerCase().includes("luar");

      return (
        <div className="flex flex-col gap-1.5 min-w-[220px]">
          <div className="flex items-center gap-2">
            <Building2 className="size-3.5 text-primary" />
            <span className="text-sm font-bold leading-tight line-clamp-1">
              {data.partner_nama}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-[9px] px-2 py-0 font-black uppercase tracking-tighter ${
                isForeign
                  ? "border-blue-500/20 bg-blue-500/5 text-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.1)]"
                  : "border-indigo-500/20 bg-indigo-500/5 text-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.1)]"
              }`}
            >
              {isForeign ? (
                <Globe2 className="size-2 mr-1 inline" />
              ) : (
                <MapPin className="size-2 mr-1 inline" />
              )}
              {data.jns_asalmitra_nama}
            </Badge>
            <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest italic opacity-70">
              {data.negara_nama}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "bentuk",
    header: "Bentuk Kerjasama",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-1 max-w-[300px]">
          <span className="text-[11px] font-bold leading-relaxed line-clamp-2">
            {data.bntkrjsma_nama}
          </span>
          <p className="text-[9px] text-muted-foreground line-clamp-1 italic px-2 py-0.5 rounded bg-muted/30 border-l border-primary/20">
            {data.deskripsi_singkat?.replace(/&nbsp;/g, " ")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "pelaksana",
    header: "Unit Pelaksana",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col gap-0.5 min-w-[150px]">
          <span className="text-[10px] font-black uppercase leading-tight line-clamp-1">
            {data.uk_pelaksana || data.uk_kerjasama}
          </span>
          <span className="text-[9px] font-medium text-muted-foreground italic">
            {data.unit.fakultas}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.stskrjsma_nama;
      const isActive = status.toLowerCase().includes("aktif");

      return (
        <div className="flex flex-col items-center gap-1">
          <Badge
            className={`px-3 py-0.5 rounded-full font-black text-[9px] uppercase tracking-[0.15em] ${
              isActive
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-red-500/10 text-red-600 border-red-500/20"
            }`}
          >
            {status}
          </Badge>
          <div className="text-[8px] font-bold text-muted-foreground opacity-50 flex items-center gap-1">
            {isActive ? (
              <CheckCircle2 className="size-2 text-emerald-500" />
            ) : (
              <XCircle className="size-2 text-red-500" />
            )}
            Verified
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "periode",
    header: "Masa Berlaku",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col items-end text-right px-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground">
            <Calendar className="size-2.5 text-primary/60" />
            <span>{data.tanggal_awal}</span>
          </div>
          <div className="text-[9px] font-medium text-muted-foreground mr-4">
            s/d {data.tanggal_akhir}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Dokumen",
    cell: ({ row }) => {
      const url = row.original.dokumen_url;
      if (!url)
        return (
          <span className="text-[10px] text-muted-foreground italic">NA</span>
        );

      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all group border border-primary/10 shadow-sm"
        >
          <Download className="size-3 transition-transform group-hover:translate-y-0.5" />
          <span className="text-[10px] font-black uppercase tracking-tight">
            PDF
          </span>
        </a>
      );
    },
  },
];
