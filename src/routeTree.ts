import { rootRoute } from "./routes/__root";
import { signinRoute } from "./routes/signin";
import { signupRoute } from "./routes/signup"; // <-- add this
import { homeRoute } from "./routes/home";
import { calendarRoute } from "./routes/calendar";
import { addTaskRoute } from "./routes/add-task";

export const routeTree = rootRoute.addChildren([
  signinRoute,
  signupRoute, // <-- add it here
  homeRoute,
  calendarRoute,
  addTaskRoute,
]);
