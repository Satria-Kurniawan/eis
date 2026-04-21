import AdminLayout from "@/layouts/AdminLayout";
import AgendaMengajarPage from "@/pages/akademik/AgendaMengajarPage";
import AngketMahasiswaPage from "@/pages/akademik/AngketMahasiswaPage";
import EvaluasiDosenPage from "@/pages/akademik/EvaluasiDosenPage";
import JadwalKuliahPage from "@/pages/akademik/JadwalKuliahPage";
import KaryaAkhirPage from "@/pages/akademik/KaryaAkhirPage";
import KerjasamaPage from "@/pages/akademik/KerjasamaPage";
import KhsOrangTuaPage from "@/pages/akademik/KhsOrangTuaPage";
import KritikSaranPage from "@/pages/akademik/KritikSaranPage";
import MahasiswaWisudaPage from "@/pages/akademik/MahasiswaWisudaPage";
import PenawaranPage from "@/pages/akademik/PenawaranPage";
import PerangkatPembelajaranPage from "@/pages/akademik/PerangkatPembelajaranPage";
import RekapPmbPage from "@/pages/akademik/RekapPmbPage";
import EISDashboard2 from "@/pages/dashboard/EISDashboard2";
import BeasiswaPage from "@/pages/kemahasiswaan/BeasiswaPage";
import DashboardMahasiswaPage from "@/pages/kemahasiswaan/DashboardMahasiswaPage";
import MahasiswaPage from "@/pages/kemahasiswaan/MahasiswaPage";
import LandingPage from "@/pages/landing/LandingPage";
import TracerPage from "@/pages/alumni/TracerPage";
import DosenPage from "@/pages/kepegawaian/DosenPage";
import PegawaiPage from "@/pages/kepegawaian/PegawaiPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        path: "dashboard",
        Component: EISDashboard2,
      },
      {
        path: "akademik/perangkat-pembelajaran",
        Component: PerangkatPembelajaranPage,
      },
      {
        path: "akademik/evaluasi-dosen",
        Component: EvaluasiDosenPage,
      },
      {
        path: "akademik/angket-mahasiswa",
        Component: AngketMahasiswaPage,
      },
      {
        path: "akademik/kritik-saran",
        Component: KritikSaranPage,
      },
      {
        path: "akademik/agenda-mengajar",
        Component: AgendaMengajarPage,
      },
      {
        path: "akademik/mahasiswa-wisuda",
        Component: MahasiswaWisudaPage,
      },
      {
        path: "akademik/rekap-pmb",
        Component: RekapPmbPage,
      },
      {
        path: "akademik/khs-dilihat-orang-tua",
        Component: KhsOrangTuaPage,
      },
      {
        path: "akademik/penawaran",
        Component: PenawaranPage,
      },
      {
        path: "akademik/jadwal-kuliah",
        Component: JadwalKuliahPage,
      },
      {
        path: "akademik/karya-akhir",
        Component: KaryaAkhirPage,
      },
      {
        path: "akademik/kerjasama",
        Component: KerjasamaPage,
      },
      {
        path: "kemahasiswaan/mahasiswa",
        Component: MahasiswaPage,
      },
      {
        path: "kemahasiswaan/beasiswa",
        Component: BeasiswaPage,
      },
      {
        path: "kemahasiswaan/dashboard",
        Component: DashboardMahasiswaPage,
      },
      {
        path: "alumni/data-tracer",
        Component: TracerPage,
      },
      {
        path: "kepegawaian/dosen",
        Component: DosenPage,
      },
      {
        path: "kepegawaian/pegawai",
        Component: PegawaiPage,
      },
    ],
  },
]);
