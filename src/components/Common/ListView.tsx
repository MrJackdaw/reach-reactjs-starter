import React from "react";
import styled from "styled-components";
import { noOp } from "utils/index";

type ListViewProps = {
  data: any[];
  ordered?: boolean;
  row?: boolean;
  itemText: (d: any) => string | JSX.Element;
  onItemClick?: (d: any) => any | void;
} & React.PropsWithChildren<any>;

const flexStyles = `display: flex;`;
const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.sizes.sm};
`;
const OrderedList = styled.ol<ListViewProps>`
  ${flexStyles}
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  > * {
    width: 100%;
  }
`;

/**
 * `ListView` for displaying a or horizontal list of items
 * @returns {JSX.Element} `ListView` with ordered or unordered items
 */
const ListView = (props: ListViewProps): JSX.Element => {
  const { data, itemText, onItemClick = noOp, ordered, ...rest } = props;
  const children = data.map((item: any, i: number) => (
    <ListViewItem key={i} onClick={() => onItemClick(item)}>
      {itemText(item, i)}
    </ListViewItem>
  ));

  // Ordered list (ol)
  if (ordered) {
    return <OrderedList {...rest}>{children}</OrderedList>;
  }

  // unordered list (ul)
  return <UnorderedList {...rest}>{children}</UnorderedList>;
};

/**
 * Single item in a `ListView`
 * @returns {JSX.Element}
 */
const ListViewItem = (props: React.ComponentProps<any>) => {
  const { children, ...rest } = props;
  return <li {...rest}>{children}</li>;
};

export default ListView;
