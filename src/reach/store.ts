import createState from "@jackcom/raphsducks";
import { NETWORKS } from "./constants";


/** Reach global state */
const ReachStore = createState<any>({
  /** Reach `networkAccount` instance */
  account: null,
  /** Reach `networkAccount` instance */
  accountsList: [],
  /** Reach `networkAccount` balance */
  balance: null,
  /** Current configured network */
  currentNetwork: NETWORKS.ALGO.abbr,
  /** Error messages */
  error: null,
  /** Loading state */
  loading: false
});
export default ReachStore