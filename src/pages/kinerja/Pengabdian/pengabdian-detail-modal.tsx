import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Pengabdian } from "@/services/kinerja/pengabdian";
import {
  Calendar,
  Coins,
  ExternalLink,
  FileText,
  Handshake,
  Layers,
  MapPin,
  Search,
  User,
  Users,
} from "lucide-react";

interface PengabdianDetailModalProps {
  data: Pengabdian | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PengabdianDetailModal({
  data,
  isOpen,
  onClose,
}: PengabdianDetailModalProps) {
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

  const formattedDana = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(parseFloat(data.dana) || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl w-[95vw] p-0 overflow-hidden border-primary/10 bg-card/95 backdrop-blur-3xl rounded-[2.5rem] h-[90vh] flex flex-col">
        <DialogHeader className="p-8 pb-4 shrink-0 border-b border-primary/5">
          <div className="flex items-center gap-3 text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <Handshake className="size-4" />
            <span>Detail Kegiatan Pengabdian</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter leading-tight">
            {data.nama_kegiatan}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.skim || data.skema}
            </Badge>
            <Badge
              variant="outline"
              className="bg-indigo-500/5 text-indigo-600 border-indigo-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              Sumber: {data.sumber_dana}
            </Badge>
            <Badge
              variant="outline"
              className="bg-emerald-500/5 text-emerald-600 border-emerald-500/10 font-bold uppercase tracking-wider text-[10px]"
            >
              Dana: {formattedDana}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Activity Details */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Informasi Kegiatan & Pendanaan
                  </h3>
                  <DetailItem
                    icon={Coins}
                    label="Institusi Sumber Dana"
                    value={data.institusi_sumber_dana}
                  />
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
                    icon={Search}
                    label="Bidang Pengabdian"
                    value={data.nama_sub_bidang || data.bidang_penelitian}
                  />
                  <DetailItem
                    icon={Layers}
                    label="Tujuan Ekonomi Sosial"
                    value={data.tujuan_ekonomi_sosial}
                  />
                  <DetailItem
                    icon={MapPin}
                    label="Homebase Unit"
                    value={`${data.unit?.fakultas} - ${data.unit?.prodi}`}
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Kaitan Akademik
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={Layers}
                      label="ID Sinta"
                      value={data.id_sinta}
                    />
                    <DetailItem
                      icon={Layers}
                      label="Skim Hibah"
                      value={data.skim || data.skema}
                    />
                  </div>
                  <DetailItem
                    icon={Search}
                    label="Rumpun Ilmu"
                    value={data.rumpun_ilmu}
                  />
                </div>
              </div>

              {/* Right Column: Personnel & Documents */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Pelaksana & Anggota
                  </h3>
                  <DetailItem
                    icon={User}
                    label="Ketua Pelaksana (Dosen)"
                    value={data.nama_dosen}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <Users className="size-3" />
                      Anggota Pelaksana
                    </div>
                    <div className="space-y-2">
                      {(() => {
                        let members = [];
                        try {
                          if (typeof data.anggota_pengabdian === "string") {
                            members = JSON.parse(data.anggota_pengabdian);
                          } else if (Array.isArray(data.anggota_pengabdian)) {
                            members = data.anggota_pengabdian;
                          }
                        } catch (e) {
                          members = [];
                        }

                        if (members.length === 0)
                          return (
                            <div className="text-xs italic text-muted-foreground">
                              Tidak ada data anggota.
                            </div>
                          );

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
                                {member.identitas.nip || member.identitas.nidn}{" "}
                                • {member.unit_kerja.institusi}
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
                    File Laporan & Dokumen
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <DetailItem
                      icon={FileText}
                      label="Laporan Akhir"
                      value={data.file_laporan_akhir}
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
                      label="Proposal"
                      value={data.file_proposal}
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
                      label="Lembar Pengesahan"
                      value={data.file_lembar_pengesahan}
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
