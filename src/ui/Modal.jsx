import React, { cloneElement } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  /* z-index: 999; */
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  /* z-index: 1000; */
`;
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

export const ModalContext = React.createContext();

function Modal({ children }) {
  const [currentWindow, setCurrentWindow] = React.useState("");

  const openModal = setCurrentWindow;
  const closeModal = () => setCurrentWindow("");

  const value = { currentWindow, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function Window({ name, children }) {
  const { currentWindow, closeModal } = React.useContext(ModalContext);

  if (currentWindow !== name) return;

  return createPortal(
    <div>
      <Overlay onClick={closeModal} />
      <StyledModal>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { closeModal })}</div>
      </StyledModal>
    </div>,
    document.body
  );
}

function Open({ opens, children }) {
  const { openModal } = React.useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(opens) });
}

function Close({ children }) {
  const { closeModal } = React.useContext(ModalContext);
  return <div onClick={closeModal}>{children}</div>;
}

Modal.Window = Window;
Modal.Open = Open;
Modal.Close = Close;

export default Modal;
