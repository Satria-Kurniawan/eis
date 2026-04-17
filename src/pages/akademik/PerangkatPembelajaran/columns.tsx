import { Badge } from "@/components/ui/badge";
import { type PerangkatPembelajaran } from "@/services/akademik/perangkatPembelajaran";
import { type ColumnDef } from "@tanstack/react-table";
import { Book, User, Layers, FileText, CheckCircle2, XCircle } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

const DocumentLink = ({ url, label }: { url: string; label: string }) => {
  if (!url) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <XCircle className="size-5 text-muted-foreground/30" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{label} Belum Tersedia</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
          >
            <FileText className="size-4" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Lihat {label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const columns: ColumnDef<PerangkatPembelajaran>[] = [
  {
    accessorKey: "mk",
    header: () => (
      <div className="flex items-center gap-2">
        <Book className="size-4 text-primary" />
        <span>Mata Kuliah</span>
      </div>
    ),
    cell: ({ row }) => {
      const { mk, kode } = row.original;
      return (
        <div className="flex flex-col gap-1 py-1">
          <span className="font-semibold text-sm leading-tight text-foreground">
            {mk}
          </span>
          <Badge variant="secondary" className="w-fit h-4 text-[10px] font-mono opacity-70 group-hover:opacity-100 transition-opacity">
            {kode}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "dosen",
    header: () => (
      <div className="flex items-center gap-2">
        <User className="size-4 text-primary" />
        <span>Dosen</span>
      </div>
    ),
    cell: ({ row }) => {
      const dosenList = row.original.dosen;
      return (
        <div className="flex flex-col gap-1 py-1">
          {dosenList.map((d, i) => (
            <span key={i} className="text-sm text-muted-foreground truncate max-w-[200px]" title={d}>
              {d}
            </span>
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
    cell: ({ row }) => (
      <Badge variant="outline" className="font-bold border-primary/20 bg-primary/5 text-primary">
        {row.getValue("id_kelas")}
      </Badge>
    ),
  },
  {
    header: "Dokumen Perangkat",
    cell: ({ row }) => {
      const { kontrak, rps, rtm } = row.original;
      return (
        <div className="flex items-center gap-3">
          <DocumentLink url={kontrak} label="Kontrak" />
          <DocumentLink url={rps} label="RPS" />
          <DocumentLink url={rtm} label="RTM" />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { kontrak, rps, rtm } = row.original;
      const count = [kontrak, rps, rtm].filter(Boolean).length;
      return (
        <div className="flex items-center gap-2">
          {count === 3 ? (
            <CheckCircle2 className="size-4 text-emerald-500" />
          ) : (
            <div className="size-2 rounded-full bg-amber-500 animate-pulse" />
          )}
          <span className="text-xs font-medium text-muted-foreground">
            {count}/3 File
          </span>
        </div>
      );
    },
  },
];
