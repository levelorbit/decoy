import styles from "./Confirmshaming.module.css";

function Confirmshaming({ confirmshaming = true }) {
  return (
    <div className={styles.confirmshaming}>
      <div className={styles["confirmshaming-group"]}>
        <div className={styles["confirmshaming-offer"]}>
          Get notified about sales and exclusive offers?
        </div>
        <button className={styles["confirmshaming-offer-btn"]}>Yes, sign me up</button>
      </div>
      <button className={styles["confirmshaming-btn"]}>
        {confirmshaming ? "No thanks, I hate saving money." : "No thanks."}
      </button>
    </div>
  );
}

export default Confirmshaming;
