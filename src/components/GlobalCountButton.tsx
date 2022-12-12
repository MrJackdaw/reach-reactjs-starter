import { useGlobalCount } from "hooks/GlobalCount";
import { counter } from "state";
import Button from "./Forms/Button";

const GlobalCountButton = () => {
  const { globalCount } = useGlobalCount();
  const incGlobalState = () => {
    counter.globalCount(counter.getState().globalCount + 1);
  };

  return (
    <Button onClick={incGlobalState}>
      <b>Global State Count ( + )&nbsp;</b> <span>{globalCount}</span>
    </Button>
  );
};

export default GlobalCountButton;

// Update global state property
