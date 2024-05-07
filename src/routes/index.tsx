import { Routes as Switch, Route } from "react-router-dom";

import Main from "../pages/Main";
import Pokemon from "../pages/Pokemon";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Main />} />
      <Route path="/pokemon/:id" element={<Pokemon />} />
    </Switch>
  );
}
