import styled from "styled-components";
import { FlexRow } from "./Containers";

const Wrapper = styled(FlexRow)`
  bottom: 1rem;
  box-shadow: 0 1px 2px #222;
  left: 50%;
  margin: 0 auto 0 -300px;
  max-width: 600px;
  position: fixed;
  text-align: center;
  width: 100%;
`;

type NotificationProps = {
  notification?: string | null;
  error?: string | null;
};

export const ErrorNotification = styled(Wrapper)``;

const Notification = (props: NotificationProps) => {
  const { error, notification } = props;

  if (error)
    return (
      <ErrorNotification>
        <b className="label">Error:&nbsp;</b>
        {error}
      </ErrorNotification>
    );

  return <Wrapper>{notification}</Wrapper>;
};

export default Notification;
