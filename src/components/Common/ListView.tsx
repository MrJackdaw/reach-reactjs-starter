import React, { ReactNode, ReactText } from "react";
import styled from "styled-components";
import { noOp } from "utils/index";

type ListViewProps = {
  data: any[];
  ordered?: boolean;
  row?: boolean;
  itemText: (d: any, i?: number) => ReactText | ReactNode;
  onItemClick?: (d: any) => any | void;
} & React.ComponentPropsWithRef<"ul" | "ol">;

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.sizes.sm};
  > * {
    padding: ${({ theme }) => `0 ${theme.sizes.sm}`};
  }
`;
const OrderedList = styled.ol`
  > * {
    width: 100%;
  }
`;

/**
 * `ListView` for displaying a or horizontal list of items
 * @returns {JSX.Element} `ListView` with ordered or unordered items
 */
const ListView = styled((props: ListViewProps): JSX.Element => {
  const { data, itemText, onItemClick = noOp, ordered, ...rest } = props;
  const Wrapper: any = ordered ? OrderedList : UnorderedList;

  return (
    <Wrapper {...rest}>
      {data.map((item: any, i: number) => (
        <ListViewItem key={i} onClick={() => onItemClick(item)}>
          {itemText(item, i)}
        </ListViewItem>
      ))}
    </Wrapper>
  );
})`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
`;

/**
 * Single item in a `ListView`
 */
const ListViewItem = styled.li`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  text-align: left;
`;

export default ListView;

export const WideListView = styled(ListView)`
  max-width: 50vmin;

  @media screen and (max-width: 768px) {
    max-width: 85vmin;
  }
`;
