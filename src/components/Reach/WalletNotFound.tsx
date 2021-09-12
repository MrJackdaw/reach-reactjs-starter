import { Fragment } from "react";

const WalletNotFound = (): JSX.Element => (
  <>
    <h3>No Wallet Found!</h3>

    <p>
      Please ensure a wallet extension is installed and enabled, and that you
      are signed in.
    </p>
  </>
);

export default WalletNotFound;
