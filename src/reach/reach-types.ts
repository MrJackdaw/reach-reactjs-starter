import { Stdlib_User as StdLibUser } from "@reach-sh/stdlib/interfaces";

/** Reach StdLib instance */
type BigNumber = any;

export type ConnectorInterface = {
  fetchAccount(who: string | ReachAccount): any | Promise<any>;
  loadAssets(who: string | ReachAccount): any | Promise<any>;
};

export type ReachToken = {
  id: number | string;
  name: string;
  symbol: string;
  url: string;
  amount?: number | any;
  supply: string | number;
  decimals: number;
};

/** A reach-connected Network Account representation */
export type ReachAccount = {
  networkAccount: { addr?: string; address?: string; [x: string]: any };
  /** @deprecated - Use `reachAccount.contract(backend)` instead */
  attach<T extends Record<string, any>>(
    backend: T,
    contractInfo: any | Promise<any>
  ): ReachContract<T>;
  /** @deprecated - Use `reachAccount.contract(backend)` instead */
  deploy<T extends Record<string, any>>(
    backend: T | Promise<any>
  ): ReachContract<T>;
  contract<T extends Record<string, any>>(
    backend: T,
    contractInfo?: any
  ): ReachContract<T>;
  getAddress(): string;
  setDebugLabel(label: string): ReachAccount;
  tokenAccept(tokenId: string | number): Promise<void>;
  tokenMetadata(tokenId: string | number): Promise<{ [x: string]: any }>;
};

export type ReachContract<T extends Record<string, any>> = {
  /** Get contract address */
  getInfo(): Promise<any>;
  /** Get deployed contract address */
  getContractAddress(): Promise<string | number>;
  /** Reach Contract `API` member */
  a: T["_APIs"];
  /** Reach Contract `API` member */
  apis: T["_APIs"];
  /** Reach Contract `Participant` member */
  p: T["_Participants"];
  /** Reach Contract `Participant` member */
  participants: T["_Participants"];
  /** Reach Contract `View` member */
  v: CtcLabeledFunc<any>;
  /** Reach Contract `View` member */
  views: CtcLabeledFunc<any>;
  /** Reach Contract `Events` member */
  e: ReachEventStream;
  /** Reach Contract `Events` member */
  events: ReachEventStream;
  /** @deprecated Get contract `Views`. Use `ctc.views` or `ctc.v` */
  getViews(): CtcLabeledFunc<any>;
};

/** `ReachEvent` is an `Event` emitted from a contract `EventStream` */
export type ReachEvent<T extends any> = { when: any; what: T };

/** `ReachEvent` is an `Event` emitted from a contract `EventStream` */
export type ReachEventStream = {
  [name: string]: {
    next(): Promise<ReachEvent<any>>;
    seek(t: BigNumber): void;
    seekNow(): Promise<void>;
    lastTime(): Promise<BigNumber>;
    monitor(handler: (e: ReachEvent<any>) => void): Promise<void>;
  };
};

/** `NetworkData` describes single network data-item (for e.g. Ethereum) */
export type NetworkData = {
  name: string;
  abbr: string;
  active?: boolean;
  decimals?: number;
};

/** StdLib Helper Interface */
export type ReachStdLib = StdLibUser<{ [x: string]: any }> & {
  [x: string]: any;
};

/** Reach Contract `API` Function(s) */
export type CtcFn = { (...args: any[]): any | Promise<any> };

/** Reach Contract `View` member */
export type CtcLabeledFunc<T extends any> =
  | CtcFnGroup<T>
  | { [fnName: string]: CtcFn };

/** Reach Contract Method (function) grouping */
export type CtcFnGroup<T> = {
  [k in keyof T]: CtcFn;
};
