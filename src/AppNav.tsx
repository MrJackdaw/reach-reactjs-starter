import ListView from "components/Common/ListView";
import { Link } from "react-router-dom";
import routes from "routes/index";
import styled from "styled-components";

const Menu = styled.nav``;

const AppNav = () => (
  <Menu className="app-menu">
    {/* App routes */}
    <ListView
      row
      className="menu-items slide-in-right"
      data={routes}
      itemText={({ path, text }: any) => <Link to={path}>{text}</Link>}
    />
  </Menu>
);

export default AppNav;
