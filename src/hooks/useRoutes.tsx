import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  PropsWithChildren,
} from "react";

import { TPokemon } from "@/types/TPokemon";

import { Page } from "@/App";

interface RoutesContextData {
  currentPage: Page;
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
  pokemon: TPokemon | undefined;
  setPokemon: React.Dispatch<React.SetStateAction<TPokemon | undefined>>;
}
const RoutesContext = createContext<RoutesContextData>({} as RoutesContextData);

function RoutesProvider({ children }: PropsWithChildren) {
  const [currentPage, setCurrentPage] = useState<Page>("main");
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
