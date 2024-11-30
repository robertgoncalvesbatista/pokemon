import { useCallback } from "preact/hooks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RoutesProvider, useRoutes } from "./hooks/useRoutes";

import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";

export type Page = "home" | "about" | "contact"; // Define as páginas disponíveis

function Routes() {
  const { currentPage, setCurrentPage } = useRoutes();

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case "home":
        return <PokemonList setCurrentPage={setCurrentPage} />;

      case "about":
        return <PokemonDetails setCurrentPage={setCurrentPage} />;

      default:
        return <PokemonList setCurrentPage={setCurrentPage} />;
    }
  }, [currentPage, setCurrentPage]);

  return renderPage();
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesProvider>
        <Routes />
      </RoutesProvider>
    </QueryClientProvider>
  );
}

export default App;
