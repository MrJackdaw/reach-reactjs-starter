import { loadStdlib } from "@reach-sh/stdlib";
import store, { checkHasToken, updateNotification } from "state";
import { trimByteString } from "utils";
import { NETWORKS, NETWORK_STORAGE_KEY, PROVIDERS } from "./constants";
import {
  ConnectorInterface,
  NetworkData,
  ReachAccount,
  ReachStdLib,
  ReachToken,
} from "./reach-types";
import loadInterface from "./networks/index.connectors";

/** `StdLib` instance */
export let reach: ReachStdLib;
export let connectorInterface: ConnectorInterface;

/** Global default reach object */
export const useReach = () => {
  if (!reach) {
    // Instantiate Reach object
    reach = loadStdlib({ REACH_CONNECTOR_MODE: getNetwork() });
    connectorInterface = loadInterface(reach.connector);
  }

  return reach;
};

/** Returns Configured Provider Environment (with e.g. AlgoIndexer and
 * AlgoDaemon urls etc) */
export function getProviderEnv() {
  const pe = useReach().providerEnvByName(getNetworkProvider());
  pe.ALGO_INDEXER_SERVER = "https://algoindexer.testnet.algoexplorerapi.io";
  return pe;
}

export function formatCurrency(val: any, dec?: number) {
  const { connector, formatCurrency: fmt } = useReach();
  const decimals = dec || (NETWORKS[connector].decimals as number);
  return fmt(val, decimals);
}

/** Asynchronously update Listings cache */
export async function inlineAssetOptIn(
  alertId: any,
  acc: ReachAccount,
  tokenId: any
) {
  return new Promise(async (resolve) => {
    if (checkHasToken(tokenId)) return resolve(true);
    updateNotification(alertId, `⭐️ Please opt-in to token!`, true);

    try {
      const [_, asset] = await Promise.all([
        acc.tokenAccept(tokenId),
        tokenMetadata(tokenId, acc),
      ]);
      const { assets } = store.getState();
      store.assets([...assets, asset]);
      return resolve(true);
    } catch (error) {
      updateNotification(alertId, `❌ Could not opt-in!`, true);
      return resolve(false);
    }
  });
}

export function formatAddress(acc: ReachAccount) {
  return useReach().formatAddress(acc.getAddress());
}

export function formatTokenMetadata(
  tokenId: any,
  amount: any,
  data: any
): ReachToken {
  const id = parseContractAddress(tokenId);
  const fallbackName = `Asset #${id}`;
  const fallbackSymbol = `#${id}`;
  const { isBigNumber, bigNumberToNumber } = useReach();
  const shrink = (v: any) => {
    try {
      return isBigNumber(v) ? bigNumberToNumber(v) : v;
    } catch (error) {
      return 0;
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
  const activeNetwork = getNetwork();

  return Object.keys(NETWORKS).map((k) => ({
    active: NETWORKS[k].abbr === activeNetwork,
    ...NETWORKS[k],
  }));
}

/**
 * Get last user-saved (or default) network for App. Sets the default
 * to `Algorand` if this is the user's first time in the application.
 */
export function getNetwork(): string {
  const defaultNetwork = NETWORKS.ALGO.abbr;
  const stored = localStorage.getItem(NETWORK_STORAGE_KEY);
  return stored || setNetwork(defaultNetwork);
}

/** Determine whether app should run on `MainNet` or `TestNet` */
export function getNetworkProvider() {
  return PROVIDERS.TESTNET;
}

/**
 * Parses a contract address for Algorand or other chains
 * @param {string|number} addr string|number contract address
 * @returns string|number contract address
 */
export function parseContractAddress(ctc: any) {
  const { isBigNumber, bigNumberToNumber } = useReach();
  const addr = isBigNumber(ctc) ? bigNumberToNumber(ctc) : ctc;

  let ctcInfo: any;
  if (useReach().connector !== "ALGO") {
    let pit = addr.toString().trim().replace(/\0.*$/g, "");
    ctcInfo = pit.startsWith("0x") ? pit : "0x" + pit;
  } else ctcInfo = parseInt(addr);
  return ctcInfo;
}

export async function tokenMetadata(token: any, acc: ReachAccount) {
  const { balanceOf } = useReach();
  const fetchToken = () =>
    acc.tokenMetadata(token).then((md) => formatTokenMetadata(token, 0, md));

  const [metadata, bal] = await Promise.all([
    fetchToken(),
    balanceOf(acc, token),
  ]);

  return metadata.id
    ? { ...metadata, amount: bal }
    : formatTokenMetadata(token, bal, metadata);
}

/** Store user network selection for App */
function setNetwork(network: string): string {
  store.currentNetwork(network);
  return network;
}
