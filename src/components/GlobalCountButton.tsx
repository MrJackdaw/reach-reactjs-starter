import { useGlobalCount } from "hooks/GlobalCount";
import store from "state";
import Button from "./Forms/Button";

const GlobalCountButton = () => {
  const { globalCount } = useGlobalCount();

  return (
    <Button onClick={incGlobalState}>
      <b>Global State Count ( + )&nbsp;</b> <span>{globalCount}</span>
    </Button>
  );
};

export default GlobalCountButton;

// Update global state property
function incGlobalState(): void {
  const { globalCount } = store.getState();
  store.globalCount(globalCount + 1);
}
