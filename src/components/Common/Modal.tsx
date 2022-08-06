import Button from "components/Forms/Button";
import styled, { css } from "styled-components";
import { FlexColumn, GridContainer, MatIcon } from "./Containers";

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

const contentBoundary = css`
  width: 50vw;
  min-width: 300px;
`;

const ModalTitle = styled(GridContainer).attrs({
  columns: "auto min-content"
})`
  ${contentBoundary}
  margin-bottom: 0.4rem;

  .title {
    flex-grow: 1;
    line-height: 2.6rem;
    text-align: left;
  }
`;

const ModalContents = styled(FlexColumn).attrs({ padded: true })`
  ${contentBoundary}
  background: #fff;
  border-radius: ${({ theme }) => theme.presets.rounded.default};
  box-shadow: ${({ theme }) => theme.presets.elevated.sm};
  color: ${({ theme }) => theme.colors.primary};
  height: 50vmin;
  overflow-y: auto;
  overflow-x: hidden;
  place-content: center;
`;

type ModalProps = {
  title?: string;
  onClose(): void;
} & React.ComponentPropsWithRef<"div">;

const Modal = (p: ModalProps) => {
  const { title, onClose, children } = p;

  return (
    <ModalContainer>
      <ModalTitle>
        {title && <h1 className="title h4">{title}</h1>}
        <Button onClick={onClose}>
          <MatIcon icon="close" />
        </Button>
      </ModalTitle>

      <ModalContents className="slide-down-fade-in">
        <div>{children}</div>
      </ModalContents>
    </ModalContainer>
  );
};

export default Modal;
