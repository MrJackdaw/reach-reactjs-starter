import { useEffect, useState } from "react";
import styled from "styled-components";
import store from "state";
import { FlexColumn } from "./Common/Containers";
import { AutoDismissNotification } from "./Common/Notifications";

const NotificationGroup = styled(FlexColumn)`
  bottom: 1rem;
  height: auto;
  left: 50%;
  margin: 0 auto 0 -300px;
  height: 40vmin;
  max-width: 600px;
  overflow: hidden auto;
  padding: ${({ theme }) => theme.sizes.sm};
  position: fixed;
  width: 100%;
  z-index: 9999;

  ${AutoDismissNotification} {
    border-radius: ${({ theme }) => theme.presets.rounded.sm};
  }
`;

const ActiveNotifications = styled(() => {
  const { notifications } = store.getState();
  const [msgs, setMsgs] = useState([...notifications]);
  const onNotification = (n: any) => {
    const newnotes = n.notifications.slice(-10);
    setMsgs(newnotes);
  };

  useEffect(() => store.subscribeToKeys(onNotification, ["notifications"]));

  if (!msgs.length) return <></>;

  return (
    <NotificationGroup>
      {msgs.map((m) => (
        <AutoDismissNotification notification={m} key={m.time} timeout={3000} />
      ))}
    </NotificationGroup>
  );
})``;

export default ActiveNotifications;
