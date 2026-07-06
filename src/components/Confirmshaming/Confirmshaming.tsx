import styles from "./Confirmshaming.module.css";

type ConfirmshamingProps = {
  shaming?: boolean;
};

function Confirmshaming({ shaming = true }: ConfirmshamingProps) {
  return (
    <div className={styles.card}>
      <h4 className={styles.heading}>Get notified about sales and exclusive offers?</h4>

      <div className={styles.actions}>
        <button className={styles.signup}>Yes, sign me up</button>
        <button className={styles.decline}>
          {shaming ? "No thanks, I hate saving money." : "No thanks."}
        </button>
      </div>
    </div>
  );
}

export default Confirmshaming;
