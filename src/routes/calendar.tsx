import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import CalendarPage from "../components/calendarpart/CalendarPage";


export const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "calendar",
  component: CalendarPage,
});
