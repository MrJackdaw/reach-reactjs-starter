import { useReach } from "reach";
import ReachStore from "reach/store";
import store from "state/index";

/**
 * Initiate Wallet connection
 */
export async function connectWallet() {
  try {
    const reach = useReach();
    const reachAcct = await reach.getDefaultAccount();
    const balance = reach.formatCurrency(await reach.balanceOf(reachAcct), 4);
    if (process.env.NODE_ENV === "development") {
      await reach.fundFromFaucet(reachAcct, reach.parseCurrency(3));
    }
    ReachStore.multiple({
      account: reachAcct,
      balance,
    });
  } catch (e: any) {
    store.error(e.message || e);
  }
}

/**
 * Connect an address to the application
 * @param {string} user User account address string
 */
export async function selectPrimaryAddress(user: any) {
  console.log(user);
  return null;
}
