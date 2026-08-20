import type { ReactNode } from "react";
import styles from "./demo.module.css";

type OutcomeProps = {
  /* The stage demos have nothing below them to push an outcome into, so it
     takes the strip the dialog or sheet vacated instead. */
  overStage?: boolean;
  children: ReactNode;
};

function Outcome({ overStage = false, children }: OutcomeProps) {
  return (
    <div className={overStage ? `${styles.outcome} ${styles.stageOutcome}` : styles.outcome}>
      {children}
    </div>
  );
}

export default Outcome;
