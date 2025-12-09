import { rootRoute } from "./routes/__root";
import { signinRoute } from "./routes/signin";
import { signupRoute } from "./routes/signup";
import { homeRoute } from "./routes/home";
import { calendarRoute } from "./routes/calendar";
import { addTaskRoute } from "./routes/add-task"; // <-- note .ts import

export const routeTree = rootRoute.addChildren([
  signinRoute,
  signupRoute,
  homeRoute,
  calendarRoute,
  addTaskRoute, // must exist
]);
