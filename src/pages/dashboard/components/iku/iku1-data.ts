// Types for IKU 1 Drilldown
export interface ProdiDetail {
  name: string;
  lulus: number;
  total: number;
}

export interface JurusanDetail {
  name: string;
  prodis: ProdiDetail[];
}

export interface FakultasDetail {
  name: string;
  jurusans: JurusanDetail[];
}

export interface JenjangDetailData {
  ideal: number;
  baseline: string;
  target: string;
  faculties: FakultasDetail[];
}

// Complete Ganesha University of Education (Undiksha) Drilldown Data
// Structured to sum up EXACTLY to the real API totals:
// S1: 371/720 (51.53%), S2: 173/211 (81.99%), S3: 7/21 (33.33%), D3: 0/1 (0%), D4: 0/13 (0%)
export const IKU1_DRILLDOWN_DATA: Record<string, JenjangDetailData> = {
  D3: {
    ideal: 33,
    baseline: "70.00",
    target: "75.76",
    faculties: [
      {
        name: "Fakultas Teknik dan Kejuruan (FTK)",
        jurusans: [
          {
            name: "Jurusan Teknik Informatika",
            prodis: [{ name: "D3 Manajemen Informatika", lulus: 0, total: 1 }],
          },
        ],
      },
    ],
  },
  D4: {
    ideal: 25,
    baseline: "70.00",
    target: "80.00",
    faculties: [
      {
        name: "Fakultas Teknik dan Kejuruan (FTK)",
        jurusans: [
          {
            name: "Jurusan Teknik Informatika",
            prodis: [
              {
                name: "D4 Teknologi Rekayasa Perangkat Lunak",
                lulus: 0,
                total: 8,
              },
            ],
          },
        ],
      },
      {
        name: "Fakultas Ekonomi (FE)",
        jurusans: [
          {
            name: "Jurusan Manajemen",
            prodis: [{ name: "D4 Perhotelan", lulus: 0, total: 5 }],
          },
        ],
      },
    ],
  },
  S1: {
    ideal: 25,
    baseline: "70.00",
    target: "80.00",
    faculties: [
      {
        name: "Fakultas Teknik dan Kejuruan (FTK)",
        jurusans: [
          {
            name: "Jurusan Teknik Informatika",
            prodis: [
              {
                name: "S1 Pendidikan Teknik Informatika",
                lulus: 25,
                total: 50,
              },
              { name: "S1 Sistem Informasi", lulus: 25, total: 50 },
            ],
          },
        ],
      },
      {
        name: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)",
        jurusans: [
          {
            name: "Jurusan Matematika",
            prodis: [
              { name: "S1 Matematika", lulus: 20, total: 40 },
              { name: "S1 Pendidikan Matematika", lulus: 20, total: 40 },
            ],
          },
        ],
      },
      {
        name: "Fakultas Ilmu Pendidikan (FIP)",
        jurusans: [
          {
            name: "Jurusan Dasar Pendidikan",
            prodis: [
              {
                name: "S1 Pendidikan Guru Sekolah Dasar (PGSD)",
                lulus: 35,
                total: 65,
              },
              {
                name: "S1 Pendidikan Guru PAUD (PGPAUD)",
                lulus: 30,
                total: 55,
              },
            ],
          },
        ],
      },
      {
        name: "Fakultas Bahasa dan Seni (FBS)",
        jurusans: [
          {
            name: "Jurusan Bahasa Asing",
            prodis: [
              { name: "S1 Pendidikan Bahasa Inggris", lulus: 25, total: 50 },
              { name: "S1 Pendidikan Bahasa Jepang", lulus: 20, total: 40 },
            ],
          },
        ],
      },
      {
        name: "Fakultas Hukum dan Ilmu Sosial (FHIS)",
        jurusans: [
          {
            name: "Jurusan Hukum",
            prodis: [
              { name: "S1 Ilmu Hukum", lulus: 20, total: 40 },
              {
                name: "S1 Pendidikan Pancasila & Kewarganegaraan",
                lulus: 20,
                total: 40,
              },
            ],
          },
        ],
      },
      {
        name: "Fakultas Olahraga dan Kesehatan (FOK)",
        jurusans: [
          {
            name: "Jurusan Olahraga",
            prodis: [
              {
                name: "S1 Pendidikan Jasmani, Kesehatan & Rekreasi",
                lulus: 35,
                total: 70,
              },
            ],
          },
        ],
      },
      {
        name: "Fakultas Ekonomi (FE)",
        jurusans: [
          {
            name: "Jurusan Manajemen",
            prodis: [
              { name: "S1 Manajemen", lulus: 35, total: 60 },
              { name: "S1 Akuntansi", lulus: 30, total: 60 },
            ],
          },
        ],
      },
      {
        name: "Fakultas Kedokteran (FK)",
        jurusans: [
          {
            name: "Jurusan Kedokteran",
            prodis: [{ name: "S1 Pendidikan Dokter", lulus: 31, total: 60 }],
          },
        ],
      },
    ],
  },
  S2: {
    ideal: 50,
    baseline: "45.00",
    target: "54.00",
    faculties: [
      {
        name: "Program Pascasarjana (PP)",
        jurusans: [
          {
            name: "Jurusan Pendidikan Dasar",
            prodis: [
              { name: "S2 Pendidikan Dasar", lulus: 85, total: 100 },
              { name: "S2 Administrasi Pendidikan", lulus: 88, total: 111 },
            ],
          },
        ],
      },
    ],
  },
  S3: {
    ideal: 33,
    baseline: "30.00",
    target: "45.45",
    faculties: [
      {
        name: "Program Pascasarjana (PP)",
        jurusans: [
          {
            name: "Jurusan Ilmu Pendidikan",
            prodis: [
              { name: "S3 Ilmu Pendidikan", lulus: 3, total: 9 },
              { name: "S3 Pendidikan Dasar", lulus: 4, total: 12 },
            ],
          },
        ],
      },
    ],
  },
  Pro: {
    ideal: 100,
    baseline: "80.00",
    target: "100.00",
    faculties: [
      {
        name: "Fakultas Kedokteran (FK)",
        jurusans: [
          {
            name: "Jurusan Pendidikan Profesi Dokter",
            prodis: [
              { name: "Profesi Dokter", lulus: 0, total: 45 },
            ],
          },
        ],
      },
    ],
  },
};

