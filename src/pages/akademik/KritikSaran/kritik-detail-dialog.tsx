import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type KritikSaran } from "@/services/akademik/kritikSaran";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, MessageCircle, Quote, GraduationCap } from "lucide-react";

interface DetailDialogProps {
  data: KritikSaran | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KritikDetailDialog({
  data,
  open,
  onOpenChange,
}: DetailDialogProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-3xl border-primary/10 shadow-2xl">
        <DialogHeader className="p-8 bg-linear-to-br from-primary/10 to-transparent border-b">
          <div className="flex items-center gap-5 mb-4">
            <div className="p-4 rounded-[1.5rem] bg-primary text-primary-foreground shadow-xl shadow-primary/20">
              <MessageCircle className="size-7" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black tracking-tight mb-1">
                {data.nama}
              </DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground flex items-center gap-2">
                <GraduationCap className="size-4" />
                {data.unit.prodi}
              </DialogDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/50 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary">
              <User className="size-3" /> NIP: {data.nip}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-600">
              Total {data.saran.length} Masukan
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-8 h-[55vh] bg-muted/5">
          <div className="space-y-6 pb-8">
            {data.saran.map((item, idx) => {
              // Clean up trivial items like "-" or "."
              const isTrivial = /^[-.]+$/.test(item.trim());
              
              return (
                <div 
                  key={idx} 
                  className={`relative p-6 rounded-[2rem] border transition-all duration-300 group hover:shadow-lg ${
                    isTrivial 
                      ? "bg-muted/20 border-transparent opacity-60" 
                      : "bg-background border-primary/5 hover:border-primary/20"
                  }`}
                >
                  <div className="absolute -top-3 -left-3 p-2 rounded-full border bg-background shadow-sm group-hover:scale-110 transition-transform">
                    <Quote className={`size-3 ${isTrivial ? "text-muted-foreground" : "text-primary"}`} />
                  </div>
                  <p className={`text-sm leading-relaxed font-medium ${isTrivial ? "italic text-muted-foreground" : "text-foreground/80 font-semibold"}`}>
                    {item || "(Tidak ada pesan)"}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
