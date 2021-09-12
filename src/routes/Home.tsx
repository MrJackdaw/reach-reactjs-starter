import { FlexColumn, FlexRow } from "components/Common/Containers";
import React, { useEffect } from "react";
import store from "state";
import Button from "../components/Forms/Button";

const links = [
  { href: "https://reactjs.org", text: "Learn React" },
  { href: "https://docs.reach.sh/index.html", text: "Reach Lang Docs" },
];

const Home = () => {
  const [state, setState] = React.useState(store.getState());
  const resetAppState = () => store.reset();
  // React to global state change
  const onAppState = (newState: any) =>
    setState((oldState) => ({ ...oldState, ...newState }));

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => store.subscribe(onAppState));

  return (
    <FlexColumn className="Home" padded>
      <h1 className="h2">Home.tsx</h1>

      <p>
        This is the Home page. It is a{" "}
        <b>
          <code> Route </code>
        </b>{" "}
        in your application.
      </p>

      <p>
        This route is linked up to the global state. You can modify or remove it
        if not needed
      </p>

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

      <FlexRow style={{ placeContent: "center" }}>
        <Button onClick={incAppState}>Increment Global Counter</Button>
        <Button onClick={resetAppState}>Reset App State</Button>
      </FlexRow>
    </FlexColumn>
  );
};

export default Home;

// Update global state property
function incAppState(): void {
  const { globalCount } = store.getState();
  store.globalCount(globalCount + 1);
}
