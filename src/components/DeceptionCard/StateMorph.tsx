import { Fragment, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./StateMorph.module.css";

type StateMorphProps = {
  deceptive: boolean;
  children: (deceptive: boolean) => ReactNode;
};

function StateMorph({ deceptive, children }: StateMorphProps) {
  const deceptiveRef = useRef<HTMLDivElement>(null);
  const honestRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  /*
   * Both layers stay mounted for the crossfade, so a demo keeps any state
   * the viewer changed (unchecked opt-in, drifted countdown) while hidden.
   * Bumping a layer's key when it becomes visible remounts its demo fresh
   * at the moment of reveal; the outgoing layer's key is untouched, so it
   * doesn't visibly reset mid-fade.
   */
  const reveals = useRef({ honest: 0, deceptive: 0 });
  const prevDeceptive = useRef(deceptive);
  if (prevDeceptive.current !== deceptive) {
    prevDeceptive.current = deceptive;
    if (deceptive) reveals.current.deceptive++;
    else reveals.current.honest++;
  }

  useLayoutEffect(() => {
    const el = deceptive ? deceptiveRef.current : honestRef.current;
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [deceptive]);

  return (
    <div className={styles.morph} style={height === null ? undefined : { height }}>
      <div ref={honestRef} className={styles.base} data-covered={deceptive ? "" : undefined}>
        <Fragment key={reveals.current.honest}>{children(false)}</Fragment>
      </div>
      <div ref={deceptiveRef} className={styles.top} data-hidden={deceptive ? undefined : ""}>
        <Fragment key={reveals.current.deceptive}>{children(true)}</Fragment>
      </div>
    </div>
  );
}

export default StateMorph;
