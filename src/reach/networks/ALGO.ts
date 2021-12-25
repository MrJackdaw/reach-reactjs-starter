import { formatAddress, tokenMetadata } from "reach";
import { ReachAccount } from "reach/reach-types";

export default {
  fetchAccount,
  loadAssets,
};

const emptyAcct = { assets: [], "created-apps": [] };

async function fetchAccount(address: string): Promise<any> {
  // @ts-ignore
  const indexer = await window.algorand.getIndexer();
  if (!indexer) return emptyAcct;

  return indexer
    .lookupAccountByID(address)
    .do()
    .catch(() => ({ account: emptyAcct }))
    .then(({ account }: { account: any }) => account);
}

async function loadAssets(acc: ReachAccount) {
  const { assets = [], "created-apps": apps = [] } = await fetchAccount(
    formatAddress(acc)
  ).catch(() => emptyAcct);
  const { length } = apps;
  const appsCount: any = { length };
  const plural = appsCount.length === 1 ? "app" : "apps";
  appsCount.description = `${length} ${plural} created`;
  const updates: any = { appsCount };

  if (assets.length) {
    const meta = assets.map((a: any) => tokenMetadata(a["asset-id"], acc));
    updates.assets = await Promise.all(meta);
  } else updates.assets = [];

  return updates;
}
