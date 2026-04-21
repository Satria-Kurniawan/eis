import { createContext, type ReactNode, useContext, useState } from "react";

interface UnitFilterContextType {
  kodeFakultas: string;
  setKodeFakultas: (val: string) => void;
  kodeJurusan: string;
  setKodeJurusan: (val: string) => void;
  kodeProdi: string;
  setKodeProdi: (val: string) => void;
  resetFilter: () => void;
}

const UnitFilterContext = createContext<UnitFilterContextType | undefined>(undefined);

export const UnitFilterProvider = ({ children }: { children: ReactNode }) => {
  const [kodeFakultas, setKodeFakultas] = useState("");
  const [kodeJurusan, setKodeJurusan] = useState("");
  const [kodeProdi, setKodeProdi] = useState("");

  const resetFilter = () => {
    setKodeFakultas("");
    setKodeJurusan("");
    setKodeProdi("");
  };

  return (
    <UnitFilterContext.Provider 
      value={{ 
        kodeFakultas, 
        setKodeFakultas, 
        kodeJurusan, 
        setKodeJurusan, 
        kodeProdi, 
        setKodeProdi,
        resetFilter
      }}
    >
      {children}
    </UnitFilterContext.Provider>
  );
};

export const useUnitFilter = () => {
  const context = useContext(UnitFilterContext);
  if (context === undefined) {
    throw new Error("useUnitFilter must be used within a UnitFilterProvider");
  }
  return context;
};
