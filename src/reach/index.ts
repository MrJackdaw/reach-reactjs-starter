import store, {
  addNotification,
  updateAsError,
  updateNotification
} from "state";
import {
  ReachAccount,
  ReachToken,
  connectUser,
  checkSessionExists,
  reconnectUser,
  disconnectUser,
  tokenMetadata as getReachToken,
  optInToAsset,
  loadReachWithOpts,
  ReachEnvOpts
} from "@jackcom/reachduck";
import { loadStdlib, ALGO_MakeWalletConnect } from "@reach-sh/stdlib";
import WalletConnect from "utils/WC/WCAudio";
import AlgoQRModal from "algorand-walletconnect-qrcode-modal";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import MakePeraConnect from "utils/WC/PeraWCClient";

/** Connect user Wallet */
export async function connect(provider: string) {
  configureWalletProvider(provider);
  const updates = await connectUser();
  store.multiple(updates);
  return updates.account;
}

/** Reconnect user session */
export async function reconnect() {
  const { addr = undefined, isWCSession } = checkSessionExists();
  if (isWCSession) {
    debugger;
    configureWalletProvider(isWCSession ? "WalletConnect" : "MyAlgo");
    // PeraConnect
  } else configureWalletProvider("MyAlgo");
  const updates = await reconnectUser(addr);
  store.multiple(updates);
  return updates.account;
}

/** Dissconnect user session */
export async function disconnect() {
  store.reset();
  const { walletClient } = store.getState();
  if (walletClient) walletClient.disconnect();
  addNotification("Disconnecting ... ");
  disconnectUser();
}

/** Opt-in to an asset */
export async function inlineAssetOptIn(
  alertId: any,
  acc: ReachAccount,
  tokenId: any
) {
  updateNotification(alertId, `⭐️ Opt-in to token!`, true);

  const [asset, accepted] = await Promise.all([
    tokenMetadata(tokenId, acc),
    optInToAsset(acc, tokenId)
  ]);

  if (accepted) {
    const { assets } = store.getState();
    store.assets([...assets, asset]);
    updateNotification(alertId, `✅ Accepted Token`);
  } else updateAsError(alertId, `Asset opt-in failed!`);

  return accepted;
}

/**
 * Fetch asset details by ID (requires an account):
 * will also fetch user balance of token
 */
export async function tokenMetadata(
  token: any,
  acc: ReachAccount | null
): Promise<ReachToken> {
  if (!acc) return {} as ReachToken;
  const metadata = await getReachToken(token, acc);
  return metadata;
}

/** (Algorand) check whether a user has "opted-in" to a token */
export async function checkHasToken(token: any) {
  const { account } = store.getState();
  return account?.tokenAccepted(token) || Promise.resolve(false);
}

/** Initialize the `stdlib` instance according to the wallet provider. */
function configureWalletProvider(pr: string) {
  if (!["WalletConnect", "PeraConnect", "MyAlgo"].includes(pr)) return;
  const opts: ReachEnvOpts = { network: "TestNet" };
  const loadWalletClient = (client: { disconnect(): any }) => {
    opts.walletFallback = {
      WalletConnect: function _makeFallback() {
        store.walletClient(client);
        return client;
      }
    };
    return loadReachWithOpts(loadStdlib, opts);
  };

  switch (pr) {
    case "WalletConnect": {
      const WalletClient = ALGO_MakeWalletConnect(WalletConnect, AlgoQRModal);
      return loadWalletClient(new WalletClient());
    }
    case "PeraConnect": {
      const WalletClient = MakePeraConnect();
      return loadWalletClient(new WalletClient());
    }
    default:
      opts.walletFallback = { MyAlgoConnect };
      return loadReachWithOpts(loadStdlib, opts);
  }
}
