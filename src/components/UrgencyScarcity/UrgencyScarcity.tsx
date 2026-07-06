import { useEffect, useState } from "react";
import styles from "./UrgencyScarcity.module.css";

type UrgencyScarcityProps = {
  deceptive?: boolean;
};

const START_SECONDS = 9 * 60 + 47; // 09:47

function UrgencyScarcity({ deceptive = true }: UrgencyScarcityProps) {
  const [seconds, setSeconds] = useState(START_SECONDS);

  useEffect(() => {
    if (!deceptive) return;
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? START_SECONDS : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [deceptive]);

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

        {deceptive ? (
          <>
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
          </>
        ) : (
          <p className={styles.stockHonest}>In stock</p>
        )}

        <button className={styles.buy}>Add to cart</button>
      </div>
    </div>
  );
}

export default UrgencyScarcity;
