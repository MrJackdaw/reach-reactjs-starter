import React from "react";

const AlgoSignerNotFound = () => (
  <React.Fragment>
    <h3>Welcome!</h3>

    <div className="algosigner-notice">
      <p className="list-item list-item--label error--text">
        <b>AlgoSigner</b> is not installed!
      </p>

      <p>
        <a
          href="https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>AlgoSigner</b>&nbsp;
        </a>
        is a non-custodial blockchain wallet. It allows you to interact with
        Algorand dApps.
      </p>

      <p>
        Please ensure the extension is installed and enabled, and that you are
        signed in. You can install <b>AlgoSigner</b> on Chrome and Chrome-like (e.g.
        Brave) desktop browsers.
      </p>
    </div>
  </React.Fragment>
);

export default AlgoSignerNotFound;
