import { useCallback, useMemo } from "preact/hooks";

import { RoutesProvider, useRoutes } from "../hooks/useRoutes";

import Main from "../pages/Main";
import PokemonList from "../pages/PokemonList";
import PokemonDetails from "../pages/PokemonDetails";

export type Page = "main" | "home" | "about"; // Define as páginas disponíveis

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
