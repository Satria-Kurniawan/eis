import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Penelitian } from "@/services/kinerja/penelitian";
import {
  BookOpen,
  Building2,
  Calendar,
  Coins,
  ExternalLink,
  FileSearch,
  FileText,
  GraduationCap,
  Layers,
  Sparkles,
  User,
  Users,
} from "lucide-react";

interface PenelitianDetailModalProps {
  data: Penelitian | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PenelitianDetailModal({
  data,
  isOpen,
  onClose,
}: PenelitianDetailModalProps) {
  if (!data) return null;

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    isLink = false,
    isCurrency = false,
  }: {
    icon: any;
    label: string;
    value: string | number | null | undefined;
    isLink?: boolean;
    isCurrency?: boolean;
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
          {isCurrency && value
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(Number(value))
            : value || "-"}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl w-[95vw] p-0 overflow-hidden border-primary/10 bg-card/95 backdrop-blur-3xl rounded-[2.5rem] h-[90vh] flex flex-col">
        <DialogHeader className="p-8 pb-4 shrink-0 border-b border-primary/5">
          <div className="flex items-center gap-3 text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <FileSearch className="size-4" />
            <span>Detail Penelitian</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter leading-tight">
            {data.judul_tulisan}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.skim}
            </Badge>
            <Badge
              variant="outline"
              className="bg-indigo-500/5 text-indigo-600 border-indigo-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.sumber_dana}
            </Badge>
            <Badge
              variant="outline"
              className="bg-emerald-500/5 text-emerald-600 border-emerald-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.skema}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Project Info & Finance */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Informasi Hibah & Skema
                  </h3>
                  <DetailItem
                    icon={Layers}
                    label="Skim Penelitian"
                    value={data.skim}
                  />
                  <DetailItem
                    icon={Sparkles}
                    label="Skema"
                    value={data.skema}
                  />
                  <DetailItem
                    icon={Building2}
                    label="Sumber Dana"
                    value={data.sumber_dana}
                  />
                  <DetailItem
                    icon={Coins}
                    label="Jumlah Dana"
                    value={data.dana}
                    isCurrency
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <DetailItem
                      icon={Calendar}
                      label="Tahun Awal"
                      value={data.tahun_awal}
                    />
                    <DetailItem
                      icon={Calendar}
                      label="Tahun Proposal"
                      value={data.tahun_proposal}
                    />
                    <DetailItem
                      icon={Calendar}
                      label="Implementasi"
                      value={data.tahun_implementasi}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Akademik & Deskripsi
                  </h3>
                  <DetailItem
                    icon={BookOpen}
                    label="Rumpun Ilmu"
                    value={data.rumpun_ilmu}
                  />
                  <DetailItem
                    icon={FileText}
                    label="Bidang Penelitian"
                    value={data.bidang_penelitian}
                  />
                  <DetailItem
                    icon={Layers}
                    label="Deskripsi"
                    value={data.deskripsi}
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Keterlibatan Mahasiswa
                  </h3>
                  <div className="space-y-3">
                    {data.mahasiswa_penelitian.length > 0 ? (
                      data.mahasiswa_penelitian.map((mhs, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-muted/50 border border-primary/5 flex items-start gap-3"
                        >
                          <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <GraduationCap className="size-4" />
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-foreground">
                              {mhs.nama_lengkap}
                            </div>
                            <div className="text-[10px] font-medium text-muted-foreground">
                              NIM: {mhs.nim || "-"}
                            </div>
                            <div className="text-[9px] italic text-muted-foreground leading-tight mt-1">
                              {mhs.metadata.judul_skripsi}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs italic text-muted-foreground text-center py-4">
                        Tidak ada data mahasiswa.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Personnel & Documents */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Tim Peneliti
                  </h3>
                  <DetailItem
                    icon={User}
                    label="Penulis Utama"
                    value={data.nama_dosen}
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
                    Dokumen Hasil Penelitian
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <DetailItem
                      icon={FileText}
                      label="Proposal"
                      value={data.file_proposal}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="Laporan Kemajuan"
                      value={data.file_laporan_kemajuan}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="Laporan Akhir"
                      value={data.file_laporan_akhir}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="Bukti Kerja"
                      value={data.file_bukti_kerja}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="Daftar Isi"
                      value={data.file_daftar_isi}
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
