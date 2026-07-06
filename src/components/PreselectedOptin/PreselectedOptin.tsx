import { useState } from "react";
import styles from "./PreselectedOptin.module.css";

type PreselectedOptinProps = {
  deceptive?: boolean;
};

function PreselectedOptin({ deceptive = true }: PreselectedOptinProps) {
  const [subscribed, setSubscribed] = useState(deceptive);

  return (
    <div className={styles.card}>
      <h4 className={styles.heading}>Create your account</h4>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Email</span>
        <input className={styles.input} type="email" placeholder="you@example.com" />
      </label>

      <button className={styles.submit}>Create account</button>

      <label className={`${styles.optin} ${deceptive ? styles.buried : ""}`}>
        <input
          type="checkbox"
          checked={subscribed}
          onChange={(e) => setSubscribed(e.target.checked)}
        />
        <span>Send me marketing emails, product news, and special offers</span>
      </label>
    </div>
  );
}

export default PreselectedOptin;
