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
  attach(backend: any, contractInfo: any | Promise<any>): ReachContract;
  /** @deprecated - Use `reachAccount.contract(backend)` instead */
  deploy(backend: any | Promise<any>): ReachContract;
  contract(backend: any, contractInfo?: any): ReachContract;
  getAddress(): string;
  setDebugLabel(label: string): ReachAccount;
  tokenAccept(tokenId: string | number): Promise<void>;
  tokenMetadata(tokenId: string | number): Promise<{ [x: string]: any }>;
};

/** Reach Contract `Participant` member */
type RCParticipant = {
  [participantName: string]: (interact: any) => Promise<any>;
};
/** Reach Contract `View` member */
type RCView = { [viewName: string]: { [viewProp: string]: RCFn } };
/** Reach Contract `API` member */
type RCApi = { [apiName: string]: { [apiMethod: string]: RCFn } };

type RCFn = {
  (...args: any[]): Promise<any>;
};

export type ReachContract = {
  getInfo(): Promise<any>;
  getContractAddress(): Promise<string | number>;
  /** Reach Contract `API` member */
  a: RCApi;
  /** Reach Contract `API` member */
  apis: RCApi;
  /** Reach Contract `Participant` member */
  p: RCParticipant;
  /** Reach Contract `Participant` member */
  participants: RCParticipant;
  /** Reach Contract `View` member */
  v: RCView;
  /** Reach Contract `View` member */
  views: RCView;
  /** @deprecated Get contract `Views`. Use `ctc.views` or `ctc.v` */
  getViews(): RCView;
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
