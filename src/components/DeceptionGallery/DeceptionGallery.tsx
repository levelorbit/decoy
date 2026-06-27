import styles from "./DeceptionGallery.module.css";
import DeceptionCard from "../DeceptionCard/DeceptionCard";
import { patterns } from "./patterns";

function DeceptionGallery() {
  return (
    <div className={styles.gallery}>
      {patterns.map((p, i) => (
        <DeceptionCard key={p.id} index={i + 1} title={p.title} description={p.description}>
          {p.render}
        </DeceptionCard>
      ))}
    </div>
  );
}

export default DeceptionGallery;
