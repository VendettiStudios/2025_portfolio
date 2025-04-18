import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function VendettiStudiosPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Vendetti Studios</h1>
        <p>Design & Creative Platform</p>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/VendettiStudios.png"
          alt="Vendetti Studios Preview"
          fill
          priority
          className={styles.image}
        />
      </div>

      <div className={styles.section}>
        <h2>Overview</h2>
        <p>
          Placeholder content for Vendetti Studios project. This section will outline the
          platform’s purpose, features, and your role in the development process.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Role</h2>
        <p>Developer / Designer / Product Lead</p>
      </div>

      <div className={styles.section}>
        <h2>Scope</h2>
        <ul className={styles.list}>
          <li>Web Design</li>
          <li>Frontend Dev</li>
          <li>Branding</li>
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