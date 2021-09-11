import { FlexColumn } from "components/Common/Containers";
import React, { useEffect } from "react";
import store from "state";
import styled from "styled-components";
import Button from "../components/Forms/Button";

const links = [
  { href: "https://reactjs.org", text: "Learn React" },
  { href: "https://docs.reach.sh/index.html", text: "Reach Lang Docs" },
];

const HomeContainer = styled(FlexColumn)`
  padding: ${({ theme }) => theme.sizes.sm};
`;

const Home = () => {
  const [state, setState] = React.useState(store.getState());
  const resetAppState = () => store.reset();
  const onAppState = (newState: any) =>
    setState((oldState) => ({ ...oldState, ...newState }));

  useEffect(() => store.subscribe(onAppState));

  return (
    <HomeContainer className="Home">
      <h4>Home.jsx</h4>

      <p>
        This is the Home page. It is a{" "}
        <b>
          <code> Route </code>
        </b>{" "}
        in your application.
      </p>
      <p>This component is linked up to the global state.</p>

      <p>
        <b>Global Count:</b> <span>{state.globalCount}</span>
      </p>

      <p>
        {links.map(({ text, href }, i) => (
          <React.Fragment key={i}>
            <a
              className="App-link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
            {i < links.length - 1 && " | "}
          </React.Fragment>
        ))}
      </p>

      <Button onClick={resetAppState}>Reset App State</Button>
    </HomeContainer>
  );
};
export default Home;
