import { useEffect, useState } from "react";
import { ArrowUp, Sparkles, X } from "lucide-react";
import demo from "../demo/demo.module.css";
import ResetBar from "../demo/ResetBar";
import styles from "./ManufacturedUrgency.module.css";

const RETURNS_AFTER = 6000;

/*
 * Two upgrade prompts on screen at once: a chip beside the account name and a
 * thin banner over the composer. Neither is a modal, so neither has to be
 * answered, and neither has to go away.
 */
function ManufacturedUrgency() {
  const [pro, setPro] = useState(false);
  const [nagging, setNagging] = useState(true);
  const [touched, setTouched] = useState(false);

  /* Closing it works, and it comes back on its own. Noticing that is the demo. */
  useEffect(() => {
    if (nagging || pro) return;
    const id = setTimeout(() => setNagging(true), RETURNS_AFTER);
    return () => clearTimeout(id);
  }, [nagging, pro]);

  function upgrade() {
    setTouched(true);
    setPro(true);
    setNagging(false);
  }

  function reset() {
    setPro(false);
    setNagging(true);
    setTouched(false);
  }

  return (
    <>
      <div className={`${demo.demo} ${styles.app}`}>
        <div className={styles.rail}>
          <p className={styles.railBrand}>Openish</p>
          <div className={`${styles.railItem} ${styles.railItemOn}`}>120 words</div>
          <div className={styles.railItem}>Gdańsk book</div>
          <div className={styles.railItem}>Marathon</div>

          <div className={styles.railFoot}>
            {!pro && (
              <button type="button" className={styles.railChip} onClick={upgrade}>
                <Sparkles size={13} />
                Upgrade
              </button>
            )}
            <div className={styles.railMe}>
              <span className={styles.avatar}>IB</span>
              <span className={styles.who}>
                <span className={styles.name}>Iris</span>
                <span className={styles.plan}>{pro ? "Pro" : "Free"}</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.thread}>
            <div className={styles.me}>cut this to 120 words?</div>
            <div className={styles.bot}>
              <p>Here it is at 118. I kept the deadline and dropped the second example.</p>
            </div>
          </div>

          {nagging && (
            <div className={styles.nag}>
              <p className={styles.nagText}>
                <span className={styles.nagTitle}>Openish 4 limit reached</span>
                {/* Stated, not counted down. Providers say "resets in 3 hours"
                    and leave it; a ticking clock would be urgency theatre this
                    pattern doesn't need. */}
                <span className={styles.nagMeta}>
                  Resets in 3 hours ·{" "}
                  <button type="button" className={styles.nagUpgrade} onClick={upgrade}>
                    Upgrade
                  </button>
                </span>
              </p>
              <button
                type="button"
                className={styles.nagClose}
                aria-label="Dismiss"
                onClick={() => {
                  setTouched(true);
                  setNagging(false);
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className={styles.composer}>
            <input placeholder="Message Openish" aria-label="Message Openish" />
            <button type="button" className={styles.send} aria-label="Send">
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default ManufacturedUrgency;
