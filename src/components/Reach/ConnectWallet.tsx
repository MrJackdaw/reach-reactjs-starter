import { useEffect, useState } from "react";
import {
  disconnectUser,
  truncateString,
  checkSessionExists,
} from "@jackcom/reachduck";
// Views
import { resetNotifications, updateNotification } from "state";
import Button, { WideButton } from "components/Forms/Button";
import Modal from "components/Common/Modal";
import { FlexColumn } from "components/Common/Containers";
import { connect, reconnect } from "reach";
import { useGlobalUser } from "hooks/GlobalUser";

const ConnectWallet = () => {
  const { account, address, error, loading } = useGlobalUser();
  const [modal, showModal] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const connectTo = async (prov: string) => {
    showModal(false);
    if (!prov) return;

    setConnecting(true);
    const alertId = resetNotifications("⏳ Connecting ... ", true);
    const acc = await connect(prov);
    const msg = acc ? "✅ Connected!" : "❌ Account Fetch error";
    updateNotification(alertId, msg);
    setConnecting(false);
  };

  const resumeSession = async () => {
    const alertId = resetNotifications("⏳ Reconnecting ... ");
    await reconnect();
    updateNotification(alertId, "✅ Connected!");
  };

  useEffect(() => {
    const { exists } = checkSessionExists();
    if (exists && !account) resumeSession();
  }, []);

  if (account)
    return <Button onClick={disconnectUser}>{truncateString(address)}</Button>;

  if (connecting)
    return (
      <Button disabled>
        <span className="spinner--before">Loading ...</span>
      </Button>
    );

  return (
    <>
      {error ? (
        <Button onClick={() => window.location.reload()}>
          <span className="material-icons">close</span>
          Connect Error
        </Button>
      ) : (
        <Button onClick={() => showModal(true)}>
          {loading ? (
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
