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
