import { useState, useEffect } from "react";
import { FlexColumn } from "components/Common/Containers";
import store from "state";
import { Link } from "react-router-dom";

const Demo = () => {
  const gState = store.getState();
  const { globalCount: gCount } = gState;
  const [count, setCount] = useState(gCount);
  const onAppState = ({ globalCount }: Partial<typeof gState>) => {
    setCount(globalCount || 0);
  };

  // Subscribe to global state, and unsubscribe on component unmount
  useEffect(() => store.subscribeToKeys(onAppState, ["globalCount"]));

  return (
    <FlexColumn padded>
      <h1 className="h2">Demo.tsx</h1>

      <p>
        This is a Demo page. It is a
        <b>
          <code> Route </code>
        </b>
        in your application. Look at <b>routes/Demo.tsx</b> to see how it works.
      </p>
      <p>
        This route is linked up to the global state. You can modify or remove it
        if not needed
      </p>

      <p>
        <b>Global Count:</b> <span>{count}</span>
      </p>

      <p>
        <b>Global Count</b> is a property in your global state. You can update
        it using a button on the <Link to="/">Home route</Link>.
      </p>
    </FlexColumn>
  );
};

export default Demo;
