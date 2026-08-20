import styles from "./demo.module.css";

type SwitchProps = {
  checked: boolean;
  label: string;
  onToggle: () => void;
  disabled?: boolean;
  small?: boolean;
};

function Switch({ checked, label, onToggle, disabled = false, small = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={small ? `${styles.switch} ${styles.switchSmall}` : styles.switch}
      onClick={onToggle}
    />
  );
}

export default Switch;
