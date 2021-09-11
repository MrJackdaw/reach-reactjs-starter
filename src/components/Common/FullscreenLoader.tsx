import styled from "styled-components";
import { FlexRow } from "./Containers";

const CenteredWrapper = styled(FlexRow)`
    place-content: center
    height: 100vh;
    width: 100vw;
`;

const FullScreenLoader = () => (
  <CenteredWrapper>Loading route ...</CenteredWrapper>
);

export default FullScreenLoader;
