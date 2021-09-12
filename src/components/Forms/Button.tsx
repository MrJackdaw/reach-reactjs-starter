import React from "react";
import styled from "styled-components";

const ButtonBase = styled.button`
  align-items: center;
  border-radius: ${({ theme }) => theme.presets.rounded};
  border: 0;
  cursor: pointer;
  display: inline-flex;
  padding: ${({ theme }) => theme.sizes.sm};
  margin: 0 ${({ theme }) => theme.sizes.sm};
  place-content: center;
`;

export default function Button(props: React.ComponentPropsWithRef<"button">) {
  const { children, ...rest } = props;
  return <ButtonBase {...rest}>{children}</ButtonBase>;
}
