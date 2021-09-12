import React from "react";

/**
 * Application Routes here.
 * Note: this auto-populates your application nav bar. 
 */
const routes: RouteDef[] = [
  { path: "/", text: "Home", component: React.lazy(() => import("./Home")) },
  { path: "/demo", text: "Demo", component: React.lazy(() => import("./Demo")) },
];

export default routes;

export interface RouteDef {
  path: string;
  text: string;
  component?: any;
  render?: (p?: any) => JSX.Element;
}
