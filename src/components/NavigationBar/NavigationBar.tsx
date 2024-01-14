import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const found = 0;
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContents}>
        <p>{found} / 10</p>
      </div>
    </div>
  );
};

export default NavigationBar;
