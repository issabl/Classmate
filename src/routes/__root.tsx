// routes/__root.ts
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet /> {/* renders child routes */}
    </div>
  ),
});
  