import styled from "styled-components";

type FlexContainerProps = {
  inline?: boolean;
  padded?: boolean;
};

/** General-purpose default container */
export const BaseContainer = styled.section``;

/** Flex-container for displaying items in a row */
export const FlexRow = styled(BaseContainer)<FlexContainerProps>`
  align-items: center;
  display: ${({ inline }) => (inline ? "inline-" : "")}flex;
  padding: ${({ padded, theme }) => (padded ? theme.sizes.sm : 0)};
`;

/** Flex-container for displaying items in a column */
export const FlexColumn = styled(FlexRow)`
  flex-direction: column;

  > * {
    width: 100%;
  }
`;

export const Code = styled.code`
  font-family: monospace;
  padding: ${({ theme }) => theme.sizes.sm};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-gap: 0;
`;

export const PageContainer = styled(FlexColumn)`
  margin: 0 auto;
  min-height: 70vmax;
  max-width: 80vmin;
`;

export const Figure = styled.figure`
  margin-bottom: ${({ theme }) => theme.sizes.md};

  img {
    max-width: 448px;
    height: auto;
    width: 100%;
  }
`;

export const BigValue = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
`;

export const CapsLabel = styled.div`
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

export const DataColumn = styled(FlexColumn)`
  text-align: left;
  width: 50%;
`;
