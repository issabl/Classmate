import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter, createBrowserHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree";
import "./index.css";


const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
