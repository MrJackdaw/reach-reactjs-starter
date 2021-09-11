import React, { useState } from "react";
import store from "state/index";
import "./HelloWorld.scss";

export default function HelloWorld() {
  const [state, setState] = useState({ counter: 0 });
  const { globalCount } = store.getState();
  const incGlobalCount = () => store.globalCount(globalCount + 1);
  const incLocalCount = () =>
    setState((s) => ({ ...s, counter: s.counter + 1 }));

  return (
    <section className="hello-world">
      <h1>Hello Sweet World!</h1>

      <p>
        This component (<code>HelloWorld.jsx</code>) is attached to the
        application state. Use the
        <b>Global Count</b> button to update the global application state!
      </p>

      <button type="button" onClick={incLocalCount}>
        <b>
          <code>HelloWorld.jsx</code>:
        </b>{" "}
        {state.counter}
      </button>

      <button type="button" onClick={incGlobalCount}>
        <b>Global count</b> {`is: ${globalCount}`}
      </button>

      <p>
        Edit
        <code>components/HelloWorld.jsx</code> to see how the
        <code>ApplicationStore</code> is used.
      </p>
    </section>
  );
}
