import MyAlgoConnect from "@randlabs/myalgo-connect";
import WalletConnect from "@reach-sh/stdlib/ALGO_WalletConnect";
import store, { resetNotifications, updateNotification } from "state";
import { ReachAccount } from "./reach-types";
import { useReach, getProviderEnv, reach, connectorInterface } from "./index";

/** Configure stdlib wallet fallback */
function setWalletFallback(opts: any) {
  const { walletFallback, setWalletFallback } = useReach();
  const providerEnv = getProviderEnv();
  const fallback = walletFallback({ ...opts, providerEnv });

  setWalletFallback(fallback);
}

/** Configure `stdlib` to fallback to `MyAlgo` as wallet provider */
export function useMyAlgo() {
  localStorage.removeItem("walletconnect");
  return setWalletFallback({ MyAlgoConnect });
}

/** Configure `stdlib` to fallback to `WalletConnect` as wallet provider */
export function useWalletConnect() {
  localStorage.removeItem("user");
  return setWalletFallback({ WalletConnect });
}

/** Connect user Wallet */
export async function connectWallet() {
  const { getDefaultAccount } = useReach();
  try {
    store.loading(true);
    const account: ReachAccount = await getDefaultAccount();
    return hydrateUser(account);
  } catch (e: any) {
    store.error(e.message || e);
    return null;
  }
}

export function checkSessionExists() {
  const wc: any = localStorage.getItem("walletconnect");
  const myalgo = localStorage.getItem("user");
  let addr = null;
  if (Array.isArray(wc?.accounts)) addr = wc.accounts[0];
  if (myalgo) addr = myalgo;

  return {
    exists: [myalgo, wc].some((val) => Boolean(val)),
    isWCSession: Boolean(wc),
    addr,
  };
}

export function disconnectUser() {
  store.reset();
  localStorage.removeItem("user");
  localStorage.removeItem("walletconnect");
  window.location.reload();
}

export async function reconnectUser(addr: string) {
  if (!addr) return null;
  const acc = await (checkSessionExists().isWCSession
    ? reach.getDefaultAccount()
    : reach.connectAccount({ addr }));
  return hydrateUser(acc);
}

async function hydrateUser(account: ReachAccount) {
  const reach = useReach();
  const address = reach.formatAddress(account.getAddress());
  const alertId = resetNotifications("⏳ Fetching assets ...");
  const [bigBal, assetUpdates] = await Promise.all([
    reach.balanceOf(account),
    connectorInterface.loadAssets(account),
  ]);

  persistUser(address);

  // Notify user
  store.multiple({
    account,
    address,
    balance: reach.formatCurrency(bigBal, 4),
    initialized: true,
    loading: false,
    ...assetUpdates,
  });

  updateNotification(alertId, "✅ Assets fetched");
  return account;
}

function persistUser(addr: string) {
  if (localStorage.getItem("walletconnect")) return;
  localStorage.setItem("user", addr);
}
