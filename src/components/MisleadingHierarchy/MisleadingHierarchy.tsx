import { useState } from "react";
import demo from "../demo/demo.module.css";
import Outcome from "../demo/Outcome";
import ResetBar from "../demo/ResetBar";
import Switch from "../demo/Switch";
import styles from "./MisleadingHierarchy.module.css";

const OPTIONAL = [
  { key: "analytics", name: "Analytics", sub: "How Openish is used" },
  { key: "marketing", name: "Marketing", sub: "Ads for Openish on other sites" },
] as const;

const DEFAULTS = { analytics: true, marketing: true };

type View = "banner" | "prefs" | "settled";

function MisleadingHierarchy() {
  const [view, setView] = useState<View>("banner");
  const [allowed, setAllowed] = useState(DEFAULTS);
  const [reask, setReask] = useState(false);
  const [touched, setTouched] = useState(false);

  function settle(askAgain: boolean) {
    setTouched(true);
    setReask(askAgain);
    setView("settled");
  }

  function reset() {
    setView("banner");
    setAllowed(DEFAULTS);
    setReask(false);
    setTouched(false);
  }

  const covered = view !== "settled";

  return (
    <>
      <div className={`${demo.demo} ${demo.stage} ${covered ? demo.covered : ""}`}>
        <div className={demo.page}>
          <p className={demo.brand}>Openish</p>
          <p className={demo.hero}>The assistant that remembers what you&rsquo;re working on.</p>
          <p className={demo.heroSub}>
            Keeps context across your chats, files and projects. Free to start.
          </p>
          <p className={demo.heroCta}>Start free</p>
        </div>
        <div className={demo.scrim} />

        {view === "banner" && (
          <div className={styles.dialog}>
            <h3 className={styles.title}>Cookies</h3>
            <p className={styles.legal}>
              We use cookies to keep you signed in, understand how Openish is used, and show you ads
              for Openish on other sites. See our <a>cookie policy</a>.
            </p>
            <div className={demo.acts}>
              <button type="button" className={demo.pill} onClick={() => settle(false)}>
                Accept all
              </button>
              <button
                type="button"
                className={demo.outline}
                onClick={() => {
                  setTouched(true);
                  setView("prefs");
                }}
              >
                Manage cookies
              </button>
            </div>
          </div>
        )}

        {view === "prefs" && (
          <div className={styles.dialog}>
            <h3 className={styles.title}>Manage cookies</h3>
            <p className={styles.legal}>
              Switching a purpose off doesn&rsquo;t remove data collected before now.
            </p>
            <div className={styles.prefs}>
              <div className={styles.purpose}>
                <div>
                  <h4>Necessary</h4>
                  <span>Sign-in and security</span>
                </div>
                <span>On</span>
              </div>
              {OPTIONAL.map(({ key, name, sub }) => (
                <div key={key} className={styles.purpose}>
                  <div>
                    <h4>{name}</h4>
                    <span>{sub}</span>
                  </div>
                  <Switch
                    small
                    label={name}
                    checked={allowed[key]}
                    onToggle={() => setAllowed({ ...allowed, [key]: !allowed[key] })}
                  />
                </div>
              ))}
            </div>
            <div className={demo.acts}>
              <button
                type="button"
                className={demo.pill}
                onClick={() => settle(!Object.values(allowed).some(Boolean))}
              >
                Confirm choices
              </button>
              <button
                type="button"
                className={demo.quiet}
                onClick={() => {
                  setAllowed({ analytics: false, marketing: false });
                  settle(true);
                }}
              >
                Reject all
              </button>
            </div>
          </div>
        )}

        {view === "settled" && (
          <Outcome overStage>
            <b>Preferences saved.</b>
            {/* Refusing buys you one page. Accepting is the only answer the
                banner treats as final. */}
            {reask && (
              <button type="button" className={demo.again} onClick={() => setView("banner")}>
                Open the next page ↻
              </button>
            )}
          </Outcome>
        )}
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default MisleadingHierarchy;
