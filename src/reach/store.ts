import createState from "@jackcom/raphsducks";
import { NETWORKS } from "./constants";

/**
 * Reach global state.
 * Call any property below as an update method (e.g. `ReachStore.error(myErrorMessage)`)
 * You can update multiple items by using `ReachStore.multiple({ ... })`, as long as every
 * key in the object appears below.
 */
const ReachStore = createState<any>({
  address: "",
  /** Reach `networkAccount` instance */
  account: null,
  /** Reach `networkAccount` instance */
  accountsList: [],
  /** Reach `networkAccount` balance */
  balance: "0.00",
  /** Current configured network */
  currentNetwork: NETWORKS.ALGO.abbr,
  /** Error messages */
  error: null,
  /** Loading state */
  loading: false,
  /** Notifications */
  notifications: [],
});

export default ReachStore;

export function clearNotification(message: string) {
  const { notifications } = ReachStore.getState();
  const i = notifications!.findIndex((m: string) => m === message);
  if (i > -1) {
    const updated = [...(notifications || [])].splice(i, 1);
    ReachStore.notifications!(updated);
  }
}
