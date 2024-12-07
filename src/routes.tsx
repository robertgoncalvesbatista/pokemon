import { HashRouter, Route, Routes as Switch } from "react-router-dom";

import Main from "./pages/Main/MainPage";
import PokemonList from "./pages/Pokemon/ListPage";
import PokemonDetails from "./pages/Pokemon/DetailsPage";
import BerriesList from "./pages/Berries/ListPage";
import GamesList from "./pages/Games/ListPage";
import NotFound from "./pages/404";

function Routes() {
  return (
    <HashRouter>
      <Switch>
        {/* Home route */}
        <Route path="/" element={<Main />} />

        {/* Pokemon list route */}
        <Route path="/pokemon" element={<PokemonList />} />

        {/* Pokemon details route */}
        <Route path="/pokemon/:id" element={<PokemonDetails />} />

        {/* Berries route */}
        <Route path="/berry" element={<BerriesList />} />

        {/* Games route */}
        <Route path="/game" element={<GamesList />} />

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
