import { truncateAccountString } from "reach/utils";
import { selectPrimaryAddress } from "./utilities";
import ListView from "components/Common/ListView";
import { WalletConnectionProps } from "types/shared";
import Notification from "components/Common/Notifications";

const SelectWallet = (p: WalletConnectionProps) => {
  const { accountsList, error, msg } = p;

  return (
    <section className="connect column">
      {accountsList.length && (
        <>
          <h3 className="h4 primary-light--text">Select an account:</h3>

          {/* List of AlgoSigner accounts */}
          <ListView
            allowHover
            data={accountsList}
            itemClick={(a: any) => selectPrimaryAddress(a.address)}
            itemKey={(a: any) => a.address}
            itemText={(a: any) => truncateAccountString(a.address)}
            ordered
          />
        </>
      )}

      {/* Notification */}
      {(msg || error) && <Notification notification={msg} error={error} />}
    </section>
  );
};

export default SelectWallet;
