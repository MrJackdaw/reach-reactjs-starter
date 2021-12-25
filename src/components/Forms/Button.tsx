import styled from "styled-components";
import AllButtonProps, * as UI from "./Button.Helpers";

const ButtonBase = styled.button<AllButtonProps>`
  align-items: center;
  background-color: ${UI.bgColor};
  border-radius: ${UI.borderRadius};
  border: ${UI.border};
  color: ${UI.textColor};
  cursor: pointer;
  display: inline-flex;
  font-family: "Outfit", sans-serif;
  margin: 0;
  padding: ${({ theme }) => theme.sizes.sm};
  place-content: center;
  width: ${UI.width};

  &:not([disabled]):hover {
    background-color: ${UI.bgColorHover};
    transform: scale(0.99, 0.99);
    transition: 0.12s linear;
  }

  &[disabled] {
    transition: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DefaultButton = styled(ButtonBase)``;
export default DefaultButton;

export const RoundButton = styled(ButtonBase).attrs({ round: true })``;
export const TransparentButton = styled(ButtonBase).attrs({
  variant: "transparent",
})``;

export const WideButton = styled(ButtonBase).attrs({ size: "lg" })`
  bottom: 0;
  position: sticky;
  margin: 0 0 ${({ theme }) => theme.sizes.sm};
  max-width: calc(100% - 2px);
`;
