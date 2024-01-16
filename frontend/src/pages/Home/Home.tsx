import React from "react";
import CommandInput from "../../components/CommandInput/CommandInput";
import Toggles from "../../components/Toggles/Toggles";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.container}>
      <p>
        Welcome, I'm Chris! You've stumbled upon my corner of the internet...
      </p>
      <CommandInput />
      <Toggles />
    </div>
  );
};

export default Home;
