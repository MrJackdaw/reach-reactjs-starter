import { version } from "../../package.json";

export const noOp = () => null;

export const APP_VERSION = version;

/**
 * Unwrap a `Maybe` value. When `mVal[0]` is `"Some"`, `mVal[1]`
 * has a value
 */
export function fromMaybe(
  mVal: [val: "Some" | "None", v: any],
  format = (v: any) => v,
  fallback?: any
): any | null {
  return mVal[0] === "Some" ? format(mVal[1]) : fallback || mVal[1];
}

export function isImageFile(path: string) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(path);
}

export function isVideoFile(path: string) {
  return /\.(mov|mp4|mpe?g|mkv|avi|webm|wmv)$/i.test(path);
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
  const start = acct.substring(0, 7);
  return `${start}...${acct.substring(length - 6, length)}`;
}

export function intlFormatCurrency(val: number) {
  const intlFmt = Intl.NumberFormat();
  return intlFmt.format(val);
}
