import styles from "./App.module.css";
import DeceptionGallery from "./components/DeceptionGallery/DeceptionGallery";

function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Decoy</h1>
        <p className={styles.tagline}>
          A hands-on collection of deceptive patterns. Each one is here in its deceptive form, and
          every card flips to reveal the method behind it.
        </p>
      </header>

      <main>
        <DeceptionGallery />
      </main>
    </div>
  );
}

export default App;
