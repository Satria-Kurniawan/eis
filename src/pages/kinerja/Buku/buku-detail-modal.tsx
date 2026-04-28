import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Buku } from "@/services/kinerja/buku";
import {
  Book,
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Globe,
  Hash,
  Layers,
  Link as LinkIcon,
  Search,
  User,
  Users,
} from "lucide-react";

interface BukuDetailModalProps {
  data: Buku | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BukuDetailModal({
  data,
  isOpen,
  onClose,
}: BukuDetailModalProps) {
  if (!data) return null;

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    isLink = false,
  }: {
    icon: any;
    label: string;
    value: string | number | null | undefined;
    isLink?: boolean;
  }) => (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
        <Icon className="size-3" />
        {label}
      </div>
      {isLink && value ? (
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1 break-all"
        >
          {value}
          <ExternalLink className="size-3 shrink-0" />
        </a>
      ) : (
        <div className="text-sm font-semibold text-foreground/90">
          {value || "-"}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl w-[95vw] p-0 overflow-hidden border-primary/10 bg-card/95 backdrop-blur-3xl rounded-[2.5rem] h-[90vh] flex flex-col">
        <DialogHeader className="p-8 pb-4 shrink-0 border-b border-primary/5">
          <div className="flex items-center gap-3 text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <Book className="size-4" />
            <span>Detail Publikasi Buku</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter leading-tight">
            {data.judul_buku}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.kategori_buku}
            </Badge>
            <Badge
              variant="outline"
              className="bg-indigo-500/5 text-indigo-600 border-indigo-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.scope}
            </Badge>
            <Badge
              variant="outline"
              className="bg-amber-500/5 text-amber-600 border-amber-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              Posisi: {data.posisi === "1" ? "Utama" : `Anggota (${data.posisi})`}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Publication Details */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Informasi Buku & Penerbit
                  </h3>
                  <DetailItem
                    icon={Building2}
                    label="Penerbit"
                    value={data.penerbit}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem icon={Hash} label="ISBN" value={data.ISBN} />
                    <DetailItem
                      icon={Book}
                      label="Jumlah Halaman"
                      value={data.jumlah_halaman}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={Calendar}
                      label="Tahun Ajaran"
                      value={data.tahun_ajaran}
                    />
                    <DetailItem
                      icon={Calendar}
                      label="Semester"
                      value={data.semester}
                    />
                  </div>
                  <DetailItem
                    icon={Globe}
                    label="Scope"
                    value={data.scope}
                  />
                  <DetailItem
                    icon={LinkIcon}
                    label="URL Dokumen"
                    value={data.url_dokumen}
                    isLink
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Kaitan Produk & Penelitian
                  </h3>
                  <DetailItem
                    icon={Search}
                    label="Sumber Produk"
                    value={data.sumber_produk}
                  />
                  <DetailItem
                    icon={Layers}
                    label="Produk Penelitian"
                    value={data.produk_penelitian_judul}
                  />
                  <DetailItem
                    icon={Layers}
                    label="Produk Pengabdian"
                    value={data.produk_pengabdian_judul}
                  />
                </div>
              </div>

              {/* Right Column: Authors & Unit */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Penulis & Anggota
                  </h3>
                  <DetailItem
                    icon={User}
                    label="Penulis Utama (Dosen)"
                    value={data.nama_dosen}
                  />
                  <DetailItem
                    icon={Users}
                    label="Jumlah Penulis"
                    value={data.jml_penulis}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <Users className="size-3" />
                      Anggota Penulis
                    </div>
                    <div className="space-y-2">
                      {(() => {
                        let members = [];
                        try {
                          if (typeof data.anggota_penelitian === "string") {
                            members = JSON.parse(data.anggota_penelitian);
                          } else if (Array.isArray(data.anggota_penelitian)) {
                            members = data.anggota_penelitian;
                          }
                        } catch (e) {
                          members = [];
                        }

                        if (members.length === 0) return <div className="text-xs italic text-muted-foreground">Tidak ada data anggota.</div>;

                        return members.map((member: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-muted/50 border border-primary/5"
                          >
                            <div className="text-xs font-bold text-foreground">
                              {member.identitas.nama_lengkap}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-[10px] font-medium text-muted-foreground italic">
                                Penulis ke-{member.peran.penulis_ke}
                              </span>
                              {member.peran.is_ketua && (
                                <Badge
                                  variant="outline"
                                  className="h-4 text-[8px] border-indigo-500/20 bg-indigo-500/5 text-indigo-600 font-black"
                                >
                                  KETUA
                                </Badge>
                              )}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    File & Dokumen
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <DetailItem
                      icon={FileText}
                      label="File Utama"
                      value={data.file_upload}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="File Penilaian Reviewer"
                      value={data.file_penilaian_reviewer}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="File Hasil Uji Plagiarisme"
                      value={data.file_hasil_uji_plagiarim}
                      isLink
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-10" />
          </ScrollArea>
        </div>

        <div className="p-8 pt-4 border-t border-primary/5 bg-muted/20 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Tutup Detail
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
