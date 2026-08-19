import styles from "./ButtonHierarchy.module.css";

function ButtonHierarchy() {
  return (
    <div className={styles.card}>
      <h4 className={styles.heading}>We value your privacy</h4>
      <p className={styles.copy}>
        We use cookies to personalize content, run ads, and measure how they perform.
      </p>

      <div className={styles.actions}>
        <button className={styles.accept}>Accept all</button>
        <button className={styles.ghost}>Reject all</button>
      </div>
    </div>
  );
}

export default ButtonHierarchy;
