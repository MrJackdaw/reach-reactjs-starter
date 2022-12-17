import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FlexColumn,
  PageContainer,
  Section
} from "components/Common/Containers";
import { useGlobalCount } from "hooks/GlobalCount";
import GlobalCountButton from "components/GlobalCountButton";

const GlobalCount = styled(FlexColumn)`
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
`;

const Demo = () => {
  const { globalCount } = useGlobalCount();

  return (
    <PageContainer padded>
      <h1 className="h2">Demo.tsx</h1>
      <aside>
        <a
          className="App-link"
          href="https://github.com/JACK-COM/raphsducks/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          About raphsducks (state manager)
        </a>
      </aside>

      <p>
        This is a Demo page. It is a <code> Route</code>&nbsp;
        in your application, and is linked up to the global state. Look at&nbsp;
        <code>routes/Demo.tsx</code> to see how it works.
      </p>
      <hr />

      <Section>
        <h3 className="h4">Application State Demo</h3>

        <p>
          <b>Global Count</b> is a property in your global state. You can update
          it using a button on the <Link to="/">Home route</Link>.
        </p>

        <GlobalCount>
          <p>
            <b>Global Count:</b> <span>{globalCount}</span>
          </p>

          <GlobalCountButton />
        </GlobalCount>
      </Section>
    </PageContainer>
  );
};

export default Demo;
