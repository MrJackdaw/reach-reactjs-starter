import { loadStdlib } from "@reach-sh/stdlib";
import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";
import { NETWORKS, NETWORK_STORAGE_KEY, PROVIDERS } from "./constants";
import { NetworkData, ReachAccount, ReachStdLib } from "./reach-types";
import ReachStore from "./store";

/** `StdLib` instance */
let reach: ReachStdLib;

/** Global default reach object */
export const useReach = () => {
  if (!reach) {
    // Instantiate Reach object
    reach = loadStdlib({
      REACH_CONNECTOR_MODE: getCurrentNetwork(),
    });

    try {
      // use MyAlgoWallet for Algorand network | ETH will default to MetaMask
      if (reach.connector === NETWORKS.ALGO.abbr) {
        const providerEnv = getNetworkProvider();
        reach.setWalletFallback(
          reach.walletFallback({ providerEnv, MyAlgoConnect })
        );
      }
    } catch (e) {
      ReachStore.error(`Error setting provider: ${JSON.stringify(e, null, 2)}`);
    }
  }

  return reach;
};

/**
 * Connect user Wallet (MyAlgoWallet)
 */
export async function connectWallet() {
  if (!reach) useReach();

  try {
    ReachStore.loading(true);
    const account: ReachAccount = await reach.getDefaultAccount();
    const balance = reach.formatCurrency(await reach.balanceOf(account), 4);
    // Notify user
    ReachStore.multiple({
      address: reach.formatAddress(account.getAddress()),
      account,
      balance,
      notification: "Account connected!",
      loading: false,
    });
  } catch (e: any) {
    ReachStore.error(e.message || e);
  }
}

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
  return stored || setCurrentNetwork(defaultNetwork);
}

/** Determine whether app should run on `MainNet` or `TestNet` */
export function getNetworkProvider() {
  return process.env.NODE_ENV === "production"
    ? PROVIDERS.MAINNET
    : PROVIDERS.TESTNET;
}

/** Store user network selection for App */
function setCurrentNetwork(network: string): string {
  ReachStore.currentNetwork(network);
  localStorage.setItem(NETWORK_STORAGE_KEY, network);
  return network;
}
