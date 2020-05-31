import { getAllStores } from "./handlers/store/controller";
import { Route } from "./shared/types";

/**
 * All application routes.
 */
export const AppRoutes: Route[] = [
  {
    path: "/stores",
    method: "get",
    action: getAllStores,
  },
];
