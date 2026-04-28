import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type HKI } from "@/services/kinerja/hki";
import {
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Fingerprint,
  Globe,
  Layers,
  Search,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

interface HKIDetailModalProps {
  data: HKI | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HKIDetailModal({
  data,
  isOpen,
  onClose,
}: HKIDetailModalProps) {
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

  const unitData = data.unit || data.units;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl w-[95vw] p-0 overflow-hidden border-primary/10 bg-card/95 backdrop-blur-3xl rounded-[2.5rem] h-[90vh] flex flex-col">
        <DialogHeader className="p-8 pb-4 shrink-0 border-b border-primary/5">
          <div className="flex items-center gap-3 text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <ShieldCheck className="size-4" />
            <span>Detail Sertifikasi HKI</span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter leading-tight">
            {data.nama_karya}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/10 font-bold uppercase tracking-wider text-[10px]"
            >
              {data.jenis_paten}
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
              {/* Left Column: HKI Details */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Identitas Pendaftaran & Sertifikat
                  </h3>
                  <DetailItem
                    icon={Fingerprint}
                    label="Nomor Pendaftaran"
                    value={data.no_pendaftaran}
                  />
                  <DetailItem
                    icon={Layers}
                    label="Nomor Sertifikat"
                    value={data.no_pendatatan_sertifikat}
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
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={Calendar}
                      label="Tanggal"
                      value={data.tanggal}
                    />
                    <DetailItem
                      icon={Globe}
                      label="Jml Negara Pengaku"
                      value={data.jml_negara_pengaku}
                    />
                  </div>
                  <DetailItem
                    icon={Building2}
                    label="Homebase Unit"
                    value={`${unitData?.fakultas || "-"} - ${unitData?.prodi || "-"}`}
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

              {/* Right Column: Personnel & Documents */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Inventor & Anggota
                  </h3>
                  <DetailItem
                    icon={User}
                    label="Inventor Utama (Dosen)"
                    value={data.nama_dosen}
                  />
                  <DetailItem
                    icon={Users}
                    label="Jumlah Penulis/Inventor"
                    value={data.jml_penulis}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <Users className="size-3" />
                      Anggota Inventor
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
                                Penulis ke-{member.peran.penulis_ke} • {member.unit_kerja.jurusan || member.unit_kerja.fakultas}
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
                    File & Dokumen HKI
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <DetailItem
                      icon={FileText}
                      label="Sertifikat HKI"
                      value={data.file_sertifikat_paten}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="Bukti Kinerja"
                      value={data.file_bukti_kinerja}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="File Pendaftaran"
                      value={data.file_pendaftaran}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="Pemeriksaan Substansi"
                      value={data.file_pemeriksaan_substansi}
                      isLink
                    />
                    <DetailItem
                      icon={FileText}
                      label="Uji Publik"
                      value={data.file_uji_publik}
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
