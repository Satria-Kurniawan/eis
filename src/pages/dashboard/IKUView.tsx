import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useIku1, useIkuFakultas, useIkuJurusan, useIkuProdi } from "../../hooks/dashboard/use-iku1";
import { IKU1Drilldown } from "./components/iku/IKU1Drilldown";
import { IKUMainTable } from "./components/iku/IKUMainTable";

export default function IKUView() {
  const [searchParams] = useSearchParams();
  const selectedJenjang = searchParams.get("jenjang");
  const selectedFaculty = searchParams.get("faculty");
  const selectedJurusan = searchParams.get("jurusan");

  const {
    data: iku1Response,
    isLoading: isIku1Loading,
    isError: isIku1Error,
    refetch: refetchIku1,
  } = useIku1();
  const {
    data: ikuFakultasResponse,
    isLoading: isFakultasLoading,
    isError: isFakultasError,
    refetch: refetchFakultas,
  } = useIkuFakultas();
  const {
    data: ikuJurusanResponse,
    isLoading: isJurusanLoading,
    isError: isJurusanError,
    refetch: refetchJurusan,
  } = useIkuJurusan(selectedFaculty);
  const {
    data: ikuProdiResponse,
    isLoading: isProdiLoading,
    isError: isProdiError,
    refetch: refetchProdi,
  } = useIkuProdi(selectedJurusan);

  const isLoading =
    isIku1Loading ||
    isFakultasLoading ||
    (!!selectedFaculty && isJurusanLoading) ||
    (!!selectedJurusan && isProdiLoading);

  const isError =
    isIku1Error ||
    isFakultasError ||
    (!!selectedFaculty && isJurusanError) ||
    (!!selectedJurusan && isProdiError);

  const refetch = () => {
    refetchIku1();
    refetchFakultas();
    if (selectedFaculty) {
      refetchJurusan();
    }
    if (selectedJurusan) {
      refetchProdi();
    }
  };
  const [activeStudentUnitName, setActiveStudentUnitName] = useState<
    string | null
  >(null);
  const [activeStudentUnitCode, setActiveStudentUnitCode] = useState<
    string | null
  >(null);

  useEffect(() => {
    setActiveStudentUnitName(null);
    setActiveStudentUnitCode(null);
  }, [selectedFaculty, selectedJurusan, selectedJenjang]);

  // Loading skeleton screen
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-12 py-10 transition-all duration-500 px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-12 w-96 rounded-2xl" />
          <Skeleton className="h-4 w-lg max-w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-[2rem]" />
          <Skeleton className="h-32 rounded-[2rem]" />
          <Skeleton className="h-32 rounded-[2rem]" />
        </div>
        <Skeleton className="h-128 w-full rounded-[2.5rem]" />
      </div>
    );
  }

  if (
    isError ||
    !iku1Response ||
    !iku1Response.datas ||
    !ikuFakultasResponse ||
    !ikuFakultasResponse.datas ||
    (selectedFaculty && (!ikuJurusanResponse || !ikuJurusanResponse.datas)) ||
    (selectedJurusan && (!ikuProdiResponse || !ikuProdiResponse.datas))
  ) {
    return (
      <div className="w-full max-w-7xl mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-[60vh] transition-all duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-950 rounded-[2.5rem] border border-red-500/10 dark:border-red-500/20 shadow-2xl p-10 text-center relative overflow-hidden"
        >
          {/* Top aesthetic color bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500 via-orange-500 to-red-500" />

          {/* Icon with glow background */}
          <div className="size-20 rounded-3xl bg-red-500/10 dark:bg-red-500/5 border border-red-500/20 flex items-center justify-center mx-auto mb-6 relative group">
            <div className="absolute inset-0 rounded-3xl bg-red-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <AlertCircle
              size={36}
              className="text-red-500 relative z-10 animate-bounce"
            />
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Gagal Memuat Data IKU
          </h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Koneksi ke server analitik pusat terputus atau terjadi kesalahan
            pengambilan data. Silakan periksa jaringan Anda atau coba hubungkan
            kembali.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => refetch()}
              className="w-full py-4 px-6 rounded-2xl bg-red-500 hover:bg-red-600 active:scale-98 transition-all text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-red-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} className="animate-spin" />
              <span>Coba Hubungkan Kembali</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800/80 active:scale-98 transition-all text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              Reload Halaman
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active data mappings from the real API response
  const getDetailForJenjang = (jenjang: string) => {
    return iku1Response.datas.detail?.find(
      (item) => item.jenjang.toUpperCase() === jenjang.toUpperCase(),
    );
  };

  const overallAeePtVal = iku1Response.datas.aee_pt_final ?? 0;

  // Map each jenjang's statistic directly to 'tingkat_pencapaian' as requested
  const d3Ach = getDetailForJenjang("D3")?.tingkat_pencapaian ?? 0;
  const d4Ach = getDetailForJenjang("D4")?.tingkat_pencapaian ?? 0;
  const s1Ach = getDetailForJenjang("S1")?.tingkat_pencapaian ?? 0;
  const s2Ach = getDetailForJenjang("S2")?.tingkat_pencapaian ?? 0;
  const s3Ach = getDetailForJenjang("S3")?.tingkat_pencapaian ?? 0;
  const proAch = getDetailForJenjang("Pro")?.tingkat_pencapaian ?? 0;

  const handleSelectStudentUnit = (unitName: string, unitCode?: string) => {
    setActiveStudentUnitName(unitName);
    setActiveStudentUnitCode(unitCode || null);
    setTimeout(() => {
      const el = document.getElementById("student-list-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (selectedJenjang) {
    return (
      <IKU1Drilldown
        iku1Response={iku1Response}
        ikuFakultasResponse={ikuFakultasResponse}
        ikuJurusanResponse={ikuJurusanResponse}
        ikuProdiResponse={ikuProdiResponse}
        isError={isError}
        refetch={refetch}
        selectedJenjang={selectedJenjang}
        selectedFaculty={selectedFaculty}
        selectedJurusan={selectedJurusan}
        activeStudentUnitName={activeStudentUnitName}
        activeStudentUnitCode={activeStudentUnitCode}
        handleSelectStudentUnit={handleSelectStudentUnit}
      />
    );
  }

  return (
    <IKUMainTable
      iku1Response={iku1Response}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      d3Ach={d3Ach}
      d4Ach={d4Ach}
      s1Ach={s1Ach}
      s2Ach={s2Ach}
      s3Ach={s3Ach}
      proAch={proAch}
      overallAeePtVal={overallAeePtVal}
    />
  );
}
