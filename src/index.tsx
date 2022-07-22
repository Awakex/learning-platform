import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./hooks/store";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { App } from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
reportWebVitals();
