import React, { createContext, useState, useContext, useMemo } from "react";
import { TPokemon } from "../types/TPokemon";

export type Page = "home" | "about" | "contact"; // Define as páginas disponíveis

interface RoutesContextData {
  currentPage: Page;
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
  pokemon: TPokemon | undefined;
  setPokemon: React.Dispatch<React.SetStateAction<TPokemon | undefined>>;
}
const RoutesContext = createContext<RoutesContextData>({} as RoutesContextData);

interface RoutesProviderProps {
  children: React.ReactElement;
}

function RoutesProvider({ children }: RoutesProviderProps) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [pokemon, setPokemon] = useState<TPokemon>();

  const value = useMemo(() => {
    return {
      currentPage,
      setCurrentPage,
      pokemon,
      setPokemon,
    };
  }, [currentPage, setCurrentPage]);

  return (
    <RoutesContext.Provider value={value}>{children}</RoutesContext.Provider>
  );
}

function useRoutes(): RoutesContextData {
  const context = useContext(RoutesContext);

  if (!context) {
    throw new Error("useRoutes must be used within as RoutesProvider");
  }

  return context;
}

export { RoutesProvider, useRoutes };
