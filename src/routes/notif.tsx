import { createFileRoute } from "@tanstack/react-router";
import Notifications from "../components/Layout/notifications";

export const Route = createFileRoute()({
  component: () => <Notifications />,
});
