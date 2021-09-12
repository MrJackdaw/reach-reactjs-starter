import Button from "components/Forms/Button";
import styled from "styled-components";
import { FlexColumn, FlexRow } from "./Containers";

const ModalContainer = styled(FlexColumn)`
  height: 100vh;
  left: 0;
  position: fixed;
  place-content: center;
  top: 0;
  width: 100vw;
  z-index: 10;

  &::before {
    background: #00000099;
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 0;
  }
`;

const ModalContents = styled(FlexColumn).attrs({ padded: true })`
  background: #fff;
  border-radius: ${({ theme }) => theme.presets.rounded};
  box-shadow: ${({ theme }) => theme.presets.elevated};
  color: ${({ theme }) => theme.colors.primary};
  height: 50vmin;
  overflow-y: auto;
  overflow-x: hidden;
  width: 50vmin;

  .title {
    flex-grow: 1;
    text-align: left;
  }
`;

type ModalProps = {
  title?: string;
  onClose(): void;
} & React.ComponentPropsWithRef<"div">;

const Modal = (p: ModalProps) => {
  const { title, onClose, children } = p;

  return (
    <ModalContainer>
      <ModalContents>
        <FlexRow>
          {title && <h1 className="title h4">{title}</h1>}
          <Button onClick={onClose}>close</Button>
        </FlexRow>

        <div>{children}</div>
      </ModalContents>
    </ModalContainer>
  );
};

export default Modal;
