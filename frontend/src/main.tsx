import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import AppStore from "./store/index.ts";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./contexts/SocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={AppStore}>
        <SocketContextProvider>
          <App />
          <Toaster />
        </SocketContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
