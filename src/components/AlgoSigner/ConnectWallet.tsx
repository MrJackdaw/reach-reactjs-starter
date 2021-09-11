import React from "react";
import { truncateAccountString } from "reach/utils";
import AppStore from "../../state";
// Views
import Button from "../Forms/Button.js";
import SelectWallet from "./SelectWallet";
// import { connectWallet } from "./utilities";
import { WalletConnectionProps } from "types/shared";

const AlgoSignerConnect = (props: WalletConnectionProps) => {
  const { accountsList, error, loading, msg, user } = props;
  // Local State: temp list of multiple accounts so user can select one
  const connected = Boolean(user);
  const disconnect = () => AppStore.reset();

  // State 0: Loading with message
  if (loading) return <p>{msg || "Loading ..."}</p>;

  // State 1: User has multiple addresses in wallet
  if (accountsList.length > 1 || error)
    return <SelectWallet accountsList={accountsList} error={error} />;

  // State 2: AlgoSigner found but user didn't connect yet
  if (!connected) {
    return (
      <Button
        style={{ bottom: "2em", right: "2em" }}
        className="position-absolute m-3"
      >
        <p className="d-inline-block mb-1 ml-1">Connect Wallet</p>
      </Button>
    );
  }

  // State 4: User is connected
  return (
    <section className="connect-wallet">
      <h4>Connected!</h4>
      <p>
        You are connected to AlgoSigner as <b>{truncateAccountString(user)}</b>
      </p>

      <Button onClick={disconnect}>Reset Global State</Button>
    </section>
  );
};

export default AlgoSignerConnect;
