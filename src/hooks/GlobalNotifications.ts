import { useEffect, useState } from "react";
import store from "state";

/**
 * Listen to notifications/`Alerts`. Mainly used by `ActiveNotification` component
 * @returns Last ten notifications published to app`
 */
export default function useGlobalNotifications() {
  const { notifications } = store.getState();
  const [msgs, setMsgs] = useState([...notifications]);
  const onNotification = (n: any) => {
    const newnotes = n.notifications.slice(-10);
    setMsgs(newnotes);
  };

  useEffect(() => store.subscribeToKeys(onNotification, ["notifications"]), []);
  return { lastTenNotifications: msgs };
}
