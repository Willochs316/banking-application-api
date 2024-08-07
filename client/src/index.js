import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </Provider>
);
