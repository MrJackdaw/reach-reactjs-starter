import createState from "@jackcom/raphsducks";
import { NETWORKS } from "./constants";

/**
 * Reach global state. Call any state property as an update method
 * (Example: `ReachStore.error(myErrorMessage)`)
 * You can update multiple items by using `ReachStore.multiple({ ... })`, as long
 * as every key (in the object passed to `multiple`) appears in the object below.
 */
const ReachStore = createState({
  /** Wallet address (for UI) */
  address: "",

  /** Reach `networkAccount` instance */
  account: (null as any|null),

  /** Reach `networkAccount` instance */
  accountsList: [] as any[],

  /** Reach `networkAccount` balance */
  balance: "0.00",

  /** Current configured network */
  currentNetwork: NETWORKS.ALGO.abbr,

  /** Error messages */
  error: "",

  /** Loading state */
  loading: false,

  /** Notifications */
  notification: "",

  /** List of notifications (for multiple simulataneus notices) */
  notifications: [] as string[],
});

export default ReachStore;

export function clearNotification(m?: string) {
  if (m) {
    const { notifications } = ReachStore.getState();
    const i = notifications.findIndex((n) => n === m);
    const updated = [...notifications].splice(i, 1);
    ReachStore.notifications(updated);
  } else ReachStore.notification(null);
}
