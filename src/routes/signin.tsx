// routes/signin.ts
import { rootRoute } from "./__root";
import SignIn from "../components/SignIn/SignIn";
import { createRoute } from "@tanstack/react-router";

export const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin", // change from "/" to "/signin"
  component: SignIn,
});
