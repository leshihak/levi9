import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import Entrypoint from "./components/Entrypoint";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Entrypoint store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
