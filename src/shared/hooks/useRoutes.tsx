import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  PropsWithChildren,
  useEffect,
} from "react";

import { Pokemon } from "@/shared/types/Pokemon";

interface RoutesContextData {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  pokemon: Pokemon | undefined;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | undefined>>;
}

const RoutesContext = createContext<RoutesContextData>({} as RoutesContextData);

function RoutesProvider({ children }: PropsWithChildren) {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const [currentPage, setCurrentPage] = useState(() => {
    return sessionStorage.getItem("page") ?? "main";
  });

  useEffect(() => {
    sessionStorage.setItem("page", currentPage);
  }, [currentPage, setCurrentPage]);

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
