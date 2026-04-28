import React, { createContext, useContext, useEffect, useState } from "react";

interface LowSpecContextType {
  isLowSpec: boolean;
  setIsLowSpec: (val: boolean) => void;
}

const LowSpecContext = createContext<LowSpecContextType | undefined>(undefined);

export function LowSpecProvider({ children }: { children: React.ReactNode }) {
  const [isLowSpec, setIsLowSpec] = useState(() => {
    const saved = localStorage.getItem("lowspec");
    // Default to false (High Spec) if not set
    return saved !== null ? saved === "true" : false;
  });

  useEffect(() => {
    localStorage.setItem("lowspec", String(isLowSpec));
  }, [isLowSpec]);

  return (
    <LowSpecContext.Provider value={{ isLowSpec, setIsLowSpec }}>
      {children}
    </LowSpecContext.Provider>
  );
}

export function useLowSpec() {
  const context = useContext(LowSpecContext);
  if (context === undefined) {
    throw new Error("useLowSpec must be used within a LowSpecProvider");
  }
  return context;
}
