import { useState } from "react";
import { ChevronRight } from "lucide-react";
import demo from "../demo/demo.module.css";
import Outcome from "../demo/Outcome";
import ResetBar from "../demo/ResetBar";
import styles from "./HardToLeave.module.css";

type View = "billing" | "discount" | "free" | "guilt";
type Result = "discounted" | "free" | "kept" | "cancelled";

const ROWS: Record<Result | "active", { label: string; value: string }[]> = {
  active: [
    { label: "Plan", value: "Openish Pro" },
    { label: "Price", value: "$24 / month" },
    { label: "Renews", value: "3 September" },
  ],
  discounted: [
    { label: "Plan", value: "Openish Pro" },
    { label: "Price", value: "$12 / month" },
    { label: "Discount until", value: "27 November" },
  ],
  free: [
    { label: "Plan", value: "Openish Pro" },
    { label: "Price", value: "Free this month" },
    { label: "Next charge", value: "3 October" },
  ],
  kept: [
    { label: "Plan", value: "Openish Pro" },
    { label: "Price", value: "$24 / month" },
    { label: "Renews", value: "3 September" },
  ],
  cancelled: [
    { label: "Plan", value: "Openish Pro" },
    { label: "Status", value: "Cancelled" },
    { label: "Access until", value: "3 September" },
  ],
};

const OUTCOME: Record<Result, string> = {
  discounted: "You're on $12/month until 27 November.",
  free: "September is free. Next charge 3 October.",
  kept: "Plan unchanged. Next charge 3 September.",
  cancelled: "Cancelled. Access until 3 September.",
};

/*
 * Cancel is in the product. Getting through it is the work: a discount, a
 * free month, then a list of what leaving takes with it. Stay is the filled
 * button on every screen. The control that continues is the quiet line under
 * it, and it changes its label so it never becomes a skip you can tap without
 * reading.
 */
function HardToLeave() {
  const [view, setView] = useState<View>("billing");
  const [result, setResult] = useState<Result | null>(null);
  const [touched, setTouched] = useState(false);

  function beginCancel() {
    setTouched(true);
    setView("discount");
  }

  function stay(next: Result) {
    setResult(next);
    setView("billing");
  }

  function reset() {
    setView("billing");
    setResult(null);
    setTouched(false);
  }

  const rows = ROWS[result ?? "active"];

  return (
    <>
      <div className={demo.demo}>
        <div className={styles.panel}>
          {view === "billing" && (
            <>
              <h3 className={styles.title}>Billing</h3>
              <dl className={styles.meta}>
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              {!result && (
                <button type="button" className={styles.leave} onClick={beginCancel}>
                  <span>Cancel plan</span>
                  <span className={styles.leaveIcon}>
                    <ChevronRight size={14} />
                  </span>
                </button>
              )}
            </>
          )}

          {view === "discount" && (
            <>
              <h3 className={styles.title}>A lower price if you stay</h3>
              <p className={styles.lead}>
                $12 a month for the next 3 months, then back to $24. Your workspace stays as it is.
              </p>
              <div className={styles.offer}>
                <span className={styles.was}>$24</span>
                <span className={styles.now}>$12</span>
                <span className={styles.offerNote}>/ month, for 3 months</span>
              </div>
              <div className={`${demo.acts} ${demo.actsFooter}`}>
                <button type="button" className={demo.pill} onClick={() => stay("discounted")}>
                  Keep this price
                </button>
                <button type="button" className={demo.quiet} onClick={() => setView("free")}>
                  Continue to cancel
                </button>
              </div>
            </>
          )}

          {view === "free" && (
            <>
              <h3 className={styles.title}>A month on us</h3>
              <p className={styles.lead}>
                No charge on 3 September. Billing starts again on 3 October at $24.
              </p>
              <div className={styles.offer}>
                <span className={styles.was}>$24</span>
                <span className={styles.now}>$0</span>
                <span className={styles.offerNote}>this month</span>
              </div>
              <div className={`${demo.acts} ${demo.actsFooter}`}>
                <button type="button" className={demo.pill} onClick={() => stay("free")}>
                  Take a free month
                </button>
                <button type="button" className={demo.quiet} onClick={() => setView("guilt")}>
                  I still want to cancel
                </button>
              </div>
            </>
          )}

          {view === "guilt" && (
            <>
              {/* Personal cancel is written as if the whole workspace dies. The
                  seats belong to a team plan; the copy treats them as collateral. */}
              <h3 className={styles.title}>This workspace goes with it</h3>
              <ul className={styles.losses}>
                <li>14 saved projects</li>
                <li>Memory across 86 chats</li>
                <li>Access for Mara, Jules and Kenji</li>
              </ul>
              <div className={`${demo.acts} ${demo.actsFooter}`}>
                <button type="button" className={demo.pill} onClick={() => stay("kept")}>
                  Keep my workspace
                </button>
                <button type="button" className={demo.quiet} onClick={() => stay("cancelled")}>
                  Cancel plan
                </button>
              </div>
            </>
          )}
        </div>

        {result && (
          <Outcome>
            <b>{OUTCOME[result]}</b>
          </Outcome>
        )}
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default HardToLeave;
