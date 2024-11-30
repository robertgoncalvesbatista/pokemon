import { useCallback, useMemo } from "preact/hooks";

import { RoutesProvider, useRoutes } from "../hooks/useRoutes";

import PokemonList from "../pages/PokemonList";
import PokemonDetails from "../pages/PokemonDetails";

export type Page = "home" | "about" | "contact"; // Define as páginas disponíveis

function Routes() {
  const { currentPage, setCurrentPage } = useRoutes();

  const browserRoutes = useMemo(() => {
    return [
      {
        name: "home",
        component: () => {
          return <PokemonList setCurrentPage={setCurrentPage} />;
        },
      },
      {
        name: "about",
        component: () => {
          return <PokemonDetails setCurrentPage={setCurrentPage} />;
        },
      },
    ];
  }, []);

  const renderPage = useCallback(
    (page: Page) => {
      const foundRoute = browserRoutes.find((route) => {
        return route.name === page;
      });

      if (foundRoute) {
        return foundRoute.component();
      }

      return <PokemonList setCurrentPage={setCurrentPage} />;
    },
    [currentPage, setCurrentPage]
  );

  return renderPage(currentPage);
}

function App() {
  return (
    <RoutesProvider>
      <Routes />
    </RoutesProvider>
  );
}

export default App;
