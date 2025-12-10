// AddTask.tsx
import TaskSection from "./TaskSection";
import { useSearch } from "@tanstack/react-router";
import { addTaskRoute } from "../../routes/add-task";

export default function AddTask() {
  // useSearch MUST specify "from" as the route id
  const search = useSearch({ from: addTaskRoute.id });
  const date = search.date ?? ""; // default to empty string if no date

  return <TaskSection selectedDate={date} />;
}
