import { useEffect, useState } from "react";
import store from "state";

export function useGlobalCount() {
  const gState = store.getState();
  const [count, setCount] = useState(gState.globalCount);
  const onAppState = (s: Partial<typeof gState>) => {
    if (s.globalCount) setCount(s.globalCount);
  };

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => store.subscribeToKeys(onAppState, ["globalCount"]));

  return { globalCount: count };
}
