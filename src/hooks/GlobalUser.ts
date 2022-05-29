import { useEffect, useState } from "react";
import store from "state";

/**
 * Listen for specific `User` data from global state. You can modify this,
 * or remove the file/directory if you don't need it.
 * @returns User data
 */
export function useGlobalUser() {
  const gState = store.getState();
  type S = Partial<typeof gState>;

  const [state, setState] = useState({
    address: gState.address,
    account: gState.account,
    assets: gState.assets,
    loading: gState.loading,
    error: gState.error,
  });
  const onAppState = (s: S) => setState((prev) => ({ ...prev, ...s }));
  const userKeys: (keyof S)[] = [
    "address",
    "account",
    "assets",
    "loading",
    "error",
  ];

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => store.subscribeToKeys(onAppState, userKeys), []);

  const updates = { ...state };
  return updates;
}
