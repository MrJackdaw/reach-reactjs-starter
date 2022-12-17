import { useEffect, useState } from "react";
import store, { GlobalStore, GlobalStoreKey } from "state";

const defKeys: GlobalStoreKey[] = [
  "address",
  "account",
  "assets",
  "loading",
  "error"
];

type HookState = Partial<GlobalStore>;

/**
 * Listen for specific `User` data from global state. You can modify this,
 * or remove the file/directory if you don't need it.
 *
 * You can supply a list of keys to limit updates. For example, do this to
 * subsscribe to only 'address' changes:
 *
 * const { address } = useGlobalUser(['address'])
 * @returns User data
 */
export function useGlobalUser(keys: GlobalStoreKey[] = defKeys) {
  // Read global state and initialize the props you care about
  const global = store.getState();
  const init = keys.reduce((agg, k) => ({ ...agg, [k]: global[k] }), {});

  // Initialize internal state, and create a function that responds to
  // changes in global state
  const [state, setState] = useState<HookState>(init);
  const onAppState = (s: Partial<GlobalStore>) =>
    setState((prev) => ({ ...prev, ...s }));

  // Subscribe to global state: unsubscribe on component unmount
  useEffect(() => store.subscribeToKeys(onAppState, keys), []);

  return { ...state };
}
