import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  type EvaluasiDosen,
  type EvaluationMetric,
} from "@/services/akademik/evaluasiDosen";
import { calculateMetricScore, getStatusFromScore } from "@/lib/evaluasi-utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Book, GraduationCap } from "lucide-react";

interface DetailDialogProps {
  data: EvaluasiDosen | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MetricRow = ({
  label,
  metric,
}: {
  label: string;
  metric: EvaluationMetric;
}) => {
  const score = calculateMetricScore(metric);
  const status = getStatusFromScore(score);
  const totalResponses =
    metric.sangat_baik + metric.baik + metric.cukup + metric.kurang;

  return (
    <div className="space-y-3 p-4 rounded-2xl border bg-muted/30 border-primary/5 group hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <span className="text-sm font-bold text-foreground/80 leading-snug group-hover:text-foreground">
          {label.replace(/_/g, " ")}
        </span>
        <Badge
          variant="outline"
          className={`whitespace-nowrap bg-${status.color}-500/10 text-${status.color}-600 border-${status.color}-500/20`}
        >
          {Math.round(score)}% - {status.label}
        </Badge>
      </div>

      <div className="space-y-2">
        <Progress
          value={score}
          className="h-2 bg-primary/5"
          // indicatorClassName={`bg-${status.color}-500`}
        />

        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
          <span>SB: {metric.sangat_baik}</span>
          <span>B: {metric.baik}</span>
          <span>C: {metric.cukup}</span>
          <span>K: {metric.kurang}</span>
          <span className="text-primary font-black">
            Total: {totalResponses}
          </span>
        </div>
      </div>
    </div>
  );
};

export function EvaluasiDetailDialog({
  data,
  open,
  onOpenChange,
}: DetailDialogProps) {
  if (!data) return null;

  const metricKeys: (keyof EvaluasiDosen)[] = [
    "Perencanaan_perkuliahan",
    "Relevansi_materi_dengan_tujuan_pembelajaran",
    "Penguasaan_materi_perkuliahan",
    "Metode_dan_pendekatan_perkuliahan",
    "Inovasi_dalam_perkuliahan",
    "Kreatifitas_dalam_perkuliahan",
    "Media_pembelajaran",
    "Sumber_belajar",
    "Penilaian_hasil_belajar",
    "Penilaian_proses_belajar",
    "Pemberian_tugas_perkuliahan",
    "Pengelolaan_kelas",
    "Motivasi_dan_antusiasme_mengajar",
    "Penciptaan_iklim_belajar",
    "Kedisiplinan",
    "Penegakan_aturan_perkuliahan",
    "Pengembangan_karakter_mahasiswa",
    "Keteladanan_dalam_bersikap_dan_bertindak",
    "Kemampuan_berkomunikasi",
    "Penggunaan_bahasa_lisan_dan_tulisan",
    "Kemampuan_berinteraksi_sosial_dengan_mahasiswa",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-3xl border-primary/10 shadow-2xl">
        <DialogHeader className="p-6 bg-linear-to-br from-primary/10 to-transparent border-b">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black tracking-tight">
                {data.nama_lengkap}
              </DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground">
                Detail Evaluasi Kinerja Dosen - {data.nama_matakuliah}
              </DialogDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background/50 border text-[10px] font-bold">
              <User className="size-3" /> NIP: {data.nip}
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background/50 border text-[10px] font-bold">
              <Book className="size-3" /> Kelas: {data.nama_kelas}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 h-[60vh]">
          <div className="grid gap-4 pb-4">
            {metricKeys.map((key) => (
              <MetricRow
                key={key}
                label={key}
                metric={data[key] as EvaluationMetric}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
