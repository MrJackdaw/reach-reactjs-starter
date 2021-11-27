import createState from "@jackcom/raphsducks";
import { NETWORKS } from "reach/constants";

/** Your global application state. Add any properties you need here */
const store = createState({
  globalCount: 0,

  /** Notifications */
  notifications: [] as Alert[],

  /** Wallet address (for UI) */
  address: "",

  /** Reach `networkAccount` instance */
  account: null as any | null,

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
});

export default store;

export type Alert = { msg: string; time: number };

export function addNotification(msg: string, additionalUpdates = {}) {
  const note = makeNotification(msg);
  const { notifications: old } = store.getState();
  const notifications = [...old, note];
  store.multiple({ notifications, ...additionalUpdates });
}

export function resetNotifications(msg?: string) {
  const updates = [];
  if (msg) updates.push(makeNotification(msg));
  store.notifications(updates);
}

export function removeNotification(msg: Alert, additionalUpdates = {}) {
  const { notifications } = store.getState();
  const i = notifications.findIndex((n) => n.time === msg.time);
  if (i === -1) return;

  const updates = [...notifications];
  updates.splice(i, 1);
  store.multiple({ notifications: updates, ...additionalUpdates });
}

function makeNotification(msg: string) {
  return { msg, time: new Date().getTime() };
}

export function clearNotification(m?: string) {
  if (!m) return;
  const { notifications } = store.getState();
  const note = notifications.find((n) => n.msg === m);
  if (note) removeNotification(note);
}
