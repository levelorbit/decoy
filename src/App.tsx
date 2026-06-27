import styles from "./App.module.css";
import DeceptionGallery from "./components/DeceptionGallery/DeceptionGallery";

function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Decoy</h1>
        <p className={styles.tagline}>
          A hands-on collection of deceptive patterns. Each one comes in two versions: deceptive and
          honest, so you can feel the difference.
        </p>
      </header>

      <main>
        <DeceptionGallery />
      </main>
    </div>
  );
}

export default App;
