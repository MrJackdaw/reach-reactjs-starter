import { Stdlib_User } from "@reach-sh/stdlib/interfaces";

/** Reach StdLib instance */
type BigNumber = any;

/** A reach-connected Network Account representation */
export type ReachAccount = {
  networkAccount: { addr?: string; address?: string; [x: string]: any };
  getAddress(): string;
  setDebugLabel(label: string): ReachAccount;
  tokenAccept(tokenId: string | number): Promise<void>;
  tokenMetadata(): Promise<{ [x: string]: any }>;
};

/** `NetworkData` describes single network data-item (for e.g. Ethereum) */
export type NetworkData = {
  name: string;
  abbr: string;
  active?: boolean;
  decimals?: number;
};

/** StdLib Helper Interface */
export type ReachStdLib = Stdlib_User<{}> & {
  /* Properties */
  atomicUnit: string;
  connector: string;
  minimumBalance: BigNumber;
  standardUnit: string;

  /* Methods */
  addressEq(a: string | ReachAccount, b: string | ReachAccount): boolean;
  // Arithmetic
  /** Add two values (number, big number, or combo) */
  add(a: number | BigNumber, b: number | BigNumber): BigNumber;
  /** Subtract two values (number, big number, or combo) */
  sub(a: number | BigNumber, b: number | BigNumber): BigNumber;
  /** Modulo of two values (number, big number, or combo) */
  mod(a: number | BigNumber, b: number | BigNumber): BigNumber;
  /** Multiply two values (number, big number, or combo) */
  mul(a: number | BigNumber, b: number | BigNumber): BigNumber;
  /** Divide two values (number, big number, or combo) */
  div(a: number | BigNumber, b: number | BigNumber): BigNumber;
  /** Others */
  balanceOf(acc: ReachAccount, token?: any): Promise<BigNumber>;
  bigNumberToHex(uInt: BigNumber): string;
  bigNumberify(uInt: number | BigNumber): BigNumber;
  // bigNumberToNumber(num: any) BigNumber
  bytesEq(a: string, b: string): boolean;
  connectAccount(acc: any & { addr: string }): Promise<ReachAccount>;
  createAccount(): Promise<ReachAccount>;
  digestEq(a: string, b: string): boolean;
  formatAddress(addr: string): string;
  formatCurrency(amt: BigNumber, decimals?: number): string;
  fundFromFaucet(account: ReachAccount, balance: any): Promise<void>;
  getDefaultAccount(): Promise<ReachAccount>;
  getNetworkSecs(): void;
  getNetworkTime(): void;
  hexToBigNumber(bytes: string): BigNumber;
  isHex(x: any): boolean;
  newAccountFromMnemonic(phrase: string): Promise<ReachAccount>;
  newAccountFromSecret(secret: string): Promise<ReachAccount>;
  newTestAccount(balance: BigNumber): Promise<ReachAccount>;
  newTestAccounts(howMany: number, balance: any): Promise<ReachAccount[]>;
  parseCurrency(amt: string | any): BigNumber;
  providerEnvByName(prv: "TestNet"): any;
  setProviderByName(prv: string): void;
  stringToHex(s: string): string;
  transfer(
    from: ReachAccount,
    to: ReachAccount,
    amt: BigNumber,
    token?: any
  ): any;
  uintToBytes(uInt: BigNumber): string;
  wait(delta: BigNumber): Promise<BigNumber>;
  waitUntilSecs(secs: BigNumber): Promise<BigNumber>;
  waitUntilTime(time: BigNumber): Promise<BigNumber>;
};
