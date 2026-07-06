import styles from "./DisguisedAd.module.css";

type DisguisedAdProps = {
  deceptive?: boolean;
};

function DisguisedAd({ deceptive = true }: DisguisedAdProps) {
  return (
    <div className={styles.card}>
      <div className={styles.file}>
        <h4 className={styles.heading}>quarterly-report.pdf</h4>
        <p className={styles.meta}>2.4 MB · updated May 12</p>
      </div>

      {deceptive ? (
        <>
          <button className={styles.adButton}>
            Download Now
            <span className={styles.adTag}>Ad</span>
          </button>
          <button className={styles.realLink}>quarterly-report.pdf</button>
        </>
      ) : (
        <>
          <button className={styles.download}>Download</button>
          <div className={styles.adBox}>
            <span className={styles.adLabel}>Advertisement</span>
            <span>Speed up your downloads with TurboFetch Pro</span>
          </div>
        </>
      )}
    </div>
  );
}

export default DisguisedAd;
