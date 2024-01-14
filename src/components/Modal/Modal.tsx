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
      />
      {/* TODO: Convert this into a WYSIWYG in Sanity */}
      <div className={styles.modal}>
        <p>What is this? </p>
        <p>
          This is my personal website, but there are easter eggs hidden behind
          commands. If you type a valid command into the input box, it will
          unlock a new part of the site. Unlock all features on the site by
          finding all the commands.
        </p>
        <p>Some rules before we start:</p>
        <ul>
          <li>
            Once a command has been found, it's been found. You don't need to
            re-discover it. (Unless you clear your cache)
          </li>
          <li>
            All commands will be fair. (All commands can be found somewhere on
            the site, there are no 'hidden' commands)
          </li>
          <li>Have fun!</li>
        </ul>
        <p>Here's a list of commands to get you started:</p>
        <ul>
          <li className={styles.codeBlock}>/help</li>
          <li className={styles.codeBlock}>/about</li>
          <li className={styles.codeBlock}>/blog</li>
          <li className={styles.codeBlock}>/contact</li>
          <li className={styles.codeBlock}>/projects</li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
