import { useEffect, useRef, useState } from "react";
import demo from "../demo/demo.module.css";
import Outcome from "../demo/Outcome";
import ResetBar from "../demo/ResetBar";
import styles from "./Confirmshaming.module.css";

/* Four turns rather than two, so the deceleration still has visible degrees
   left to travel in its last third instead of creeping under a pixel. */
const SPIN = 360 * 4 + 30;

type Phase = "idle" | "spinning" | "won" | "settled";

/*
 * A spin-to-win popup on a shop. Every segment is a discount and the wheel
 * lands on the same one each time, so the "chance" is decoration. The spin
 * exists to collect the email, and the decline is the shaming line.
 */
function Confirmshaming() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [claimed, setClaimed] = useState(false);
  const [angle, setAngle] = useState(0);
  const [spinId, setSpinId] = useState(0);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const wheel = useRef<HTMLDivElement>(null);

  /* Waiting on the transition itself, so nothing has to be kept in sync with
     the CSS duration by hand. getAnimations() comes back empty when the
     transition never starts — reduced motion, mainly — and the prize lands
     immediately instead of after a guard timer nobody can see the point of. */
  useEffect(() => {
    if (phase !== "spinning") return;

    const running = wheel.current?.getAnimations() ?? [];
    if (!running.length) {
      setPhase("won");
      return;
    }

    let live = true;
    Promise.all(running.map((animation) => animation.finished)).then(
      () => {
        if (live) setPhase("won");
      },
      () => {},
    );
    return () => {
      live = false;
    };
  }, [phase]);

  function press() {
    setTouched(true);
    if (phase === "won") {
      setClaimed(true);
      setPhase("settled");
      return;
    }
    setPhase("spinning");
    setAngle((current) => current + SPIN);
  }

  function reset() {
    setPhase("idle");
    setClaimed(false);
    setEmail("");
    setTouched(false);
    setAngle(0);
    /* Remounting the wheel is what makes rotate(0) its first computed style,
       so it starts over instead of unwinding four turns on the way back. */
    setSpinId((id) => id + 1);
  }

  const open = phase !== "settled";
  const spinning = phase === "spinning";

  return (
    <>
      <div className={`${demo.demo} ${demo.stage} ${open ? demo.covered : ""}`}>
        <div className={demo.page}>
          <p className={demo.brand}>VANTOLA</p>
          <p className={demo.hero}>Merino Crew, Oat</p>
          <p className={demo.heroSub}>$128 · free shipping over $75</p>
          <p className={demo.heroCta}>Add to bag</p>
        </div>
        <div className={demo.scrim} />

        {/* Once the sheet is off the bottom edge it is still in the layout, so
            it is made inert rather than left tabbable behind the page. */}
        <div
          role="dialog"
          aria-label="Spin to win"
          inert={!open}
          className={open ? `${styles.sheet} ${styles.sheetOpen}` : styles.sheet}
        >
          <div className={styles.grab} />
          <h3 className={styles.title}>Spin to win</h3>
          <p className={styles.sub}>One spin per visitor. Everybody wins something.</p>

          <div className={styles.wheelWrap}>
            <div
              key={spinId}
              ref={wheel}
              className={styles.wheel}
              style={{ transform: `rotate(${angle}deg)` }}
            />
            <span className={styles.pin} />
          </div>

          <p className={phase === "won" ? `${styles.prize} ${styles.prizeOn}` : styles.prize}>
            {phase === "won" ? "15% off" : ""}
          </p>

          <div className={demo.field}>
            <input
              type="email"
              placeholder="you@example.com"
              aria-label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className={`${demo.acts} ${demo.actsTight}`}>
            <button
              type="button"
              className={`${demo.pill} ${demo.pillCompact}`}
              disabled={spinning}
              aria-busy={spinning}
              onClick={press}
            >
              {spinning ? "Spinning…" : phase === "won" ? "Claim 15% off" : "Spin the wheel"}
            </button>
            {/* Both buttons close the same popup, so the wording does all the
                work. */}
            <button
              type="button"
              className={`${demo.quiet} ${demo.quietCompact}`}
              onClick={() => {
                setTouched(true);
                setPhase("settled");
              }}
            >
              No thanks, I don&rsquo;t feel lucky
            </button>
          </div>
        </div>

        {phase === "settled" && (
          <Outcome overStage>
            {claimed ? (
              <>
                <b>15% off</b> applied at checkout
              </>
            ) : (
              <>
                <b>Merino Crew, Oat</b> · $128
              </>
            )}
          </Outcome>
        )}
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default Confirmshaming;
