import type { ReactNode } from "react";
import ReactDOM from "react-dom";

import Card from "./Card/Card";
import styles from "./Modal.module.css";

interface BackdropProps {
  onClose: () => void;
}

const Backdrop = (props: BackdropProps) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

interface ModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <Card className={styles.modal}>
      {props.children}
    </Card>
  );
};

const backdropRoot = document.getElementById("backdrop-root")!;
const overlayRoot = document.getElementById("overlay-root")!;

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        backdropRoot
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayRoot
      )}
    </>
  );
};

export default Modal;
