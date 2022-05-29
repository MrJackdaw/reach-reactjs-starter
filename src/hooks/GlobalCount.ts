import { useEffect, useState } from "react";
import store from "state";

/**
 * This is ABSOLUTELY an example hook. You can modify or remove it if
 * you are familiar with reusing hooks. Like most of this codebase, it
 * is an example of best-practices in sharing global state between
 * components. Don't forget that you can replace `@jackcom/raphsducks` with
 * your state management library of choice, like `redux`.
 *
 * @description Reusable subscription to global state for updates to the
 * `globalCount` property ONLY.
 * @returns An object with a `globalCount` (and whatever else you want)
 */
export function useGlobalCount() {
  const gState = store.getState();
  const [count, setCount] = useState(gState.globalCount);
  const onAppState = (s: Partial<typeof gState>) => {
    if (s.globalCount) setCount(s.globalCount);
  };

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => store.subscribeToKeys(onAppState, ["globalCount"]), []);

  return { globalCount: count };
}
