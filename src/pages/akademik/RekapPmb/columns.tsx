import { type ColumnRegular, Template } from "@revolist/react-datagrid";
import type { RekapPmb } from "@/services/akademik/rekap-pmb";

// Custom cell for Program Studi
const NamaProdiCell = (props: any) => {
  const data = props.model as RekapPmb | undefined;
  if (!data) return null;
  return (
    <div
      className="flex flex-col justify-center h-full py-1.5 px-2 overflow-hidden"
      title={`${data.nama_prodi} - ${data.unit.fakultas}`}
    >
      <div className="font-bold text-[10px] text-foreground leading-[1.2] whitespace-normal line-clamp-2">
        {data.nama_prodi}
      </div>
      <div className="text-[9px] text-muted-foreground font-medium mt-1 truncate">
        {data.unit.fakultas}
      </div>
    </div>
  );
};

// Custom cell for numeric values to ensure they look consistent
const NumericCell = (props: any) => {
  const { value, prop } = props;
  const isJumlah = prop?.toString().startsWith("jumlah_");
  return (
    <div
      className={`flex items-center justify-center h-full font-bold text-[11px] ${isJumlah ? "text-primary" : "text-muted-foreground/80"}`}
    >
      {value || "-"}
    </div>
  );
};

const createCategoryColumns = (id: string, header: string): ColumnRegular[] => [
  {
    prop: `${id}_peminat`,
    name: `${header} Peminat`,
    size: 80,
    cellTemplate: Template(NumericCell),
  },
  {
    prop: `${id}_lulus`,
    name: `${header} Lulus`,
    size: 80,
    cellTemplate: Template(NumericCell),
  },
  {
    prop: `${id}_daftar`,
    name: `${header} Daftar`,
    size: 80,
    cellTemplate: Template(NumericCell),
  },
];

export const columns: ColumnRegular[] = [
  {
    prop: "nama_prodi",
    name: "Program Studi",
    size: 320,
    pin: "colPinStart",
    cellTemplate: Template(NamaProdiCell),
  },
  ...createCategoryColumns("snbp", "SNBP"),
  ...createCategoryColumns("snbt", "SNBT"),
  ...createCategoryColumns("smbjm_cbt", "CBT"),
  ...createCategoryColumns("smbjm_raport", "Rap."),
  ...createCategoryColumns("smbjm_talent", "Tal."),
  ...createCategoryColumns("smbjm_utbk", "UTBK"),
  ...createCategoryColumns("profesi", "Prof."),
  ...createCategoryColumns("internasional", "Intl."),
  ...createCategoryColumns("pasca", "Pasca"),
  ...createCategoryColumns("adikpapua", "Adik"),
  {
    prop: "jumlah_peminat",
    name: "T. Peminat",
    size: 90,
    cellTemplate: Template(NumericCell),
  },
  {
    prop: "jumlah_lulus",
    name: "T. Lulus",
    size: 90,
    cellTemplate: Template(NumericCell),
  },
  {
    prop: "jumlah_daftar",
    name: "T. Daftar",
    size: 90,
    cellTemplate: Template(NumericCell),
  },
];
