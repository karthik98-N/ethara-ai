import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter.jsx";
import ThemeManager from "./ThemeManager.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeManager>
      <AppRouter />
    </ThemeManager>
    <Toaster position="top-right" toastOptions={{ style: { background: "#111722", color: "#F8FAFC" } }} />
  </React.StrictMode>
);
