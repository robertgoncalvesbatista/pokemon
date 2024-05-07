import { RouterProvider } from "react-router-dom";

import { render } from "preact";

import routes from "./routes/index.tsx";

import "./globals.css";

render(<RouterProvider router={routes} />, document.getElementById("app")!);
