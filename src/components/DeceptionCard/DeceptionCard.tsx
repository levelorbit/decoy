import { useId, useRef } from "react";
import type { ReactNode } from "react";
import { Info, X } from "lucide-react";
import styles from "./DeceptionCard.module.css";

type DeceptionCardProps = {
  title: string;
  method: string[];
  children: ReactNode;
};

/*
 * The reveal is a modal rather than a second face of the card. Method copy is
 * no longer capped by the height of the demo beside it, and the demo keeps
 * whatever state it was left in while you read about it.
 */
function DeceptionCard({ title, method, children }: DeceptionCardProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          type="button"
          className={styles.reveal}
          aria-label={`How ${title.toLowerCase()} works`}
          onClick={() => dialog.current?.showModal()}
        >
          <Info size={15} />
        </button>
      </div>

      {children}

      <dialog
        ref={dialog}
        className={styles.modal}
        aria-labelledby={titleId}
        /* Clicks land on the dialog element itself only when they miss the
           panel, which is what makes this a backdrop click. */
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className={styles.modalHead}>
          <h3 id={titleId} className={styles.modalTitle}>
            {title}
          </h3>
          <button
            type="button"
            className={styles.modalClose}
            aria-label="Close"
            onClick={() => dialog.current?.close()}
          >
            <X size={15} />
          </button>
        </div>
        <div className={styles.modalBody}>
          {method.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </dialog>
    </article>
  );
}

export default DeceptionCard;
