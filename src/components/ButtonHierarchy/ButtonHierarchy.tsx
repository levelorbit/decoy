import styles from "./ButtonHierarchy.module.css";

type ButtonHierarchyProps = {
  deceptive?: boolean;
};

function ButtonHierarchy({ deceptive = true }: ButtonHierarchyProps) {
  return (
    <div className={styles.card}>
      <h4 className={styles.heading}>We value your privacy</h4>
      <p className={styles.copy}>
        We use cookies to personalize content, run ads, and measure how they perform.
      </p>

      <div className={styles.actions}>
        <button className={deceptive ? styles.accept : styles.equal}>Accept all</button>
        <button className={deceptive ? styles.ghost : styles.equal}>Reject all</button>
      </div>
    </div>
  );
}

export default ButtonHierarchy;
