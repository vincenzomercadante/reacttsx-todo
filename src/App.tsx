import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TodoPage from "./pages/TodoPage";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoPage />
  </StrictMode>
);
