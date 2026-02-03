import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/main.scss";

import { CartProvider } from "./context/CartContext";
import { RootApp } from "./RootApp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <RootApp />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
