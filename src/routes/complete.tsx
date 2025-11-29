import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import CompletedTasks from "../components/Tasks/completed";

export const completedTasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "completed",
  component: () => <CompletedTasks onClose={() => window.history.back()} />,
});
