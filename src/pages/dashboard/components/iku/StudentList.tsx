import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIkuStudents } from "../../../../hooks/dashboard/use-iku1";

// Determine "Kelulusan Tepat Waktu" based on the user's specific guidelines:
// d4/s1 = 4 years, d3/s3 = 3 years, s2 = 2 years, profesi = 2025 graduation year or study duration limit
export const checkTepatWaktu = (
  jenjang: string,
  semesterPosisi: number,
  tahunLulus: number,
): boolean => {
  const code = jenjang.toUpperCase();
  if (code.includes("D4") || code.includes("S1")) {
    return semesterPosisi <= 8;
  }
  if (code.includes("D3") || code.includes("S3")) {
    return semesterPosisi <= 6;
  }
  if (code.includes("S2")) {
    return semesterPosisi <= 4;
  }
  if (code.includes("PRO")) {
    return semesterPosisi <= 2 || tahunLulus === 2025;
  }
  return semesterPosisi <= 8;
};

interface StudentListProps {
  unitName: string;
  jenjang: string;
  parentFilterKey?: string;
  parentFilterValue?: string;
}

export function StudentList({
  unitName,
  jenjang,
  parentFilterKey,
  parentFilterValue,
}: StudentListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const pageParam = searchParams.get("studentPage");
  const limitParam = searchParams.get("studentLimit");

  const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
  const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const parsedLimit = limitParam ? parseInt(limitParam, 10) : 10;
  const limit = isNaN(parsedLimit) || parsedLimit < 1 ? 10 : parsedLimit;

  const setPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("studentPage", newPage.toString());
    setSearchParams(newParams, { replace: true });
  };

  const setLimit = (newLimit: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("studentLimit", newLimit.toString());
    newParams.set("studentPage", "1");
    setSearchParams(newParams, { replace: true });
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    const currentStudentPage = searchParams.get("studentPage");
    if (currentStudentPage && currentStudentPage !== "1") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("studentPage", "1");
      setSearchParams(newParams, { replace: true });
    }
  }, [parentFilterKey, parentFilterValue, jenjang]);

  const {
    data: studentsResponse,
    isLoading,
    isError,
    refetch,
  } = useIkuStudents(jenjang, parentFilterKey, parentFilterValue, page, limit);

  const allStudents = studentsResponse?.datas ?? [];

  // Resolve unit name display if unitName is a code
  let displayUnitName = unitName;
  const targetUpper = unitName.toUpperCase();
  if (!targetUpper.startsWith("JENJANG")) {
    const matchingStudent = allStudents.find(
      (s) =>
        s.unit?.fkt_kode === unitName ||
        s.unit?.jrs_kode === unitName ||
        s.unit?.prd_kode === unitName,
    );
    if (matchingStudent) {
      if (matchingStudent.unit?.fkt_kode === unitName) {
        displayUnitName = matchingStudent.nama_fakultas;
      } else if (matchingStudent.unit?.jrs_kode === unitName) {
        displayUnitName = matchingStudent.unit.jurusan;
      } else if (matchingStudent.unit?.prd_kode === unitName) {
        displayUnitName = matchingStudent.nama_prodi;
      }
    }
  }

  // Calculate the graduation label and map items for representation
  const paginationInfo = studentsResponse?.pagination;
  const startNo =
    ((paginationInfo?.page ?? 1) - 1) * (paginationInfo?.limit ?? limit) + 1;

  const formattedStudents = allStudents.map((s, idx) => {
    const isTepatWaktu = checkTepatWaktu(
      jenjang,
      s.semester_posisi,
      s.tahun_lulus,
    );
    return {
      no: startNo + idx,
      nama: s.nama_lengkap,
      nim: s.nim,
      prodi: s.nama_prodi,
      jurusan: s.unit?.jurusan || "Jurusan",
      fakultas: s.nama_fakultas || "Fakultas",
      tahunMasuk: s.angkatan,
      semester: s.semester_posisi,
      statusKelulusan: isTepatWaktu ? "Tepat Waktu" : "Tidak Tepat Waktu",
    };
  });

  // Apply search filtering on top
  const filteredStudents = formattedStudents.filter(
    (s) =>
      s.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nim?.includes(searchQuery),
  );

  // Error fetching state
  if (isError) {
    return (
      <div className="w-full bg-red-500/5 border border-red-500/10 rounded-[2.5rem] p-10 text-center flex flex-col items-center justify-center min-h-[300px] mt-12">
        <AlertCircle size={40} className="text-red-500 mb-4 animate-bounce" />
        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Gagal Memuat Daftar Mahasiswa
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          Terjadi kesalahan saat memuat data mahasiswa dari server. Silakan coba
          kembali beberapa saat lagi.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-6 py-2.5 px-6 rounded-xl bg-red-500 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-red-500/20 active:scale-95 transition-all cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const renderPageNumbers = () => {
    const totalPages = paginationInfo?.pages || 1;
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages.map((p, idx) => {
      if (p === "...") {
        return (
          <span
            key={`dots-${idx}`}
            className="px-1 text-xs font-black text-slate-400 dark:text-slate-500"
          >
            ...
          </span>
        );
      }

      const isCurrent = p === page;
      return (
        <button
          key={`page-${p}`}
          onClick={() => setPage(p as number)}
          disabled={isLoading}
          className={`min-w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all cursor-pointer disabled:opacity-50 ${
            isCurrent
              ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
              : "border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400"
          }`}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl p-8 space-y-6 mt-12"
    >
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-900 pb-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
            <Users className="size-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Daftar Mahasiswa Aktif
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Unit:{" "}
              <span className="text-blue-500 font-black">
                {displayUnitName}
              </span>
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 shrink-0">
          <input
            type="text"
            placeholder="Cari NIM atau Nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
            className="w-full h-11 pl-4 pr-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm font-bold placeholder:text-slate-400 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 transition-all disabled:opacity-50"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-[1.5rem] bg-slate-50/20 dark:bg-slate-950/20 custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center w-16 md:sticky md:left-0 bg-slate-100/90 dark:bg-slate-900/90 md:backdrop-blur-md md:z-20 border-r border-slate-200 dark:border-slate-800">
                No.
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 md:sticky md:left-16 bg-slate-100/90 dark:bg-slate-900/90 md:backdrop-blur-md md:z-20 border-r border-slate-200 dark:border-slate-800">
                Nama Lengkap
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                NIM
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Program Studi
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Jurusan
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Fakultas
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
                Tahun Masuk
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
                Semester Posisi
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
                Kelulusan Tepat Waktu
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, rIdx) => (
                <tr key={rIdx} className="animate-pulse">
                  <td className="px-6 py-4 text-center md:sticky md:left-0 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900">
                    <Skeleton className="h-4 w-6 mx-auto rounded" />
                  </td>
                  <td className="px-6 py-4 md:sticky md:left-16 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900">
                    <Skeleton className="h-4 w-40 rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24 rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-48 rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-36 rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-36 rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-12 mx-auto rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-8 mx-auto rounded" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton className="h-5 w-20 mx-auto rounded-full" />
                  </td>
                </tr>
              ))
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student, sIdx) => (
                <tr
                  key={sIdx}
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-6 py-3.5 text-center text-xs font-black text-slate-400 md:sticky md:left-0 bg-white dark:bg-slate-950 md:group-hover:bg-slate-50 md:dark:group-hover:bg-slate-900 transition-colors md:z-10 border-r border-slate-100 dark:border-slate-900">
                    {student.no}
                  </td>
                  <td className="px-6 py-3.5 text-sm font-black text-slate-800 dark:text-slate-100 md:sticky md:left-16 bg-white dark:bg-slate-950 md:group-hover:bg-slate-50 md:dark:group-hover:bg-slate-900 transition-colors md:z-10 border-r border-slate-100 dark:border-slate-900 whitespace-nowrap">
                    {student.nama}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    {student.nim}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {student.prodi}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {student.jurusan.replace("Jurusan ", "")}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {student.fakultas.replace("Fakultas ", "")}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-black text-center text-slate-600 dark:text-slate-400">
                    {student.tahunMasuk}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-black text-center text-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/1 rounded-md">
                    {student.semester}
                  </td>
                  <td className="px-6 py-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-full border whitespace-nowrap ${
                        student.statusKelulusan === "Tepat Waktu"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {student.statusKelulusan}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-12 text-center text-xs font-black text-slate-400 uppercase tracking-widest"
                >
                  Tidak ditemukan data mahasiswa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer summary & Pagination */}
      {paginationInfo ? (
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-6 gap-4">
          {/* Summary */}
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {isLoading
              ? "Memuat data..."
              : `Menampilkan ${allStudents.length} dari ${paginationInfo.total} Mahasiswa`}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Limit Selector */}
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Baris per halaman:
              </span>
              <Select
                value={limit.toString()}
                onValueChange={(val) => {
                  setLimit(Number(val));
                }}
                disabled={isLoading}
              >
                <SelectTrigger className="h-8 min-w-[70px] bg-white/50 dark:bg-slate-950/50 text-xs font-black border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <SelectValue placeholder={limit.toString()} />
                </SelectTrigger>
                <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold">
                  {[5, 10, 25, 50, 100].map((size) => (
                    <SelectItem
                      key={size}
                      value={size.toString()}
                      className="text-xs font-bold focus:bg-slate-50 dark:focus:bg-slate-900 cursor-pointer"
                    >
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1 || isLoading}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>

              {renderPageNumbers()}

              <button
                onClick={() =>
                  setPage(Math.min(page + 1, paginationInfo.pages))
                }
                disabled={page === paginationInfo.pages || isLoading}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Halaman Selanjutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {isLoading
              ? "Memuat data..."
              : `Menampilkan ${filteredStudents.length} dari ${allStudents.length} Mahasiswa`}
          </span>
        </div>
      )}
    </motion.div>
  );
}