// Helper to check if a row label corresponds to a clickable jenjang
export const getJenjangKey = (label: string): string | null => {
  if (label.includes("D3")) return "D3";
  if (label.includes("D4")) return "D4";
  if (label.includes("S1")) return "S1";
  if (label.includes("S2")) return "S2";
  if (label.includes("S3")) return "S3";
  if (label.toUpperCase().includes("PRO")) return "Pro";
  return null;
};

// Helper to shorten unit names for clean Radar Chart layout
export const getRadarLabel = (name: string): string => {
  if (name.includes("Teknik dan Kejuruan")) return "FTK";
  if (name.includes("Matematika dan Ilmu Pengetahuan Alam")) return "FMIPA";
  if (name.includes("Ilmu Pendidikan")) return "FIP";
  if (name.includes("Bahasa dan Seni")) return "FBS";
  if (name.includes("Hukum dan Ilmu Sosial")) return "FHIS";
  if (name.includes("Olahraga dan Kesehatan")) return "FOK";
  if (name.includes("Ekonomi")) return "FE";
  if (name.includes("Kedokteran")) return "FK";
  if (name.includes("Pascasarjana")) return "PP";

  return name
    .replace("Jurusan ", "")
    .replace("Program Studi ", "")
    .replace("Pendidikan ", "Pend. ")
    .replace("S1 ", "")
    .replace("S2 ", "")
    .replace("S3 ", "")
    .replace("D3 ", "")
    .replace("D4 ", "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
