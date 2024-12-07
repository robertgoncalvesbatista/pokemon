import { render } from "preact";

import "./globals.css";

import Routes from "./routes";

render(<Routes />, document.getElementById("app")!);
