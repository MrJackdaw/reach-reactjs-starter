import { PeraWalletConnect } from "@perawallet/connect";
import AudioEngine from "./AudioEngine.js";

/** This class was stolen from @reach-sh/stdlib v0.1.11-rc.6 */
export default class PeraConnect {
  pc: any;

  accounts: Array<any>;

  audioEngine: AudioEngine | undefined;

  constructor(pc: any = false) {
    this.pc = pc;
    this.accounts = [];
  }

  async ensurePC() {
    if (this.audioEngine) {
      this.audioEngine.loopAudio();
    } else {
      this.audioEngine = new AudioEngine();
      this.audioEngine.loopAudio();
    }

    if (this.pc) {
      return;
    }
    this.pc = new PeraWalletConnect();
    this.pc.reconnectSession().then((accts: any) => {
      this.accounts = accts;
    });
  }

  async disconnect() {
    this.pc.disconnect();
    this.accounts = [];
  }

  async ensureSession() {
    await this.ensurePC();
    if (this.accounts.length === 0) {
      this.accounts = await this.pc.connect();
    }
  }

  async getAddr(): Promise<string> {
    await this.ensureSession();
    return this.accounts[0];
  }

  async signTxns(txns: string[]): Promise<string[]> {
    await this.ensureSession();
    return this.pc.signTransaction(txns.map((txn) => ({ txn })));
  }
}
