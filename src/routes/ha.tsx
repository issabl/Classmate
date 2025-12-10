import { createRoute } from "@tanstack/react-router";
import { z } from "zod"; // <-- THIS IS CORRECT
import { rootRoute } from "./__root";
import AddTaskPage from "../components/pages/AddTask"; // your .tsx page

export const addTaskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-task",
  component: AddTaskPage,
  searchSchema: z.object({
    date: z.string().optional(),
  }),
});
