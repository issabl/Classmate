// routes/prof.tsx
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import Profile from "../components/Profile/profile";
import { useState } from "react";

function ProfileRouteWrapper() {
  const [open, setOpen] = useState(true); // Always open when navigating here
  return (
    open && (
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div className="relative z-10">
          <Profile onClose={() => setOpen(false)} />
        </div>
      </div>
    )
  );
}

export const profRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "prof",
  component: ProfileRouteWrapper,
});
