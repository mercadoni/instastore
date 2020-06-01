import {
  getAllStores,
  getStoresByCity,
  getNearestStore,
} from "./handlers/store/controller";
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
  {
    path: "/stores/city/:city",
    method: "get",
    action: getStoresByCity,
  },
  {
    path: "/stores/nearest",
    method: "post",
    action: getNearestStore,
  },
];
