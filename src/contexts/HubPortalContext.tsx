import { createContext, useContext, useState, type ReactNode } from "react";

interface HubPortalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleHub: () => void;
}

const HubPortalContext = createContext<HubPortalContextType | undefined>(
  undefined,
);

export function HubPortalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHub = () => setIsOpen((prev) => !prev);

  return (
    <HubPortalContext.Provider value={{ isOpen, setIsOpen, toggleHub }}>
      {children}
    </HubPortalContext.Provider>
  );
}

export function useHubPortal() {
  const context = useContext(HubPortalContext);
  if (context === undefined) {
    throw new Error("useHubPortal must be used within a HubPortalProvider");
  }
  return context;
}
