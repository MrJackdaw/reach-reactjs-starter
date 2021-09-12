import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import appTheme from "theme";
import routes from "routes/index";
import FullScreenLoader from "components/Common/FullscreenLoader";
import AppHeader from "AppHeader";
import "./App.scss";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
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
