import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Tracer } from "@/services/alumni/tracer";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Building2,
  Wallet,
  Clock,
  CheckCircle2,
  Activity,
  FileText,
  CreditCard,
  Hash,
  Search as SearchIcon,
} from "lucide-react";
import { motion } from "motion/react";

interface TracerDetailModalProps {
  data: Tracer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TracerDetailModal({
  data,
  isOpen,
  onClose,
}: TracerDetailModalProps) {
  if (!data) return null;

  const DetailItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string | number | null | undefined;
  }) => (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
        <Icon className="size-3" />
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground/90">
        {value || "-"}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl w-[95vw] p-0 overflow-hidden border-primary/10 bg-card/95 backdrop-blur-3xl rounded-[2.5rem] h-[85vh] flex flex-col">
        <DialogHeader className="p-8 pb-4 shrink-0 border-b border-primary/5">
          <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <GraduationCap className="size-4" />
            <span>Detail Tracer Alumni</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-3xl font-black tracking-tighter leading-tight">
                {data.nama_mahasiswa}
              </DialogTitle>
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <span className="text-sm font-bold tracking-wider">
                  {data.nim_mahasiswa}
                </span>
                <span className="size-1 rounded-full bg-muted-foreground/30" />
                <span className="text-sm uppercase font-bold">
                  {data.unit.prodi}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={`font-black uppercase tracking-wider text-[10px] px-3 py-1 ${
                  data.status_pengisian === "1"
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                }`}
              >
                {data.status_pengisian === "1"
                  ? "Sudah Mengisi"
                  : "Belum Lengkap"}
              </Badge>
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/10 font-bold uppercase tracking-wider text-[10px] px-3 py-1"
              >
                IPK: {data.ipk_mahasiswa}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Profile & Personal Info */}
              <div className="space-y-8 md:col-span-1">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Biodata Pribadi
                  </h3>
                  <DetailItem
                    icon={Mail}
                    label="Email"
                    value={data.email_mahasiswa}
                  />
                  <DetailItem
                    icon={Phone}
                    label="Nomor Telepon"
                    value={data.no_telp}
                  />
                  <DetailItem
                    icon={Calendar}
                    label="Tanggal Lahir"
                    value={
                      data.tgl_lahir_mahasiswa
                        ? new Date(data.tgl_lahir_mahasiswa).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" },
                          )
                        : "-"
                    }
                  />
                  <DetailItem
                    icon={User}
                    label="Jenis Kelamin"
                    value={
                      data.jenis_kelamin_mahasiswa === "L"
                        ? "Laki-laki"
                        : "Perempuan"
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={CreditCard}
                      label="NIK"
                      value={data.nik_mahasiswa}
                    />
                    <DetailItem
                      icon={Hash}
                      label="NPWP"
                      value={data.npwp_mahasiswa}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Keluarga
                  </h3>
                  <DetailItem icon={User} label="Nama Ayah" value={data.ayah} />
                  <DetailItem icon={User} label="Nama Ibu" value={data.ibu} />
                </div>
              </div>

              {/* Academic & Graduation Info */}
              <div className="space-y-8 md:col-span-1">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Akademik & Kelulusan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={Calendar}
                      label="Tahun Lulus"
                      value={data.tahun_lulus_mahasiswa}
                    />
                    <DetailItem
                      icon={Calendar}
                      label="Tahun Wisuda"
                      value={data.tahun_wisuda}
                    />
                  </div>
                  <DetailItem
                    icon={FileText}
                    label="Nomor Ijazah"
                    value={data.no_ijasah}
                  />
                  <DetailItem
                    icon={FileText}
                    label="SK Yudisium"
                    value={data.no_sk_yudisium}
                  />
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/70">
                      <Building2 className="size-3" />
                      Unit Organisasi
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-foreground uppercase tracking-tight leading-relaxed">
                        {data.unit.fakultas}
                      </div>
                      <div className="text-[10px] font-medium text-muted-foreground uppercase">
                        {data.unit.jurusan}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Status Pekerjaan
                  </h3>
                  <DetailItem
                    icon={Activity}
                    label="Status Saat Ini"
                    value={data.status_saat_ini}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem
                      icon={Clock}
                      label="Masa Tunggu (Sebelum)"
                      value={data.masa_tunggu_sebelum_lulus}
                    />
                    <DetailItem
                      icon={Clock}
                      label="Masa Tunggu (Sesudah)"
                      value={data.masa_tunggu_setelah_lulus}
                    />
                  </div>
                </div>
              </div>

              {/* Career & Further Study Info */}
              <div className="space-y-8 md:col-span-1">
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Detail Pekerjaan / Bisnis
                  </h3>
                  <DetailItem
                    icon={Building2}
                    label="Nama Perusahaan"
                    value={data.nama_perusahaan}
                  />
                  <DetailItem
                    icon={Briefcase}
                    label="Jabatan / Jenis Bisnis"
                    value={data.jabatan_dalam_berwirausaha}
                  />
                  <DetailItem
                    icon={Wallet}
                    label="Estimasi Gaji"
                    value={data.gaji}
                  />
                  <DetailItem
                    icon={MapPin}
                    label="Lokasi Perusahaan"
                    value={data.alamat_perusahaan}
                  />
                  <DetailItem
                    icon={SearchIcon}
                    label="Tingkat Tempat Kerja"
                    value={data.tingkat_tempat_kerja}
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary pb-2 border-b border-primary/10">
                    Studi Lanjut
                  </h3>
                  <DetailItem
                    icon={Building2}
                    label="Perguruan Tinggi"
                    value={data.perguruan_tinggi_studi_lanjut}
                  />
                  <DetailItem
                    icon={CheckCircle2}
                    label="Prodi Lanjut"
                    value={data.prodi_masuk_studi_lanjut}
                  />
                  <DetailItem
                    icon={Wallet}
                    label="Sumber Biaya"
                    value={data.sumber_biaya_studi_lanjut}
                  />
                </div>
              </div>
            </div>
            <div className="h-10" />
          </ScrollArea>
        </div>

        <div className="p-8 pt-4 border-t border-primary/5 bg-muted/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Persentase Pengisian Tracer
              </span>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="w-32 sm:w-48 h-2 rounded-full bg-muted overflow-hidden border border-black/5 dark:border-white/5 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.persentase_pengisian}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-linear-to-r from-primary to-primary/60"
                  />
                </div>
                <span className="text-sm font-black text-primary">
                  {data.persentase_pengisian}%
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-foreground/10"
          >
            Tutup Detail
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
