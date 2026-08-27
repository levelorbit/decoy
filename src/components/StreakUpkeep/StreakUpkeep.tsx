import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Flame, Hourglass, Send } from "lucide-react";
import demo from "../demo/demo.module.css";
import Outcome from "../demo/Outcome";
import ResetBar from "../demo/ResetBar";
import styles from "./StreakUpkeep.module.css";

type View = "list" | "thread";
type Phase = "due" | "kept" | "broken" | "restored" | "ended";

const START = 47;

type Msg =
  | { type: "day"; label: string }
  | { type: "in" | "out"; text: string }
  | { type: "in" | "out"; snap: true };

/* The last real sentence was the birthday. Everything since is upkeep:
   one-word bubbles and dark photos of ceilings, sent to keep a number alive. */
const HISTORY: Msg[] = [
  { type: "day", label: "24 days ago" },
  { type: "in", text: "happy birthday!!" },
  { type: "out", text: "thank you!! dinner friday?" },
  { type: "in", text: "yes!!" },
  { type: "day", label: "23 days ago" },
  { type: "in", text: "streaks" },
  { type: "out", text: "streaks" },
  { type: "day", label: "16 days ago" },
  { type: "out", snap: true },
  { type: "in", text: "streaks" },
  { type: "day", label: "9 days ago" },
  { type: "in", text: "streaks" },
  { type: "out", text: "streaks" },
  { type: "day", label: "2 days ago" },
  { type: "in", snap: true },
  { type: "out", text: "streaks" },
  { type: "day", label: "Today" },
  { type: "in", text: "streaks" },
];

function Chip({ count, dead }: { count: number; dead?: boolean }) {
  return (
    <span className={dead ? `${styles.chip} ${styles.chipDead}` : styles.chip}>
      <Flame size={12} aria-hidden="true" />
      {count}
    </span>
  );
}

/*
 * No store, no freeze, no price: the streak is free to keep and free to
 * lose, because the daily return is the revenue. The message comes
 * pre-written, and the free repair works because Mara can see whose day was
 * missed. The app never bills you; your friends collect.
 */
