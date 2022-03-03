import styled from "styled-components";
import AppNav from "AppNav";
import { FlexRow } from "components/Common/Containers";
import logo from "./logo.svg";
import { Link } from "react-router-dom";

const HeaderContainer = styled(FlexRow)`
  background-color: ${({ theme }) => theme.colors.bgColor};
  color: ${({ theme }) => theme.colors.primary};
  height: 60px;
  justify-content: space-between;
  padding-right: 0.5rem;

  .logo {
    display: block;
    height: 60px;
    pointer-events: none;
  }
`;

const AppHeader = () => (
  <HeaderContainer>
    <Link to="/">
      <img src={logo} className="logo spin" alt="App Logo" />
    </Link>

    {/* Navigation Menu */}
    <AppNav />
  </HeaderContainer>
);

export default AppHeader;
