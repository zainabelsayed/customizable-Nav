"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface SideMenuContextType {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

// Create the context with an initial undefined value
const SideMenuContext = createContext<SideMenuContextType | undefined>(
  undefined
);

// Provider component props
interface SideMenuProviderProps {
  children: ReactNode;
}

// Side Menu Provider
export function SideMenuProvider({ children }: SideMenuProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <SideMenuContext.Provider
      value={{ isOpen, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </SideMenuContext.Provider>
  );
}

// Custom hook to use the Side Menu Context
export function useSideMenu() {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }
  return context;
}
