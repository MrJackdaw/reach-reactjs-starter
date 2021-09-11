import createState from "@jackcom/raphsducks";
import { NETWORKS } from "./constants";


/** Reach global state */
const ReachStore = createState({
  /** Reach `networkAccount` instance */
  account: null,
  /** Current configured network */
  currentNetwork: NETWORKS.ALGO.abbr,
  /** Error messages */
  error: null,
});
export default ReachStore