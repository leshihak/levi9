import React from "react";
import { Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "../../App";

interface EntrypointProps {
  store: Store;
}

const Entrypoint: React.FC<EntrypointProps> = ({ store }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Entrypoint;
