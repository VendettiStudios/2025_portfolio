import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function METProjectPage() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h1>MET Corporation USA</h1>
        <p>Custom ERP & Logistics Dashboard</p>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/metco2.png"
          alt="MET Project Screenshot"
          fill
          priority
          className={styles.image}
        />
      </div>

      <div className={styles.section}>
        <h2>Overview</h2>
        <p>
          I built a custom ERP system to unify operations for a 3PL company
          managing warehousing, freight, and inventory. The system eliminated
          reliance on third-party tools, saving over{" "}
          <strong>$30,000 annually</strong> and over{" "}
          <strong>20 hours of manual labor weekly</strong>.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Role</h2>
        <p>
          Full Stack Developer — responsible for frontend, backend architecture,
          and business logic integration across multiple modules.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Project Scope</h2>
        <ul className={styles.list}>
          <li>ERP: Inventory, Freight & Client Management</li>
          <li>Custom CRM + Email Integration</li>
          <li>Microservices Architecture</li>
          <li>Dashboard & Analytics</li>
          <li>Firebase + Next.js Stack</li>
        </ul>
      </div>

      <div className={styles.buttons}>
        <div className={styles.buttons}>
          <Link
            href="https://metcorpusa.com"
            target="_blank"
            className={styles.primaryBtn}
          >
            Visit Live Site
          </Link>
          <Link href="/?view=projects" className={styles.secondaryBtn}>
            ← Back to Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
