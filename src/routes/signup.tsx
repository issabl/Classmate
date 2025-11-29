// routes/signup.tsx
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import SignUp from "../components/SignUp/SignUp";

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "signup", // relative → renders at "/signup"
  component: SignUp,
});
