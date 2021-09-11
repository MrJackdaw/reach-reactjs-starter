import React from "react";
import styled from "styled-components";

const ButtonBase = styled.button`
  align-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.presets.rounded};
  cursor: pointer;
  display: flex;
  padding: ${({ theme }) => theme.sizes.sm};
`;

export default function Button(props: React.ComponentPropsWithRef<"button">) {
  const { children, ...rest } = props;
  return <ButtonBase {...rest}>{children}</ButtonBase>;
}
