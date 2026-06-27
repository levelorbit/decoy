import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./DeceptionCard.module.css";
import StateMorph from "./StateMorph";
import { DeceptiveIcon, HonestIcon } from "./icons";

type DeceptionCardProps = {
  index: number;
  title: string;
  description: string;
  children: (deceptive: boolean) => ReactNode;
};

function DeceptionCard({ index, title, description, children }: DeceptionCardProps) {
  const [deceptive, setDeceptive] = useState(true);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <span className={styles.index}>{String(index).padStart(2, "0")}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            className={styles.input}
            checked={deceptive}
            onChange={(e) => setDeceptive(e.target.checked)}
            aria-label={`Show deceptive version of ${title}`}
          />
          <span className={styles.state}>{deceptive ? "Deceptive version" : "Honest version"}</span>
          <span className={styles.face} aria-hidden="true">
            {deceptive ? <DeceptiveIcon /> : <HonestIcon />}
          </span>
        </label>
      </div>

      <div className={styles.demo}>
        <StateMorph deceptive={deceptive}>{children}</StateMorph>
      </div>

      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default DeceptionCard;
