// add-task.ts
import { createRoute } from "@tanstack/react-router";
import { z } from "zod";
import { rootRoute } from "./__root";
import AddTaskPage from "../components/pages/Addtask";

export const addTaskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-task",

  // Page Component
  component: AddTaskPage,

  // URL query validation: /add-task?date=YYYY-MM-DD
  validateSearch: z
    .object({
      date: z.string().optional(),
    })
    .optional(),
});


