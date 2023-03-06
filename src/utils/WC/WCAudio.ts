/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import AudioEngine from "./AudioEngine.js";

// NOTE: WebAudio will only be allowed in an iOS browser if it's triggered
// after a user interaction (click for example).

const makePromise = <A>(): [Promise<A>, (a: A) => any] => {
  let r = (a: A): any => {
    // eslint-disable-next-line no-void
    void a;
    throw new Error("promise never initialized");
  };
  const p: Promise<A> = new Promise((resolve) => {
    r = resolve;
  });
  return [p, r];
};

class Signal {
  p: Promise<boolean>;

  r: (a: boolean) => void;

  constructor() {
    [this.p, this.r] = makePromise();
  }

  wait() {
    return this.p;
  }

  notify() {
    this.r(true);
  }
}

export default class AlgoWalletConnect {
  wc: WalletConnect | null;

  connected: Signal;

  audioEngine: AudioEngine | undefined;

  constructor() {
    console.log("AWC ctor");
    this.wc = null;
    this.connected = new Signal();
    this.audioEngine = undefined;
  }

  async ensureWC() {
    console.log("AWC ensureWC");
    if (this.audioEngine) this.audioEngine.loopAudio();
    else {
      this.audioEngine = new AudioEngine();
      this.audioEngine.loopAudio();
    }

    if (this.wc) return this.wc;

    const wc = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal
    });

    const onConnect = (err: any, payload: any) => {
      console.log("AWC onConnect", { err, payload });
      if (err) throw err;
      this.connected.notify();
    };

    wc.on("session_update", onConnect);
    wc.on("connect", onConnect);
    console.log("AWC ensureWC", wc?.session.key);

    this.wc = wc;
    return this.wc;
  }

  async disconnect() {
    return !this.wc || !this.wc.connected
      ? Promise.resolve()
      : this.wc.killSession();
  }

  async ensureSession() {
    const wc = await this.ensureWC();

    if (!wc.connected) await wc.createSession();
    else this.connected.notify();
    return wc;
  }

  async getAddr(): Promise<string> {
    const wc = await this.ensureSession();
    await this.connected.wait();

    return wc.accounts[0];
  }

  async signTxns(txns: string[]): Promise<string[]> {
    const wc = await this.ensureSession();
    const req = {
      method: "algo_signTxn",
      params: [txns.map((txn) => ({ txn }))]
    };
    console.log("AWC signTxns ->", req);
    try {
      const res = await wc.sendCustomRequest(req);
      console.log("AWC signTxns <-", res);
      return res;
    } catch (e: any) {
      console.log("AWC signTxns err", e);
      throw e;
    }
  }
}
