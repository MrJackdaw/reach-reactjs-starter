import { Face } from "@material-ui/icons";
import { FlexColumn, FlexRow } from "components/Common/Containers";
import { disconnectUser } from "reach";
import { useEffect, useState, Fragment } from "react";
import store from "state";
import Button from "../components/Forms/Button";

const links = [
  { href: "https://reactjs.org", text: "Learn React" },
  { href: "https://docs.reach.sh/index.html", text: "Reach Lang Docs" },
];

const Home = () => {
  const gState = store.getState();
  const [state, setState] = useState<Partial<typeof gState>>(gState);
  // React to global state change
  const onAppState = (s: any) => setState((old) => ({ ...old, ...s }));

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => store.subscribe(onAppState));

  return (
    <FlexColumn className="Home" padded>
      <h1 className="h2">Home.tsx</h1>

      <FlexColumn>
        This project supports <b>Material Icons</b>
        <Face />
      </FlexColumn>

      <p>
        This is your application&apos;s <b>Home page</b>.
      </p>
      <p>
        Look in <b>routes/Home.tsx</b> to see how it works.
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
          <Fragment key={i}>
            <a
              className="App-link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
            {i < links.length - 1 && " | "}
          </Fragment>
        ))}
      </p>

      <FlexRow style={{ placeContent: "center" }}>
        <Button onClick={incAppState}>Increment Global Counter</Button>
        <Button onClick={disconnectUser}>Reset App State</Button>
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
