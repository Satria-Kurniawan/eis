import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Prosiding } from "@/services/kinerja/prosiding";
import {
  BookOpen,
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Hash,
  Link as LinkIcon,
  MapPin,
  Presentation,
  School,
  User,
  Users,
} from "lucide-react";

interface ProsidingDetailModalProps {
  data: Prosiding | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProsidingDetailModal({
  data,
  isOpen,
  onClose,
}: ProsidingDetailModalProps) {
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
          className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1"
        >
          {value}
          <ExternalLink className="size-3" />
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
            <Presentation className="size-4" />
            <span>Detail Prosiding</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter leading-tight">
            {data.judul_artikel}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.tipe_prosiding}
            </Badge>
            <Badge
              variant="outline"
              className="bg-indigo-500/5 text-indigo-600 border-indigo-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.scope}
            </Badge>
            {data.bereputasi === "1" && (
              <Badge
                variant="outline"
                className="bg-amber-500/5 text-amber-600 border-amber-500/10 font-bold uppercase tracking-wider text-[10px]"
              >
                Bereputasi
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Event & Identity */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Informasi Seminar & Penerbit
                  </h3>
                  <DetailItem
                    icon={BookOpen}
                    label="Nama Seminar"
                    value={data.nama_seminar}
                  />
                  <DetailItem
                    icon={Building2}
                    label="Penyelenggara"
                    value={data.penyelenggara}
                  />
                  <DetailItem
                    icon={School}
                    label="Penerbit"
                    value={data.penerbit}
                  />
                  <DetailItem
                    icon={MapPin}
                    label="Tempat Pelaksanaan"
                    value={data.tempat_pelaksanaan}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={Calendar}
                      label="Tanggal Mulai"
                      value={data.tgl_awal}
                    />
                    <DetailItem
                      icon={Calendar}
                      label="Tanggal Selesai"
                      value={data.tgl_akhir}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Identitas Publikasi
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem icon={Hash} label="ISBN" value={data.ISBN} />
                    <DetailItem
                      icon={Hash}
                      label="P-ISSN"
                      value={data.P_ISSN}
                    />
                    <DetailItem
                      icon={Hash}
                      label="E-ISSN"
                      value={data.E_ISSN}
                    />
                    <DetailItem
                      icon={Hash}
                      label="ID Sinta"
                      value={data.id_sinta}
                    />
                  </div>
                  <DetailItem
                    icon={LinkIcon}
                    label="URL Dokumen"
                    value={data.url_dokumen}
                    isLink
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
                    label="Jenis Pembicara"
                    value={data.jenis_pembicara}
                  />
                  <DetailItem
                    icon={Users}
                    label="Jumlah Penulis"
                    value={data.jml_penulis}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <Users className="size-3" />
                      Anggota Penelitian
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
                                {member.peran.asal === "dalam"
                                  ? "Internal"
                                  : "Eksternal"}{" "}
                                • Penulis ke-{member.peran.penulis_ke}
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
                      label="File Prosiding"
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
            <div className="h-10" />{" "}
            {/* Spacer for bottom padding inside scroll */}
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
