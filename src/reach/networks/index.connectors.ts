import { ConnectorInterface } from "reach/reach-types";
import { noOp } from "utils";
import ALGO from "./ALGO";

export default function loadInterface(
  reachConnector: string
): ConnectorInterface {
  switch (reachConnector) {
    case "ALGO":
      return ALGO;
    default:
      return {
        loadAssets: noOp,
        fetchAccount: noOp,
      };
  }
}
