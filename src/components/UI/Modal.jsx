import ReactDOM from "react-dom";

import Card from "./Card/Card";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      {props.children}
    </Card>
  );
};

const backdropRoot = document.getElementById("backdrop-root");
const overlayRoot = document.getElementById("overlay-root");

const Modal = (props) => {
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
