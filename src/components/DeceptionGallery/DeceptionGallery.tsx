import styles from "./DeceptionGallery.module.css";
import DeceptionCard from "../DeceptionCard/DeceptionCard";
import { patterns } from "./patterns";

function DeceptionGallery() {
  return (
    <div className={styles.gallery}>
      {patterns.map((p) => (
        <DeceptionCard key={p.id} title={p.title} method={p.method}>
          {p.render()}
        </DeceptionCard>
      ))}
    </div>
  );
}

export default DeceptionGallery;
