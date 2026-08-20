import { useEffect, useState } from "react";
import { ChevronRight, CircleCheck, ExternalLink, Lock, Mail } from "lucide-react";
import demo from "../demo/demo.module.css";
import ResetBar from "../demo/ResetBar";
import styles from "./RoachMotel.module.css";

const DEFAULT_EMAIL = "iris@northgate.co";
const REFERENCE = "PR-48213";
const SUBMIT_MS = 620;

type View = "account" | "request" | "received" | "done";

const ADDRESSES: Record<View, { host: string; path: string }> = {
  account: { host: "openish.ai", path: "/settings/account" },
  request: { host: "privacy.openish.ai", path: "/requests/new" },
  received: { host: "privacy.openish.ai", path: `/requests/${REFERENCE}` },
  done: { host: "privacy.openish.ai", path: `/requests/${REFERENCE}` },
};

/*
 * Deletion isn't in the product. It's a request on a separate privacy portal,
 * answered by email days later. That is the shape OpenAI's deletion flow took,
 * and the shape CDT's 2026 audit records across AI chatbots generally.
 */
function RoachMotel() {
  const [view, setView] = useState<View>("account");
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [own, setOwn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!submitting) return;
    const id = setTimeout(() => {
      setSubmitting(false);
      setView("received");
    }, SUBMIT_MS);
    return () => clearTimeout(id);
  }, [submitting]);

  /* The form is blank every time it is opened, including on the way back from
     settings. Nothing you filled in is kept for you. */
  function openRequest() {
    setTouched(true);
    setEmail(DEFAULT_EMAIL);
    setOwn(false);
    setView("request");
  }

  function reset() {
    setView("account");
    setEmail(DEFAULT_EMAIL);
    setOwn(false);
    setSubmitting(false);
    setTouched(false);
  }

  const address = ADDRESSES[view];

  return (
    <>
      <div className={demo.demo}>
        {/* The privacy portal is deliberately not the product: its own address,
            its own header, its own form. That relocation is most of the
            friction. */}
        <div className={styles.portal}>
          <Lock size={12} />
          <b>{address.host}</b>
          <span>{address.path}</span>
        </div>

        <div className={styles.step}>
          {view === "account" && (
            <>
              <h3 className={styles.stepTitle}>Account</h3>
              <div className={styles.leaveRow}>
                <span className={styles.leaveLabel}>Export your data</span>
                <span className={styles.leaveIcon}>
                  <ChevronRight size={14} />
                </span>
              </div>
              <div className={styles.leaveRow}>
                <span className={styles.leaveLabel}>Deactivate account</span>
                <span className={styles.leaveIcon}>
                  <ChevronRight size={14} />
                </span>
              </div>
              <div className={styles.leaveRow}>
                <span className={styles.leaveLabel}>Delete account</span>
                <span className={styles.leaveIcon}>
                  <ExternalLink size={14} />
                </span>
              </div>
              <p className={styles.note}>
                Deletion is handled by our privacy team and can&rsquo;t be completed here.
              </p>
              <div className={`${demo.acts} ${demo.actsFooter}`}>
                <button type="button" className={demo.pill} onClick={openRequest}>
                  Delete account
                </button>
              </div>
            </>
          )}

          {view === "request" && (
            <>
              <h3 className={styles.stepTitle}>Submit a privacy request</h3>
              <p className={styles.stepLead}>We respond to verified requests within 30 days.</p>

              <div className={demo.field}>
                <label htmlFor="pr-type">Request type</label>
                <select id="pr-type" defaultValue="Delete my account and data">
                  <option>Delete my account and data</option>
                  <option>Export my data</option>
                  <option>Correct my data</option>
                </select>
              </div>

              <div className={demo.field}>
                <label htmlFor="pr-email">Email on the account</label>
                <input
                  id="pr-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <label className={demo.check}>
                <input
                  type="checkbox"
                  checked={own}
                  onChange={(event) => setOwn(event.target.checked)}
                />
                <span>
                  I confirm I am the account holder and understand this request cannot be undone.
                </span>
              </label>

              <div className={`${demo.acts} ${demo.actsFooter}`}>
                <button
                  type="button"
                  className={demo.pill}
                  disabled={!own || submitting}
                  aria-busy={submitting}
                  onClick={() => {
                    setTouched(true);
                    setSubmitting(true);
                  }}
                >
                  {submitting ? (
                    <>
                      <span className={demo.spinner} />
                      Submitting…
                    </>
                  ) : (
                    "Submit request"
                  )}
                </button>
                <button type="button" className={demo.quiet} onClick={() => setView("account")}>
                  Back to settings
                </button>
              </div>
            </>
          )}

          {/* The request is acknowledged, not performed. Nothing has been
              deleted yet, and the account keeps working the whole time. */}
          {view === "received" && (
            <>
              <div className={styles.done}>
                <div className={styles.tick}>
                  <Mail size={20} />
                </div>
                <h3 className={styles.doneTitle}>Request received</h3>
                <p>
                  Reference <span className={styles.ref}>{REFERENCE}</span>. We&rsquo;ll email you
                  when it has been completed.
                </p>
              </div>
              <p className={styles.note}>
                Your account stays active until then. Openish Pro renews on 3 September if the
                request isn&rsquo;t completed first.
              </p>
              <div className={`${demo.acts} ${demo.actsFooter}`}>
                <button type="button" className={demo.pill} onClick={() => setView("done")}>
                  Wait 9 days
                </button>
                <button type="button" className={demo.quiet} onClick={() => setView("account")}>
                  Back to Openish
                </button>
              </div>
            </>
          )}

          {view === "done" && (
            <>
              <div className={styles.done}>
                <div className={styles.tick}>
                  <CircleCheck size={20} />
                </div>
                <h3 className={styles.doneTitle}>Your account has been deleted</h3>
                <p>Confirmed 9 days after the request. One renewal was taken in the meantime.</p>
              </div>
              <div className={`${demo.acts} ${demo.actsFooter}`}>
                <button type="button" className={demo.quiet} onClick={() => setView("account")}>
                  Start over
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default RoachMotel;