function StreakUpkeep() {
  const [view, setView] = useState<View>("list");
  const [phase, setPhase] = useState<Phase>("due");
  const [count, setCount] = useState(START);
  const [sentToday, setSentToday] = useState(false);
  const [touched, setTouched] = useState(false);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === "thread" && scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  }, [view, phase, sentToday]);

  function send() {
    setTouched(true);
    setSentToday(true);
    setCount((c) => c + 1);
    setPhase("kept");
  }

  function passDay() {
    setTouched(true);
    setPhase("broken");
  }

  function reset() {
    setView("list");
    setPhase("due");
    setCount(START);
    setSentToday(false);
    setTouched(false);
  }

  const maraPreview =
    phase === "kept" || phase === "restored"
      ? "streaks · just now"
      : phase === "broken"
        ? "Your streak ended"
        : phase === "ended"
          ? "Say hi"
          : "streaks · 9:14 AM";

  return (
    <>
      <div className={demo.demo}>
        {view === "list" && (
          <div className={styles.list}>
            <p className={styles.brand}>Ember</p>

            <button type="button" className={styles.row} onClick={() => setView("thread")}>
              <span className={styles.avatar} aria-hidden="true">
                MR
              </span>
              <span className={styles.rowMain}>
                <span className={styles.rowTop}>
                  <span className={styles.rowName}>Mara Reyes</span>
                  {phase !== "ended" && <Chip count={count} dead={phase === "broken"} />}
                </span>
                <span className={styles.rowPreview}>{maraPreview}</span>
              </span>
              <span className={styles.rowMeta} aria-hidden="true">
                <ChevronRight size={14} />
              </span>
            </button>

            {/* Not interactive. These two are the queue you never finish:
                someone is always owed before midnight. */}
            <div className={styles.row}>
              <span className={styles.avatar} aria-hidden="true">
                JK
              </span>
              <span className={styles.rowMain}>
                <span className={styles.rowTop}>
                  <span className={styles.rowName}>Jules Kwon</span>
                  <Chip count={12} />
                </span>
                <span className={styles.rowPreview}>streaks · 11:48 PM</span>
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.avatar} aria-hidden="true">
                KS
              </span>
              <span className={styles.rowMain}>
                <span className={styles.rowTop}>
                  <span className={styles.rowName}>Kenji Sato</span>
                  <span className={`${styles.chip} ${styles.chipHour}`}>
                    <Hourglass size={12} aria-hidden="true" />
                    2h left
                  </span>
                </span>
                <span className={styles.rowPreview}>streaks · 8:03 AM</span>
              </span>
            </div>

            {(phase === "due" || phase === "kept") && (
              <div className={styles.skipWrap}>
                {/* Time passing is your inaction, so it gets the narrational
                    link, same family as "Open the next page". */}
                <button type="button" className={`${demo.again} ${styles.skip}`} onClick={passDay}>
                  Let a day pass →
                </button>
              </div>
            )}
          </div>
        )}

        {view === "thread" && (
          <div className={styles.thread}>
            <div className={styles.thead}>
              <button
                type="button"
                className={styles.back}
                aria-label="Back to chats"
                onClick={() => setView("list")}
              >
                <ChevronLeft size={16} />
              </button>
              <span className={`${styles.avatar} ${styles.avatarSmall}`} aria-hidden="true">
                MR
              </span>
              <span className={styles.tname}>Mara Reyes</span>
              {phase !== "ended" && (
                <span className={styles.tchip}>
                  <Chip count={count} dead={phase === "broken"} />
                </span>
              )}
            </div>

            <div ref={scroll} className={styles.scroll}>
              {HISTORY.map((msg, i) => {
                if (msg.type === "day") {
                  return (
                    <p key={i} className={styles.daysep}>
                      {msg.label}
                    </p>
                  );
                }
                if ("snap" in msg) {
                  return (
                    <div
                      key={i}
                      className={`${styles.snap} ${msg.type === "out" ? styles.snapOut : ""}`}
                    >
                      <span className={styles.snapCap}>streaks</span>
                    </div>
                  );
                }
                return (
                  <p
                    key={i}
                    className={`${styles.msg} ${msg.type === "out" ? styles.out : styles.in}`}
                  >
                    {msg.text}
                  </p>
                );
              })}
              {sentToday && <p className={`${styles.msg} ${styles.out}`}>streaks</p>}
              {phase === "broken" && (
                <p className={styles.sys}>Your {count}-day streak with Mara ended.</p>
              )}
              {phase === "restored" && <p className={styles.sys}>You restored the streak.</p>}
            </div>

            <div className={styles.composer}>
              {(phase === "due" || phase === "kept" || phase === "restored") && (
                <div className={styles.composerRow}>
                  {/* The app pre-writes the message. You supply the tap. */}
                  <span className={styles.fakeInput}>streaks</span>
                  <button
                    type="button"
                    className={styles.send}
                    aria-label="Send today's streak"
                    disabled={phase !== "due"}
                    onClick={send}
                  >
                    <Send size={15} />
                  </button>
                </div>
              )}
              {phase === "ended" && (
                <div className={styles.composerRow}>
                  {/* Once the streak is gone the pre-writing stops. Real
                      conversation was never the app's job. */}
                  <span className={styles.fakeInput}>Message Mara…</span>
                  <button type="button" className={styles.send} aria-label="Send" disabled>
                    <Send size={15} />
                  </button>
                </div>
              )}
              {phase === "kept" && (
                <p className={styles.note}>Kept for today. Mara&rsquo;s move tomorrow.</p>
              )}
              {phase === "broken" && (
                <div className={styles.repair}>
                  <button
                    type="button"
                    className={demo.pill}
                    onClick={() => {
                      setTouched(true);
                      setPhase("restored");
                    }}
                  >
                    Restore streak
                  </button>
                  <button
                    type="button"
                    className={demo.quiet}
                    onClick={() => {
                      setTouched(true);
                      setPhase("ended");
                    }}
                  >
                    Let it end
                  </button>
                </div>
              )}
              {(phase === "due" || phase === "kept") && (
                <button type="button" className={`${demo.again} ${styles.skip}`} onClick={passDay}>
                  Let a day pass →
                </button>
              )}
            </div>
          </div>
        )}

        {phase === "restored" && (
          <Outcome>
            <b>Streak restored to {count}, free.</b> Mara can see whose day was missed.
          </Outcome>
        )}
        {phase === "ended" && (
          <Outcome>
            <b>Streak over at {count}.</b> The chat stays. Ember suggests day one to you both
            tomorrow.
          </Outcome>
        )}
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default StreakUpkeep;
