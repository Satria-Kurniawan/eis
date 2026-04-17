import { createContext, type ReactNode, useContext, useState } from "react";

interface PeriodContextType {
  tahun: string;
  semester: string;
  setTahun: (tahun: string) => void;
  setSemester: (semester: string) => void;
}

const PeriodContext = createContext<PeriodContextType | undefined>(undefined);

export const PeriodProvider = ({ children }: { children: ReactNode }) => {
  const [tahun, setTahun] = useState("2025");
  const [semester, setSemester] = useState("1");

  return (
    <PeriodContext.Provider value={{ tahun, semester, setTahun, setSemester }}>
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriod = () => {
  const context = useContext(PeriodContext);
  if (context === undefined) {
    throw new Error("usePeriod must be used within a PeriodProvider");
  }
  return context;
};
