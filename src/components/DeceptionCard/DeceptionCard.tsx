import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./DeceptionCard.module.css";
import { DeceptiveIcon, MethodIcon } from "./icons";

type DeceptionCardProps = {
  title: string;
  method: string;
  children: ReactNode;
};

function DeceptionCard({ title, method, children }: DeceptionCardProps) {
  const [showMethod, setShowMethod] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            className={styles.input}
            checked={showMethod}
            onChange={(e) => setShowMethod(e.target.checked)}
            aria-label={`Show the method behind ${title}`}
          />
          <span className={styles.face} aria-hidden="true">
            {showMethod ? <MethodIcon /> : <DeceptiveIcon />}
          </span>
        </label>
      </div>

      {/*
       * Both faces stay mounted so they can crossfade in place; the hidden
       * one is inert, which keeps its controls out of the tab order and out
       * of the accessibility tree while it can't be seen.
       */}
      <div className={styles.swap}>
        <div className={`${styles.swapFace} ${styles.demoFace}`} inert={showMethod}>
          {children}
        </div>
        <div className={styles.swapFace} inert={!showMethod}>
          <p className={styles.method}>{method}</p>
        </div>
      </div>
    </div>
  );
}

export default DeceptionCard;
