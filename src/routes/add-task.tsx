import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import AddTaskPage from "../components/pages/Addtask";

export const addTaskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-task",
  component: AddTaskPage,
});
