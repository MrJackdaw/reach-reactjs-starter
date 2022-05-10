import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import THEME, { getTheme, themeState } from "theme/index";
import routes from "routes/index";
import FullScreenLoader from "components/Common/FullscreenLoader";
import AppHeader from "AppHeader";
import "./App.scss";
import { UIThemeType } from "types/shared";
import ActiveNotifications from "components/ActiveNotifications";

function App() {
  const sTheme = getTheme();
  const [theme, setTheme] = useState(THEME[sTheme] || {});
  // const [user, setUser] = useState("");

  useEffect(() => {
    /* Change your document title here */
    document.title = "Reach + ReactJS Starter App";

    /* Listen to theme changes; you can expand on this functionality */
    const onTheme = (s: any) => setTheme(THEME[s.theme as UIThemeType]);

    /**
     * This is how you 1. Subscribe to a state, and 2. Get an 'unsubscribe' function.
     * The App.tsx component is listening to the `theme` state instance; when it changes,
     * the UI will update accordingly. We return the "unsubscribe" fn so that React can
     * cleanup when the component unmounts
     */
    return themeState.subscribeToKeys(onTheme, ["theme"]);
  });

  return (
    <ThemeProvider theme={theme}>
      <THEME.GLOBAL />

      <ActiveNotifications />

      <React.Suspense fallback={<FullScreenLoader />}>
        <Router>
          <section className="App">
            {/* App Header */}
            <AppHeader />

            {/* Routes */}

            <Switch>
              {routes.map(({ path, component, render }) => (
                <Route
                  exact
                  path={path}
                  component={component}
                  key={path}
                  render={render}
                />
              ))}
            </Switch>
          </section>
        </Router>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
