import { Face } from "@material-ui/icons";
import { ExLink, PageContainer } from "components/Common/Containers";
import GlobalCountButton from "components/GlobalCountButton";
import { Fragment } from "react";
import styled from "styled-components";

const links = [
  { href: "https://reactjs.org", text: "Learn React" },
  { href: "https://docs.reach.sh/index.html", text: "Reach Lang Docs" },
];

const Wrapper = styled(PageContainer)``;

const Home = () => (
  <Wrapper className="Home" padded>
    <h1 className="h2">Home.tsx</h1>
    <aside>
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
    </aside>
    <p>
      This is your application&apos;s <b>Home page</b>. It is linked up to the
      global state. Look in <b>routes/Home.tsx</b> to see how it works.
    </p>
    <h2 className="h3">Getting Started</h2>
    <p>
      This starter is meant to get you hacking quickly. You can freely change
      styles (global or local), rename component files, and/or re-arrange things
      to your liking.
    </p>
    <p>
      This project supports <b>Typescript</b>, <b>SASS/SCSS</b>, and{" "}
      <b>Material Icons</b>
      <Face />
    </p>
    <hr />
    <h3 className="h4">Application State</h3>
    <p>
      This project uses a simple global state management system. It is defined
      in
      <code>src/state/index.ts</code>; you can add (or remove) as many
      properties as you want. There is a{" "}
      <a
        href="https://reactjs.org/docs/hooks-custom.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        React hook
      </a>{" "}
      that uses it in <code>src/hooks/useGlobalUser.ts</code>; you can use that
      to create and share reusable hooks between components.
    </p>
    <p>
      The value below is in global state. You can view it on the <b>Demo</b>{" "}
      page after changing it here. It will reset if you reload the window.
    </p>

    <GlobalCountButton />

    <hr />
    <h3 className="h4">CSS and styles</h3>
    <p>
      This starter uses{" "}
      <ExLink href="https://styled-components.com/docs/api">
        <b>styled-components</b>
      </ExLink>
      . It allows you to create reusable styled containers for your app, and
      enables global app themes (if you want).
    </p>

    <h4 className="h5">Global (Default) Styles</h4>
    <p>
      If you don&apos;t care about light/dark theme toggles, you can simply
      write your global styles in <code>src/App.scss</code>. You might also want
      to look at <code>src/theme/theme.shared.ts</code> to make sure there are
      no other globals overriding your hard work.
    </p>

    <h4 className="h5">Global Themes</h4>
    <p>Enabling global themes involves a couple of steps:</p>

    <ol>
      <li>
        Define your <b>Light</b> and <b>Dark</b> themes in{" "}
        <code>src/theme/</code>. There is a file for each theme.
      </li>

      <li>
        Import and link the <code>setTheme</code> function in{" "}
        <code>src/theme/index.ts</code> to a UI component. When the component is
        triggered (e.g. clicked), you can call the function with the
        corresponding value (<code>Dark</code> or <code>Light</code>) and the UI
        will update.
      </li>
    </ol>

    <p>
      <code>App.tsx</code> is already subscribed to the theme file;{" "}
      <code>setTheme</code> will also write the value to localStorage for you,
      so that you can reload the page without needing to re-select the theme.
    </p>
  </Wrapper>
);

export default Home;
