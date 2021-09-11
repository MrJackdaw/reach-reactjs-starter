import React from "react";

/**
 * Application Routes here.
 * Note: this can also be used to populate a global application nav bar
 */
const routes: RouteDef[] = [
  { path: "/", text: "Home", component: React.lazy(() => import("./Home")) },
];

export default routes;

export interface RouteDef {
  path: string;
  text: string;
  component?: any;
  render?: (p?: any) => JSX.Element;
}
