import { useEffect, useState } from "react";
import { ConnectionPropKeys, ConnectionProps } from "types/shared";
// Views
import {
  useMyAlgo,
  useWalletConnect,
  truncateAccountString,
  disconnectUser,
} from "reach";
import store, { addNotification } from "state";
import Button, { WideButton } from "components/Forms/Button";
import Modal from "components/Common/Modal";
import { FlexColumn } from "components/Common/Containers";

const PROVIDERS: any = {
  WalletConnect: useWalletConnect,
  MyAlgo: useMyAlgo,
};

const ConnectWallet = () => {
  const { account } = store.getState();
  const [state, setState] = useState<ConnectionProps>({});
  const [modal, showModal] = useState(false);
  const connect = async (prov: string) => {
    showModal(false);
    const connectUser = PROVIDERS[prov];
    if (!prov) return;

    const acc = await connectUser();
    if (acc === null) return;

    addNotification("✅ Connected!");
  };

  useEffect(
    () =>
      store.subscribeToKeys(
        (s) => setState((p) => ({ ...p, ...s})),
        ConnectionPropKeys
      ),
    [account]
  );

  return state.address ? (
    <Button onClick={disconnectUser}>
      {truncateAccountString(state.address!)}
    </Button>
  ) : (
    <>
      {state.error ? (
        <Button onClick={() => window.location.reload()}>
          <span className="material-icons">close</span>
          Connect Error
        </Button>
      ) : (
        <Button onClick={() => showModal(true)}>
          {state.loading && (
            <>
              <span className="spinner--before">Loading ...</span>
            </>
          )}
          {!state.loading && "Connect Wallet"}
        </Button>
      )}

      {modal && (
        <Modal title="Select Wallet Provider" onClose={() => showModal(false)}>
          <FlexColumn style={{ alignSelf: "stretch", placeContent: "center" }}>
            <WideButton onClick={() => connect("MyAlgo")}>
              <b>MyAlgo wallet</b>
            </WideButton>

            <WideButton onClick={() => connect("WalletConnect")}>
              <b>WalletConnect</b>
            </WideButton>
          </FlexColumn>
        </Modal>
      )}
    </>
  );
};

export default ConnectWallet;
