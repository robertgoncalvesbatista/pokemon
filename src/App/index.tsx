import { useCallback, useMemo } from "react";

import { RoutesProvider, useRoutes } from "@/hooks/useRoutes";

// Main
import Main from "@/pages/Main/MainPage";

// Pokemon
import PokemonList from "@/pages/Pokemon/ListPage";
import PokemonDetails from "@/pages/Pokemon/DetailsPage";

// Berries
import BerriesList from "@/pages/Berries/ListPage";

// Games
import GamesList from "@/pages/Games/ListPage";

function Routes() {
  const { currentPage, setCurrentPage } = useRoutes();

  const browserRoutes = useMemo(() => {
    return [
      {
        name: "main",
        component: () => <Main setCurrentPage={setCurrentPage} />,
      },
      {
        name: "pokemon.list",
        component: () => <PokemonList setCurrentPage={setCurrentPage} />,
      },
      {
        name: "pokemon.details",
        component: () => <PokemonDetails setCurrentPage={setCurrentPage} />,
      },
      {
        name: "berry.list",
        component: () => <BerriesList setCurrentPage={setCurrentPage} />,
      },
      {
        name: "game.list",
        component: () => <GamesList setCurrentPage={setCurrentPage} />,
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
