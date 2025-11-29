import { rootRoute } from "./__root";
import { homeRoute } from "./home";

// ONLY add children here, never add rootRoute again
const routeTree = rootRoute.addChildren([homeRoute]);

export { routeTree };
