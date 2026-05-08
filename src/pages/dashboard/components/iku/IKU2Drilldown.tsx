import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  Percent,
  Search,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TRACER_RESPONDENTS } from "./iku2-data";

export function IKU2Drilldown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Read page and limit from URL search parameters, fallback to 1 and 5 (to show off pagination)
  const pageParam = searchParams.get("iku2Page");
  const limitParam = searchParams.get("iku2Limit");

  const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
  const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const parsedLimit = limitParam ? parseInt(limitParam, 10) : 5;
  const limit = isNaN(parsedLimit) || parsedLimit < 1 ? 5 : parsedLimit;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = () => {
    setSearchParams((prev) => {
      prev.delete("subview");
      prev.delete("iku2Page");
      prev.delete("iku2Limit");
      return prev;
    });
  };

  const setPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("iku2Page", newPage.toString());
    setSearchParams(newParams, { replace: true });
  };

  const setLimit = (newLimit: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("iku2Limit", newLimit.toString());
    newParams.set("iku2Page", "1");
    setSearchParams(newParams, { replace: true });
  };

  // Reset page when search or status filter changes
  useEffect(() => {
    if (searchParams.get("iku2Page") && searchParams.get("iku2Page") !== "1") {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("iku2Page", "1");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchQuery, statusFilter]);

  // Calculations for stats based on all respondents
  const totalCount = TRACER_RESPONDENTS.length;
  const workingCount = TRACER_RESPONDENTS.filter(
    (r) => r.status === "Bekerja",
  ).length;
  const entrepreneurCount = TRACER_RESPONDENTS.filter(
    (r) => r.status === "Berwirausaha",
  ).length;
  const studyCount = TRACER_RESPONDENTS.filter(
    (r) => r.status === "Lanjut Studi",
  ).length;

  const workingRate = ((workingCount / totalCount) * 100).toFixed(1);
  const entrepreneurRate = ((entrepreneurCount / totalCount) * 100).toFixed(1);
  const studyRate = ((studyCount / totalCount) * 100).toFixed(1);

  // Success criteria (Bekerja + Berwirausaha + Lanjut Studi)
  const successCount = workingCount + entrepreneurCount + studyCount;
  const successRate = ((successCount / totalCount) * 100).toFixed(2);

  // Average wait time
  const totalWaitTime = TRACER_RESPONDENTS.reduce(
    (acc, r) => acc + r.waktuTunggu,
    0,
  );
  const averageWaitTime = (totalWaitTime / totalCount).toFixed(1);

  // Filtering respondents
  const filteredRespondents = TRACER_RESPONDENTS.filter((r) => {
    const matchesSearch =
      r.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nim.includes(searchQuery) ||
      r.prodi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.fakultas.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      r.status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination slicing
  const paginatedRespondents = filteredRespondents.slice(
    (page - 1) * limit,
    page * limit,
  );
  const totalPages = Math.ceil(filteredRespondents.length / limit) || 1;

  // Format IDR currency helper
  const formatIDR = (num: number) => {
    if (num === 0) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const renderPageNumbers = () => {
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
          className={`min-w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all cursor-pointer ${
            isCurrent
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400"
          }`}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 py-10 px-4 transition-all duration-500">
      {/* Upper Navigation & Header */}
      <div className="space-y-6">
        <button
          onClick={handleBack}
          className="group py-2.5 px-5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40 backdrop-blur-md text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali Ke Menu Utama IKU</span>
        </button>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
              <Sparkles className="size-5 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                Analisis Detil Tracer Study
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Indikator Kinerja Utama{" "}
              <span className="text-amber-500">IKU 2</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              Persentase lulusan pendidikan tinggi program diploma satu, diploma
              dua, diploma tiga, diploma empat/sarjana terapan, dan sarjana yang
              langsung bekerja, berwirausaha, atau melanjutkan studi dalam
              jangka waktu 1 (satu) tahun setelah kelulusan, serta sudah
              bekerja, atau berwirausaha sebelum lulus kuliah.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 p-5 rounded-3xl shrink-0 w-full sm:w-auto">
            <div className="p-3 bg-amber-500 rounded-2xl text-white">
              <Percent size={24} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                Total Keterserapan Lulusan
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                {successRate}%
              </span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5 uppercase">
                Target IKU 2: 60.00%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full translate-x-8 -translate-y-8" />
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
            <Briefcase className="size-6" />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Bekerja
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-800 dark:text-white">
                {workingCount}
              </span>
              <span className="text-xs font-bold text-blue-500">
                {workingRate}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full translate-x-8 -translate-y-8" />
          <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
            <TrendingUp className="size-6" />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Berwirausaha
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-800 dark:text-white">
                {entrepreneurCount}
              </span>
              <span className="text-xs font-bold text-emerald-500">
                {entrepreneurRate}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full translate-x-8 -translate-y-8" />
          <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Melanjutkan Studi
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-800 dark:text-white">
                {studyCount}
              </span>
              <span className="text-xs font-bold text-purple-500">
                {studyRate}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full translate-x-8 -translate-y-8" />
          <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
            <Clock className="size-6" />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
              Rerata Waktu Tunggu
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-800 dark:text-white">
                {averageWaitTime}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Bulan
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main List Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl p-8 space-y-6"
      >
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
              <UserCheck className="size-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Daftar Responden Tracer Study
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Menampilkan data responden kuesioner kelulusan alumni
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari Responden / Prodi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs font-bold placeholder:text-slate-400 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/40 transition-all"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={14} />
              </div>
            </div>

            {/* Status Selector */}
            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}
            >
              <SelectTrigger className="h-10 min-w-[150px] rounded-full bg-white dark:bg-slate-950 text-xs font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold">
                <SelectItem
                  value="ALL"
                  className="text-xs font-bold focus:bg-slate-50 dark:focus:bg-slate-900 cursor-pointer"
                >
                  Semua Status
                </SelectItem>
                <SelectItem
                  value="Bekerja"
                  className="text-xs font-bold focus:bg-slate-50 dark:focus:bg-slate-900 cursor-pointer"
                >
                  Bekerja
                </SelectItem>
                <SelectItem
                  value="Berwirausaha"
                  className="text-xs font-bold focus:bg-slate-50 dark:focus:bg-slate-900 cursor-pointer"
                >
                  Berwirausaha
                </SelectItem>
                <SelectItem
                  value="Lanjut Studi"
                  className="text-xs font-bold focus:bg-slate-50 dark:focus:bg-slate-900 cursor-pointer"
                >
                  Lanjut Studi
                </SelectItem>
                <SelectItem
                  value="Mencari Kerja"
                  className="text-xs font-bold focus:bg-slate-50 dark:focus:bg-slate-900 cursor-pointer"
                >
                  Mencari Kerja
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Responsive Table Grid */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-[1.5rem] bg-slate-50/20 dark:bg-slate-950/20 custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center w-12 border-r border-slate-200 dark:border-slate-800">
                  No.
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                  Nama Responden
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                  NIM
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                  Program Studi & Fakultas
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center border-r border-slate-200 dark:border-slate-800">
                  Status
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                  Instansi / Perusahaan / Kampus
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-right border-r border-slate-200 dark:border-slate-800">
                  Gaji Bulanan
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center border-r border-slate-200 dark:border-slate-800">
                  Wait Time
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
                  Bekerja Sebelum Lulus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {paginatedRespondents.length > 0 ? (
                paginatedRespondents.map((respondent, idx) => {
                  const absoluteNo = (page - 1) * limit + idx + 1;
                  return (
                    <tr
                      key={respondent.id}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-center text-xs font-black text-slate-400 border-r border-slate-100 dark:border-slate-900">
                        {absoluteNo}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-black text-slate-800 dark:text-slate-100 border-r border-slate-100 dark:border-slate-900 whitespace-nowrap">
                        {respondent.nama}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 border-r border-slate-100 dark:border-slate-900">
                        {respondent.nim}
                      </td>
                      <td className="px-5 py-3.5 border-r border-slate-100 dark:border-slate-900">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            {respondent.prodi}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {respondent.fakultas.replace("Fakultas ", "")}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center border-r border-slate-100 dark:border-slate-900">
                        <span
                          className={`inline-block px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-full border whitespace-nowrap ${
                            respondent.status === "Bekerja"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                              : respondent.status === "Berwirausaha"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : respondent.status === "Lanjut Studi"
                                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                          }`}
                        >
                          {respondent.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-900">
                        {respondent.instansi}
                      </td>
                      <td className="px-5 py-3.5 text-right text-xs font-bold text-slate-800 dark:text-slate-200 border-r border-slate-100 dark:border-slate-900">
                        {formatIDR(respondent.pendapatan)}
                      </td>
                      <td className="px-5 py-3.5 text-center border-r border-slate-100 dark:border-slate-900">
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                          {respondent.waktuTunggu}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                          bln
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded border ${
                            respondent.sebelumLulus
                              ? "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/10"
                              : "bg-slate-100 text-slate-400 dark:bg-slate-900 border-transparent"
                          }`}
                        >
                          {respondent.sebelumLulus ? "YA" : "TIDAK"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-xs font-black text-slate-400 uppercase tracking-widest"
                  >
                    Tidak ditemukan data responden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer summary & Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-6 gap-4">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Menampilkan {paginatedRespondents.length} dari{" "}
            {filteredRespondents.length} Responden
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
              >
                <SelectTrigger className="h-8 min-w-[70px] bg-white/50 dark:bg-slate-950/50 text-xs font-black border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <SelectValue placeholder={limit.toString()} />
                </SelectTrigger>
                <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold">
                  {[5, 10, 20, 50].map((size) => (
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
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>

              {renderPageNumbers()}

              <button
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Halaman Selanjutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
