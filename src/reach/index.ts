import { loadStdlib } from "@reach-sh/stdlib";
import { NETWORKS, NETWORK_STORAGE_KEY, PROVIDERS } from "./constants";
import { NetworkData, ReachStdLib } from "types/shared";
import ReachStore from "./store";

/** `StdLib` instance */
let reach: ReachStdLib;

/** Global default reach object */
export const useReach = () => {
  if (!reach) {
    // Instantiate Reach object
    reach = loadStdlib(getCurrentNetwork());

    try {
      // Force app to use browser extension to connect: skip ETH
      if (reach.connector !== NETWORKS.ETH.abbr)
        reach.setProviderByName(getNetworkProvider());
    } catch (e) {
      ReachStore.error(`Error setting provider: ${JSON.stringify(e, null, 2)}`);
    }
  }

  return reach;
};

/** Get a UI-friendly list of Networks */
export function getAllNetworks(): NetworkData[] {
  const activeNetwork = getCurrentNetwork();

  return Object.keys(NETWORKS).map((k) => ({
    active: NETWORKS[k].abbr === activeNetwork,
    ...NETWORKS[k],
  }));
}

/**
 * Get last user-saved (or default) network for App. Sets the default
 * to `Algorand` if this is the user's first time in the application.
 */
export function getCurrentNetwork(): string {
  const defaultNetwork = NETWORKS.ALGO.abbr;
  const stored = localStorage.getItem(NETWORK_STORAGE_KEY);
  return stored ? stored : setCurrentNetwork(defaultNetwork);
}

/** Determine whether app should run on `MainNet` or `TestNet` */
export function getNetworkProvider() {
  return PROVIDERS.TESTNET;
  // TODO renable testnet/mainnet toggle when we go live
  // process.env.NODE_ENV === 'production'
  //   ? PROVIDERS.MAINNET
  //   : PROVIDERS.TESTNET
}

/** Store user network selection for App */
function setCurrentNetwork(network: string): string {
  ReachStore.currentNetwork(network);
  localStorage.setItem(NETWORK_STORAGE_KEY, network);
  return network;
}
