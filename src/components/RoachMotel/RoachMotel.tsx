import styles from "./RoachMotel.module.css";

function RoachMotel() {
  return (
    <div className={styles.card}>
      <div className={styles.plan}>
        <h4 className={styles.heading}>Your subscription</h4>
        <p className={styles.detail}>Premium · $12/month · renews Aug 1</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.primary}>Upgrade plan</button>
        <button className={styles.secondary}>Pause subscription</button>
      </div>

      <p className={styles.fine}>To cancel, call 1-800-555-0134, Mon–Fri 9am–5pm.</p>
    </div>
  );
}

export default RoachMotel;
