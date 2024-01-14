import { useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}

const Modal = ({ modalState, setModalState }: ModalProps) => {
  console.log("modalState", modalState);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setModalState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={`${modalState ? styles.visible : styles.hidden}`}>
      <div
        className={styles.modalBackground}
        onClick={(e) => {
          e.preventDefault();
          setModalState(false);
        }}
      ></div>
      <div className={styles.modal}>Modal</div>
    </div>
  );
};

export default Modal;
