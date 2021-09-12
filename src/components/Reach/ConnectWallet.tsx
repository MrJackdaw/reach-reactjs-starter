import { WalletConnectionProps } from "types/shared";
import { connectWallet } from "reach";
import ReachStore from "reach/store";
import { truncateAccountString } from "reach/utils";
// Views
import Button from "components/Forms/Button";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const [state, setState] = useState<WalletConnectionProps>({});
  const connected = Boolean(state.account);
  const disconnect = () => ReachStore.reset();

  useEffect(() => ReachStore.subscribe((store) => setState(store)));

  return connected ? (
    <Button onClick={disconnect}>
      {truncateAccountString(state.address!)}
    </Button>
  ) : (
    <Button onClick={connectWallet}>
      {state.error ? (
        "Connect Error"
      ) : (
        <>
          {state.loading && (
            <span className="spinner--before">Loading ...</span>
          )}
          {!state.loading && "Connect Wallet"}
        </>
      )}
    </Button>
  );
};

export default ConnectWallet;