import { useLayoutEffect, useRef, useState } from "react";
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
        {children(false)}
      </div>
      <div ref={deceptiveRef} className={styles.top} data-hidden={deceptive ? undefined : ""}>
        {children(true)}
      </div>
    </div>
  );
}

export default StateMorph;
