import { version } from "../../package.json";

export const noOp = () => null;

export const APP_VERSION = version;
const APP_VERSION_KEY = "app-version";

/** App Migration helper: check if your app version has changed */
export async function checkVersionChanged() {
  const currentVersion = APP_VERSION;
  const lastVersion = localStorage.getItem(APP_VERSION_KEY);
  return currentVersion !== lastVersion;
}
