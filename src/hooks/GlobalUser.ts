import { useEffect, useState } from "react";
import store from "state";

export function useGlobalUser() {
  const gState = store.getState();
  const [user, setUser] = useState(gState.address);
  const [account, setAccount] = useState<typeof gState["account"]>();
  const [assets, setAssets] = useState<typeof gState["assets"]>();
  const onAppState = (s: Partial<typeof gState>) => {
    if (s.address) setUser(s.address);
    if (s.account) setAccount(s.account);
    if (s.assets) setAssets(s.assets);
  };

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() =>
    store.subscribeToKeys(onAppState, ["address", "account", "assets"])
  );

  return { user, account, assets };
}
