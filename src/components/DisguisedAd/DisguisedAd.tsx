import styles from "./DisguisedAd.module.css";

function DisguisedAd() {
  return (
    <div className={styles.card}>
      <div className={styles.file}>
        <h4 className={styles.heading}>quarterly-report.pdf</h4>
        <p className={styles.meta}>2.4 MB · updated May 12</p>
      </div>

      <button className={styles.adButton}>
        Download Now
        <span className={styles.adTag}>Ad</span>
      </button>
      <button className={styles.realLink}>quarterly-report.pdf</button>
    </div>
  );
}

export default DisguisedAd;
