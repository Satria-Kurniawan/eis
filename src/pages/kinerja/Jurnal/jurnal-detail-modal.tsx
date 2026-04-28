import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Jurnal } from "@/services/kinerja/jurnal";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  Globe,
  Hash,
  Layers,
  Link as LinkIcon,
  Quote,
  Search,
  User,
  Users,
} from "lucide-react";

interface JurnalDetailModalProps {
  data: Jurnal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JurnalDetailModal({
  data,
  isOpen,
  onClose,
}: JurnalDetailModalProps) {
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
            <BookOpen className="size-4" />
            <span>Detail Jurnal Ilmiah</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter leading-tight">
            {data.judul_artikel}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.jenis_jurnal}
            </Badge>
            <Badge
              variant="outline"
              className="bg-indigo-500/5 text-indigo-600 border-indigo-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.scope}
            </Badge>
            {data.akreditasi && (
              <Badge
                variant="outline"
                className="bg-emerald-500/5 text-emerald-600 border-emerald-500/10 font-bold uppercase tracking-wider text-[10px]"
              >
                Akreditasi: {data.akreditasi}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Publication Details */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Informasi Jurnal & Penerbit
                  </h3>
                  <DetailItem
                    icon={BookOpen}
                    label="Nama Jurnal"
                    value={data.nama_jurnal}
                  />
                  <DetailItem
                    icon={Layers}
                    label="Penerbit"
                    value={data.penerbit}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem icon={Hash} label="Volume" value={data.volume_jurnal} />
                    <DetailItem icon={Hash} label="Nomor" value={data.nomor_jurnal} />
                    <DetailItem icon={Hash} label="Halaman" value={`${data.halaman_awal} - ${data.halaman_akhir}`} />
                    <DetailItem icon={Calendar} label="Tahun Terbit" value={data.tahun_publish} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem icon={Hash} label="P-ISSN" value={data.P_ISSN} />
                    <DetailItem icon={Hash} label="E-ISSN" value={data.E_ISSN} />
                  </div>
                  <DetailItem
                    icon={Globe}
                    label="DOI"
                    value={data.DOI ? `https://doi.org/${data.DOI}` : null}
                    isLink
                  />
                  <DetailItem
                    icon={LinkIcon}
                    label="Alamat Web Jurnal"
                    value={data.alamat_web_jurnal}
                    isLink
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
                    Metrik & Indexing
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={Quote}
                      label="Jumlah Sitasi"
                      value={data.sitasi}
                    />
                    <DetailItem
                      icon={Search}
                      label="SINTA Score"
                      value={data.sinta}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <Globe className="size-3" />
                      Indexer
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(data.indexer) && data.indexer.map((idx: any, i: number) => (
                        <a
                          key={i}
                          href={idx.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-muted border border-primary/5 text-[10px] font-bold text-foreground hover:bg-primary/10 transition-colors flex items-center gap-1"
                        >
                          {idx.nama_indexer}
                          <ExternalLink className="size-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
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
                    label="Authors (Raw)"
                    value={data.authors}
                  />
                  <DetailItem
                    icon={Users}
                    label="Jumlah Penulis"
                    value={data.jml_penulis}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <Users className="size-3" />
                      Anggota Internal
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

                        if (members.length === 0) return <div className="text-xs italic text-muted-foreground">Tidak ada data anggota internal.</div>;

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
                                Penulis ke-{member.peran.penulis_ke} • {member.unit_kerja.prodi || member.unit_kerja.jurusan}
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
                      label="File Selesai Dicetak"
                      value={data.file_selesai_dicetak}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="File Upload"
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
