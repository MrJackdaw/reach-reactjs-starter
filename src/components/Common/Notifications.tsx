import React, { useEffect, useState } from "react";
import { Alert, removeNotification } from "state";
import styled from "styled-components";
import { noOp } from "utils";
import { FlexRow } from "./Containers";

const Wrapper = styled(FlexRow)`
  background-color: ${({ theme }) => theme.colors.bgColor};
  border-radius: ${({ theme }) => theme.presets.rounded};
  box-shadow: ${({ theme }) => theme.presets.elevated.md};
  margin-bottom: ${({ theme }) => theme.sizes.xs};
  width: 100%;

  .material-icons {
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    display: inline-flex;
    margin-right: ${({ theme }) => theme.sizes.sm};
  }
`;

const ClearNotification = styled((p: NotificationProps) => (
  <button onClick={p.onClear} className="material-icons">
    close
  </button>
))<React.ComponentPropsWithRef<"button">>`
  color: ${({ theme }) => theme.colors.error};
`;

const Notification = styled((props: NotificationProps) => {
  const { error, notification, onClear = noOp } = props;

  return (
    <Wrapper className={props.className}>
      <ClearNotification onClear={onClear} />
      {error && <b className="label">Error:&nbsp;</b>}
      <span>{notification}</span>
    </Wrapper>
  );
})``;

export default Notification;

export const AutoDismissNotification = styled((props: ADNProps) => {
  const { timeout = 5000, className, notification } = props;
  const [state, setState] = useState<ADNState>({
    timeout: null,
    class: `${className || ""} slide-in-left`,
  });
  const clear = () => {
    if (state.timeout) clearTimeout(state.timeout as NodeJS.Timeout);
    removeNotification(props.notification as Alert);
  };
  const animate = () => {
    clearTimeout(state.timeout as NodeJS.Timeout);
    setState({ class: `${className || ""} slide-out-left` });
    setTimeout(clear, 500);
  };

  useEffect(() => {
    if (state.timeout !== null) return;
    setState({ timeout: setTimeout(animate, timeout) });
  }, [state.class]);

  return (
    <Notification
      onClear={clear}
      className={state.class}
      notification={notification.msg}
    />
  );
})``;

type NotificationHandlers = {
  onClear(): void;
};

type NotificationBaseProps = {
  notification?: string | null | Alert;
  error?: boolean;
} & React.ComponentPropsWithRef<"div" | "section" | "button">;

type NotificationProps = NotificationBaseProps & NotificationHandlers;

type ADNProps = NotificationBaseProps & {
  notification: Alert;
  timeout?: number;
};

type ADNState = {
  timeout: NodeJS.Timeout | null;
  class: string;
} & any;
