import createState from "@jackcom/raphsducks";
import { NETWORKS } from "@jackcom/reachduck";

/**
 * This is your state definition. Add any properties you need here.
 */
const initialState = {
  appsCount: 0,

  initialized: false,

  /** Notifications */
  notifications: [] as Alert[],

  /** Wallet address (for UI) */
  address: "",

  /** Reach `networkAccount` instance */
  account: null as any | null,

  /** Reach `networkAccount` instance */
  accountsList: [] as any[],

  assets: [] as any[],

  /** Reach `networkAccount` balance */
  balance: "0.00",

  /** Current configured network */
  currentNetwork: NETWORKS.ALGO.abbr,

  /** Error messages */
  error: "",

  /** Loading state */
  loading: false
};

/**
 * Your global application state `instance`. Every property in `initialState`
 * will become a method the state `instance`, so e.g. to update `appsCount`, you
 * call `store.appsCount( number )`. You can create as many state instances as
 * you need.
 */
const store = createState(initialState);
export default store;

export type GlobalStore = ReturnType<typeof store.getState>;

/** A global counter state. Used to demo the "global count" button */
export const counter = createState({ globalCount: 0 });

export type Alert = {
  msg: string;
  time: number;
  persistent?: boolean;
  error?: boolean;
};

export function addNotification(
  msg: string | Alert,
  persist = false,
  additional = {}
) {
  const note = (msg as Alert).time
    ? (msg as Alert)
    : createAlert(msg as string, persist);
  const { notifications: old } = store.getState();
  const notifications = [...old, note];
  store.multiple({ notifications, ...additional });
  return note.time;
}

export function resetNotifications(msg?: string, persist = false) {
  const updates = [];
  let msgId = null;
  if (msg) {
    const notification = createAlert(msg, persist);
    msgId = notification.time;
    updates.push(notification);
  }
  store.notifications(updates);
  return msgId;
}

export function removeNotification(
  msg: Alert,
  additional: Partial<GlobalStore> = {}
) {
  const { notifications } = store.getState();
  const i = notifications.findIndex((n) => n.time === msg.time);
  if (i === -1) return;

  const updates = [...notifications];
  updates.splice(i, 1);
  store.multiple({ notifications: updates, ...additional });
}

export function updateAsError(
  id: number | null,
  msg: string,
  additional: Partial<GlobalStore> = {}
) {
  const { notifications } = store.getState();
  const msgIndex = notifications.findIndex(({ time }) => time === id);
  const newAlert = createAlert(msg, true);
  const updates = [...notifications];
  newAlert.error = true;
  newAlert.persistent = false;
  if (id) newAlert.time = id as number;
  if (msgIndex === -1) updates.push(newAlert);
  else updates.splice(msgIndex, 1, newAlert);

  store.multiple({ notifications: updates, ...additional });
}

export function updateNotification(
  id: number | null,
  msg: string,
  persist = false,
  additional: Partial<GlobalStore> = {}
) {
  const { notifications } = store.getState();
  const i = notifications.findIndex(({ time }) => time === id);
  const newAlert = createAlert(msg, true);
  const updates = [...notifications];
  newAlert.time = id as number;
  newAlert.persistent = persist;
  if (i === -1) updates.push(newAlert);
  else updates.splice(i, 1, newAlert);

  store.multiple({ notifications: updates, ...additional });
}

function createAlert(msg: string, persistent = false): Alert {
  return { msg, time: new Date().getTime(), persistent };
}
