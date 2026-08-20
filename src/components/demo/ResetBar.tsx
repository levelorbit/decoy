import styles from "./demo.module.css";

type ResetBarProps = {
  /* Reset appears only once a demo has been driven off its opening state, so
     an untouched card carries no chrome it hasn't earned. */
  show: boolean;
  onReset: () => void;
};

function ResetBar({ show, onReset }: ResetBarProps) {
  if (!show) return null;

  return (
    <div className={styles.resetBar}>
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default ResetBar;
