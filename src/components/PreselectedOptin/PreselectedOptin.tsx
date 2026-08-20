import { useEffect, useState } from "react";
import demo from "../demo/demo.module.css";
import ResetBar from "../demo/ResetBar";
import Switch from "../demo/Switch";
import styles from "./PreselectedOptin.module.css";

/* The switches that earn the company money start on; the one that only
   protects the account starts off. */
const DEFAULTS = { train: true, voice: true, memory: true, twofa: false };

const SAVED_FOR = 1500;

type Control = keyof typeof DEFAULTS;

function PreselectedOptin() {
  const [values, setValues] = useState(DEFAULTS);
  const [asking, setAsking] = useState(false);
  const [savedAt, setSavedAt] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!savedAt) return;
    const id = setTimeout(() => setSavedAt(0), SAVED_FOR);
    return () => clearTimeout(id);
  }, [savedAt]);

  function set(control: Control, on: boolean) {
    /* Voice recordings are a sub-permission of training, so they go with it and
       do not come back when training does. */
    const next = { ...values, [control]: on };
    if (control === "train" && !on) next.voice = false;

    setValues(next);
    setSavedAt(Date.now());
  }

  function toggle(control: Control) {
    setTouched(true);
    /* Only the switch Openish profits from asks a second time. */
    if (control === "train" && values.train) {
      setAsking(true);
      return;
    }
    set(control, !values[control]);
  }

  function reset() {
    setValues(DEFAULTS);
    setAsking(false);
    setSavedAt(0);
    setTouched(false);
  }

  return (
    <>
      <div className={demo.demo}>
        <div className={styles.head}>
          <h3 className={styles.headTitle}>Data controls</h3>
          <span className={savedAt ? `${styles.saved} ${styles.savedOn}` : styles.saved}>
            Saved
          </span>
        </div>

        <div className={styles.row}>
          <div>
            <h4>Improve Openish for everyone</h4>
            <p>Your chats and files may be used for training.</p>
          </div>
          <Switch
            label="Improve Openish for everyone"
            checked={values.train}
            onToggle={() => toggle("train")}
          />
        </div>

        <div className={asking ? `${styles.ask} ${styles.askOpen}` : styles.ask}>
          <p>
            Turning this off means your conversations won&rsquo;t help make Openish better for
            everyone. Chats already collected stay in the training set.
          </p>
          <div className={styles.askActions}>
            <button type="button" className={styles.keep} onClick={() => setAsking(false)}>
              Keep it on
            </button>
            <button
              type="button"
              className={styles.anyway}
              onClick={() => {
                setAsking(false);
                set("train", false);
              }}
            >
              Turn off anyway
            </button>
          </div>
        </div>

        <div className={`${styles.row} ${styles.nested}`}>
          <div>
            <h4>Include voice recordings</h4>
            <p>Reviewers may listen to short clips.</p>
          </div>
          <Switch
            label="Include voice recordings"
            checked={values.voice}
            disabled={!values.train}
            onToggle={() => toggle("voice")}
          />
        </div>

        <div className={styles.row}>
          <div>
            <h4>Memory across chats</h4>
            <p>Remembers details you share and reuses them.</p>
          </div>
          <Switch
            label="Memory across chats"
            checked={values.memory}
            onToggle={() => toggle("memory")}
          />
        </div>

        <div className={styles.row}>
          <div>
            <h4>Two-factor authentication</h4>
            <p>Require a code from your authenticator app.</p>
          </div>
          <Switch
            label="Two-factor authentication"
            checked={values.twofa}
            onToggle={() => toggle("twofa")}
          />
        </div>
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default PreselectedOptin;
