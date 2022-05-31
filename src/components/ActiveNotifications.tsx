import styled from "styled-components";
import useGlobalNotifications from "hooks/GlobalNotifications";
import { FlexColumn } from "./Common/Containers";
import { AutoDismissNotification } from "./Common/Notifications";
import { Alert } from "state";

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
  const { lastTenNotifications: msgs } = useGlobalNotifications();
  if (!msgs.length) return <></>;
  const timeout = (m: Alert) => (m.error ? 30000 : 5000);

  return (
    <NotificationGroup>
      {msgs.map((m) => (
        <AutoDismissNotification
          key={m.time}
          notification={m}
          timeout={timeout(m)}
        />
      ))}
    </NotificationGroup>
  );
})``;

export default ActiveNotifications;
