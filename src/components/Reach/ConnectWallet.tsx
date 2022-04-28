import { useEffect, useState } from "react";
import {
  disconnectUser,
  truncateString,
  checkSessionExists,
} from "@jackcom/reachduck";
// Views
import store, { resetNotifications, updateNotification } from "state";
import { ConnectionPropKeys, ConnectionProps } from "types/shared";
import Button, { WideButton } from "components/Forms/Button";
import Modal from "components/Common/Modal";
import { FlexColumn } from "components/Common/Containers";
import { connect, reconnect } from "reach";

const ConnectWallet = () => {
  const globalState = store.getState();
  const { account } = globalState;
  const [state, setState] = useState<ConnectionProps>({});
  const [modal, showModal] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const connectTo = async (prov: string) => {
    showModal(false);
    setConnecting(true);
    if (!prov) return;

    const alertId = resetNotifications("⏳ Connecting ... ", true);
    const acc = await connect(prov);
    const msg = acc ? "✅ Connected!" : "❌ Account Fetch error";
    updateNotification(alertId, msg);
    setConnecting(false);
  };

  useEffect(() => {
    const { exists } = checkSessionExists();
    if (exists && !account) {
      resetNotifications("⏳ Reconnecting ... ");
      reconnect();
    }

    return store.subscribeToKeys(
      (s) => setState((p) => ({ ...p, ...s })),
      ConnectionPropKeys
    );
  }, []);

  if (account)
    return (
      <Button onClick={disconnectUser}>{truncateString(state.address!)}</Button>
    );

  if (connecting)
    return (
      <Button disabled>
        <span className="spinner--before">Loading ...</span>
      </Button>
    );

  return (
    <>
      {state.error ? (
        <Button onClick={() => window.location.reload()}>
          <span className="material-icons">close</span>
          Connect Error
        </Button>
      ) : (
        <Button onClick={() => showModal(true)}>
          {state.loading ? (
            <span className="spinner--before">Loading ...</span>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}

      {modal && (
        <Modal title="Select Wallet Provider" onClose={() => showModal(false)}>
          <FlexColumn style={{ alignSelf: "stretch", placeContent: "center" }}>
            <WideButton onClick={() => connectTo("MyAlgo")}>
              <b>MyAlgo wallet</b>
            </WideButton>

            <WideButton onClick={() => connectTo("WalletConnect")}>
              <b>WalletConnect</b>
            </WideButton>
          </FlexColumn>
        </Modal>
      )}
    </>
  );
};

export default ConnectWallet;
