import styles from "./page.module.scss";
import GradientBackground from "../components/gradientBackground/gradientBackground";

export default function Home() {
  return (
    <div className={styles.container}>
      <GradientBackground />
      <h1 className={styles.header}>Chris Chung.</h1>
    </div>
  );
}
