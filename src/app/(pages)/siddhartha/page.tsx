import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function SiddharthaProjectPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Siddhartha</h1>
        <p>Literary Analysis & Digital Interpretation</p>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/Siddhartha.png"
          alt="Siddhartha Project Preview"
          fill
          priority
          className={styles.image}
        />
      </div>

      <div className={styles.section}>
        <h2>Overview</h2>
        <p>
          Placeholder content for Siddhartha project. This section will describe the
          intention behind the digital project and its thematic or technical approach.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Role</h2>
        <p>Frontend Dev / Conceptual Design</p>
      </div>

      <div className={styles.section}>
        <h2>Scope</h2>
        <ul className={styles.list}>
          <li>Theme Exploration</li>
          <li>Responsive UI</li>
          <li>Storytelling via Design</li>
        </ul>
      </div>

      <div className={styles.buttons}>
        <Link href="/" className={styles.secondaryBtn}>
          ← Back to Projects
        </Link>
      </div>
    </section>
  );
}