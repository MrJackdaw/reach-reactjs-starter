import styled from "styled-components";

type AllButtonProps = React.ComponentPropsWithRef<"button">;

const ButtonBase = styled.button<AllButtonProps>`
  align-items: center;
  border-radius: ${({ theme }) => theme.presets.rounded.sm};
  border: 0;
  cursor: pointer;
  display: inline-flex;
  margin: 0 ${({ theme }) => theme.sizes.sm};
  padding: ${({ theme }) => theme.sizes.sm};
  place-content: center;
`;

const DefaultButton = styled(ButtonBase)``;
export default DefaultButton;

export const RoundButton = styled(ButtonBase)`
  border-radius: ${({ theme }) => theme.presets.rounded.xlg};
  color: inherit;
`;

export const WideButton = styled(ButtonBase)`
  bottom: 0;
  position: sticky;
  margin: 0 0 ${({ theme }) => theme.sizes.sm};
  width: 100%;
`;
