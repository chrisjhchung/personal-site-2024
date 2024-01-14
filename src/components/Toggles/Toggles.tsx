import { useState } from "react";
import { IoIosHelpCircle } from "react-icons/io";
import styles from "./Toggles.module.css";
import Modal from "../Modal/Modal";

const Toggles = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleHelpModal = () => {
    console.log("Help!");
    setShowModal(true);
  };

  return (
    <div>
      <Modal modalState={showModal} setModalState={setShowModal} />
      <button className={styles.button} onClick={toggleHelpModal}>
        <IoIosHelpCircle color={"hsl(240 3.7% 15.9%)"} size="24" />
      </button>
    </div>
  );
};

export default Toggles;
