import { loadStdlib } from "@reach-sh/stdlib";
import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";
import WalletConnect from "@reach-sh/stdlib/ALGO_WalletConnect";
import store, { addNotification } from "state";
import { NETWORKS, NETWORK_STORAGE_KEY, PROVIDERS } from "./constants";
import { NetworkData, ReachAccount, ReachStdLib } from "./reach-types";

/** `StdLib` instance */
let reach: ReachStdLib;

/** Global default reach object */
export const useReach = () => {
  if (!reach) {
    // Instantiate Reach object
    reach = loadStdlib({ REACH_CONNECTOR_MODE: getCurrentNetwork() });

    try {
      return reach;
    } catch (e) {
      store.error(`Error setting provider: ${JSON.stringify(e, null, 2)}`);
    }
  }

  return reach;
};

export function useMyAlgo() {
  const reach = useReach();
  const providerEnv = getNetworkProvider();
  reach.setWalletFallback(
    reach.walletFallback({
      providerEnv,
      MyAlgoConnect,
    })
  );
  connectWallet();
}

export function useWalletConnect() {
  const reach = useReach();
  const providerEnv = getNetworkProvider();
  reach.setWalletFallback(
    reach.walletFallback({
      providerEnv,
      WalletConnect,
    })
  );
  connectWallet();
}

/**
 * Connect user Wallet (MyAlgoWallet)
 */
export async function connectWallet() {
  if (!reach) useReach();

  try {
    store.loading(true);
    addNotification("🔑 Connecting Account ... ");
    const account: ReachAccount = await reach.getDefaultAccount();
    const address = reach.formatAddress(account.getAddress());
    addNotification("🔑 Fetching balance ... ");
    const balance = reach.formatCurrency(await reach.balanceOf(account), 4);

    // Notify user
    store.multiple({
      address,
      account,
      balance,
      loading: false,
    });

    return account;
  } catch (e: any) {
    store.error(e.message || e);
    return null;
  }
}

export function disconnectUser() {
  store.reset();
  window.location.reload();
}

export function formatCurrency(val: any) {
  if (!reach) useReach();
  const { connector } = reach;
  const decimals = NETWORKS[connector].decimals as number;
  return reach.formatCurrency(val, decimals);
}

export type ReachToken = {
  id: string;
  name: string;
  symbol: string;
  url: string;
  amount: any;
  supply: string | number;
  decimals: number;
};

export function formatReachTokenMetadata(
  tokenId: any,
  amount: any,
  data: any
): ReachToken {
  const id = parseContractAddress(tokenId);
  const fallbackName = `Asset #${id}`;
  const fallbackSymbol = `#${id}`;
  const shrink = (v: any) => {
    try {
      return reach.isBigNumber(v) ? reach.bigNumberToNumber(v) : v;
    } catch (error) {
      return Number.MAX_SAFE_INTEGER;
    }
  };

  return {
    id: parseContractAddress(tokenId),
    name: trimByteString(data.name) || fallbackName,
    symbol: trimByteString((data.symbol || fallbackSymbol).toUpperCase()),
    url: trimByteString(data.url),
    amount: shrink(amount),
    supply: shrink(data.supply),
    decimals: shrink(data.decimals),
  };
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

export async function loadAlgoAssets(acc: ReachAccount) {
  // @ts-ignore
  const indexer = await window.algorand.getIndexer();
  if (!indexer) return [];

  addNotification("⏳ Fetching account ... ");
  const reach = useReach();
  const address = reach.formatAddress(acc.getAddress());
  const { account } = await indexer
    .lookupAccountByID(address)
    .do()
    .catch(() => ({ account: { assets: [] } }));

  const { assets = [] } = account;
  addNotification("⏳ Fetching assets ... ");
  const all = await Promise.all(
    assets
      .filter((a: any) => a.amount > 0)
      .map((a: any) => tokenMetadata(a["asset-id"], acc))
  );

  store.assets(all);
}

/**
 * Parses a contract address for Algorand or other chains
 * @param {string|number} addr string|number contract address
 * @returns string|number contract address
 */
export function parseContractAddress(addr: any) {
  let ctcInfo: any;
  if (useReach().connector !== "ALGO") {
    const pit = addr.toString().trim().replace(/\0.*$/g, "");
    ctcInfo = pit.startsWith("0x") ? pit : "0x" + pit;
  } else ctcInfo = parseInt(addr);
  return ctcInfo;
}

export async function tokenMetadata(token: any, acc: ReachAccount) {
  const reach = useReach();
  const [metadata, bal] = await Promise.all([
    acc.tokenMetadata(token),
    reach.balanceOf(acc, token),
  ]);

  return formatReachTokenMetadata(token, bal, metadata);
}

/** Store user network selection for App */
function setCurrentNetwork(network: string): string {
  store.currentNetwork(network);
  localStorage.setItem(NETWORK_STORAGE_KEY, network);
  return network;
}

/**
 * Strip `\0000` characters from byte string
 * @param {stringn} str String with empty `\0000` characters to remove
 * @returns
 */
export function trimByteString(str: string): string {
  return str && str.replace(/\0/g, "");
}

/**
 * Truncates Account string to `XXXX...XXXX`
 * @param {string} acct Account string
 * @returns {string}
 */
export function truncateAccountString(acct: string): string {
  const { length } = acct;
  const start = acct.substr(0, 4);
  return `${start}...${acct.substr(length - 4, length)}`;
}
