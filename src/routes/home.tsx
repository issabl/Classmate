// routes/home.ts
import { rootRoute } from "./__root";
import Home from "../components/Home/Home";
import { createRoute } from "@tanstack/react-router";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "home",
  component: Home,
});
