import React from "react";
import ListView from "components/Common/ListView";
import { Link } from "react-router-dom";
import routes from "routes/index";
import styled from "styled-components";

const Menu = styled.nav`
  .title {
    margin: ${({ theme }) => theme.sizes.sm};
  }
`;

const AppNav = () => (
  <Menu>
    <h4 className="title">Navigation Menu</h4>

    <ListView
      className="menu-items"
      row
      data={routes}
      itemText={({ path, text }: any) => <Link to={path}>{text}</Link>}
    />
  </Menu>
);

export default AppNav;
