// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter, createBrowserHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree";
import "./index.css";

// Temporary simple 404 — no import needed, ZERO chance of 500 error
const NotFound = () => (
  <div className="min-h-screen bg-amber-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-amber-700">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <a href="/" className="mt-8 inline-block px-8 py-4 bg-amber-600 text-white rounded-xl">
        Back to Home
      </a>
    </div>
  </div>
);

const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
  defaultNotFoundComponent: NotFound,   // ← This NEVER causes 500 error
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);