import { useCallback, useMemo } from "preact/hooks";

import { RoutesProvider, useRoutes } from "@/hooks/useRoutes";

import Main from "@/pages/Main";
import PokemonList from "@/pages/Pokemon/list";
import PokemonDetails from "@/pages/Pokemon/details";

export type Page = "main" | "pokemon-list" | "pokemon-details"; // Define as páginas disponíveis

function Routes() {
  const { currentPage, setCurrentPage } = useRoutes();

  const browserRoutes = useMemo(() => {
    return [
      {
        name: "main",
        component: () => {
          return <Main setCurrentPage={setCurrentPage} />;
        },
      },
      {
        name: "pokemon-list",
        component: () => {
          return <PokemonList setCurrentPage={setCurrentPage} />;
        },
      },
      {
        name: "pokemon-details",
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

      return <Main setCurrentPage={setCurrentPage} />;
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
