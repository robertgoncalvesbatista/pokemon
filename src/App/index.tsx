import { useCallback, useMemo } from "react";

import { RoutesProvider, useRoutes } from "@/hooks/useRoutes";

import Main from "@/pages/Main";
import PokemonList from "@/pages/Pokemon/list";
import PokemonDetails from "@/pages/Pokemon/details";
import Berries from "@/pages/Berries";
import Games from "@/pages/Games";

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
      {
        name: "berry-list",
        component: () => {
          return <Berries setCurrentPage={setCurrentPage} />;
        },
      },
      {
        name: "game-list",
        component: () => {
          return <Games setCurrentPage={setCurrentPage} />;
        },
      },
    ];
  }, []);

  const renderPage = useCallback(
    (page: string) => {
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
