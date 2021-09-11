import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import store from "state/index";
import logo from "./logo.svg";
import routes from "routes/index";
import appTheme from "theme";
import FullScreenLoader from "components/Common/FullscreenLoader";
import Button from "components/Forms/Button";
import { FlexRow } from "components/Common/Containers";
import AppNav from "AppNav";

function App() {
  // Demo: Local vs global state
  const [count, setCount] = React.useState(0);
  const [gCount, setViewGlobal] = React.useState(store.getState().globalCount);

  const setGlobalCount = () => {
    const { globalCount: g } = store.getState();
    store.globalCount(g + 1);
  };

  const setLocalCount = () => setCount(count + 1);

  useEffect(() =>
    // Return a function that unsubscribes from global statex
    store.subscribe(({ globalCount: g }, updated) => {
      if (updated.includes("globalCount")) setViewGlobal(g);
    })
  );

  return (
    <ThemeProvider theme={appTheme}>
      <Suspense fallback={<FullScreenLoader />}>
        <Router>
          <section className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>Hello Vite, React, and Reach!</p>

              <FlexRow>
                <Button onClick={setLocalCount}>
                  <b>
                    <code>App.jsx</code> count
                  </b>
                  : {count}
                </Button>

                <Button onClick={setGlobalCount}>
                  <b>Global count</b>: {gCount}
                </Button>
              </FlexRow>

              <Button disabled={gCount === 0} onClick={() => store.reset()}>
                <b>Reset Global State</b>
              </Button>

              {/* Navigation Menu */}
              <AppNav />
            </div>

            {/* Routes */}
            <Switch>
              {routes.map(({ path, component, render }) => (
                <Route
                  path={path}
                  component={component}
                  key={path}
                  render={render}
                />
              ))}
            </Switch>
          </section>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
