import { createBrowserRouter } from "react-router-dom";

import Main from "../pages/Main";
import Pokemon from "../pages/Pokemon";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "pokemon/:id",
    element: <Pokemon />,
  },
]);

export default routes;
