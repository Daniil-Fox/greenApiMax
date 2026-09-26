import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import {BrowserRouter} from "react-router-dom";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);

root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
