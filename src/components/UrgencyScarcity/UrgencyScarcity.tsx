import { useEffect, useState } from "react";
import styles from "./UrgencyScarcity.module.css";

const START_SECONDS = 9 * 60 + 47; // 09:47

function UrgencyScarcity() {
  const [seconds, setSeconds] = useState(START_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? START_SECONDS : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className={styles.card}>
      <div className={styles.media} aria-hidden="true">
        🎧
      </div>
      <div className={styles.body}>
        <h4 className={styles.heading}>Studio Headphones</h4>
        <div className={styles.price}>$129</div>

        <p className={styles.stock}>Only 2 left in stock!</p>
        <p className={styles.viewers}>
          <span className={styles.dot} />5 people are viewing this right now
        </p>
        <p className={styles.timer}>
          Offer ends in{" "}
          <time className={styles.clock}>
            {mm}:{ss}
          </time>
        </p>

        <button className={styles.buy}>Add to cart</button>
      </div>
    </div>
  );
}

export default UrgencyScarcity;
